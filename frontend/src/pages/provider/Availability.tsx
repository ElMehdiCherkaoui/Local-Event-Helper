import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";

import ProviderLayout from "../../layouts/ProviderLayout";

type StatCard = {
  label: string;
  value: string;
  valueClass: string;
};

type DayState = "past" | "available" | "blocked" | "booked";

type CalendarCell = {
  key: string;
  label: string;
  state: DayState | "empty";
};

type AvailabilityItem = {
  id: number;
  date: string;
  status?: string;
};

type BookingRequestItem = {
  id: number;
  event_date?: string;
  status?: string;
  city?: string;
  guests_count?: number;
  event?: {
    title?: string;
    location?: string;
  };
  organizer?: {
    name?: string;
  };
  service?: {
    title?: string;
  };
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function normalizeDateKey(value?: string) {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}

function formatDateLabel(value?: string) {
  const normalized = normalizeDateKey(value);

  if (!normalized) {
    return "No date";
  }

  return new Date(normalized).toLocaleDateString();
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function ProviderAvailability() {
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [blockedDate, setBlockedDate] = useState("");
  const [availabilities, setAvailabilities] = useState<AvailabilityItem[]>([]);
  const [bookings, setBookings] = useState<BookingRequestItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadAvailabilities = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/provider/availabilities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setAvailabilities(
        (response.data?.availabilities ?? []) as AvailabilityItem[],
      );

      const bookingsResponse = await axios.get(
        "http://127.0.0.1:8000/api/booking-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setBookings(
        (bookingsResponse.data?.bookings ?? []) as BookingRequestItem[],
      );
    } catch {
      setError("Failed to load availability dates.");
    }
  };

  useEffect(() => {
    loadAvailabilities();
  }, []);

  const openBlockPopup = () => {
    setBlockedDate("");
    setError("");
    setSuccess("");
    setShowBlockPopup(true);
  };

  const closeBlockPopup = () => {
    setShowBlockPopup(false);
    setBlockedDate("");
  };

  const saveBlockedDate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!blockedDate) {
      setError("Please select a date to block.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/provider/availabilities",
        {
          date: blockedDate,
          status: "blocked",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await loadAvailabilities();
      setSuccess("Date blocked successfully.");
      setShowBlockPopup(false);
      setBlockedDate("");
    } catch {
      setError("Failed to block date.");
    } finally {
      setSaving(false);
    }
  };

  const blockedAvailabilityDates = availabilities.filter(
    (item) => normalizeDateKey(item.date) !== "" && item.status === "blocked",
  );

  const approvedBookings = bookings.filter((item) => {
    const status = (item.status || "").toLowerCase();

    return status === "confirmed" || status === "approved";
  });

  const upcomingConfirmedBookings = approvedBookings.map((item) => ({
    title: item.event?.title || item.service?.title || "Booking",
    organizer: item.organizer?.name || "Unknown organizer",
    date: formatDateLabel(item.event_date),
    city: item.city || item.event?.location || "-",
    guests: `${item.guests_count ?? 0} guests`,
    status: "Confirmed",
  }));

  const currentMonth = new Date();
  currentMonth.setDate(1);

  const calendarCells = (() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    const leadingEmptyCells = firstDay.getDay();
    const todayKey = toDateKey(new Date());

    const cells: CalendarCell[] = [];

    for (let index = 0; index < leadingEmptyCells; index += 1) {
      cells.push({
        key: `empty-${index}`,
        label: "",
        state: "empty",
      });
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const cellDate = new Date(year, month, day);
      const cellKey = toDateKey(cellDate);

      const blockedForDate = availabilities.some(
        (item) =>
          normalizeDateKey(item.date) === cellKey && item.status === "blocked",
      );

      const approvedBookingForDate = approvedBookings.some((item) => {
        return normalizeDateKey(item.event_date) === cellKey;
      });

      const state: DayState =
        cellKey < todayKey
          ? "past"
          : blockedForDate
            ? "blocked"
            : approvedBookingForDate
              ? "booked"
              : "available";

      cells.push({
        key: cellKey,
        label: String(day),
        state,
      });
    }

    return cells;
  })();

  const stats: StatCard[] = [
    {
      label: "Available Days",
      value: String(
        availabilities.filter((item) => item.status === "available").length,
      ),
      valueClass: "text-emerald-600",
    },
    {
      label: "Booked Days",
      value: String(approvedBookings.length),
      valueClass: "text-violet-600",
    },
    {
      label: "Blocked Days",
      value: String(blockedAvailabilityDates.length),
      valueClass: "text-red-600",
    },
    {
      label: "Upcoming Events",
      value: String(upcomingConfirmedBookings.length),
      valueClass: "text-blue-600",
    },
  ];

  return (
    <ProviderLayout
      title="Availability Calendar"
      subtitle="Manage your availability for upcoming events"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={openBlockPopup}
            className="rounded-md bg-[#8B5CF6] px-3 py-2 text-xs font-semibold text-white hover:bg-[#7C3AED] sm:px-4"
          >
            + Block Dates
          </button>
        </div>

        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {success ? <p className="text-sm text-emerald-600">{success}</p> : null}

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p
                className={`mt-2 text-2xl font-bold sm:text-3xl ${stat.valueClass}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-center">
            <h3 className="text-3xl font-bold text-slate-900 sm:text-3xl">
              {formatMonthLabel(currentMonth)}
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
            <p className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded bg-emerald-500" />
              Available
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded bg-purple-500" />
              Booked
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded bg-red-500" />
              Blocked
            </p>
            <p className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded bg-slate-300" />
              Past Date
            </p>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-700 sm:gap-2 sm:text-sm">
            {weekDays.map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarCells.map((cell) => (
              <div
                key={cell.key}
                className={`flex h-12 items-center justify-center rounded-lg text-sm font-semibold sm:h-16 md:h-20 lg:h-24 ${
                  cell.state === "empty"
                    ? "bg-transparent"
                    : cell.state === "past"
                      ? "border border-slate-300 bg-slate-100 text-slate-400"
                      : cell.state === "blocked"
                        ? "border-2 border-red-500 bg-red-50 text-red-700"
                        : cell.state === "booked"
                          ? "border-2 border-purple-500 bg-purple-100 text-purple-700"
                          : "border-2 border-emerald-500 bg-emerald-100 text-emerald-800"
                }`}
              >
                {cell.label}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">
            Upcoming Bookings
          </h3>
          <div className="space-y-3">
            {upcomingConfirmedBookings.map((booking) => (
              <article
                key={booking.title}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h4 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {booking.title}
                  </h4>
                  <p className="text-xs text-slate-500 sm:text-sm">
                    Organizer:{" "}
                    <span className="font-semibold text-slate-700">
                      {booking.organizer}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {booking.date} &nbsp;&nbsp;•&nbsp;&nbsp; {booking.city}
                    &nbsp;&nbsp;•&nbsp;&nbsp; {booking.guests}
                  </p>
                </div>

                <span className="self-start rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 sm:self-center">
                  {booking.status}
                </span>
              </article>
            ))}
          </div>
        </section>

        {showBlockPopup ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">
                Block Date
              </h3>

              <form className="mt-4 space-y-3" onSubmit={saveBlockedDate}>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Date
                  </label>
                  <input
                    type="date"
                    value={blockedDate}
                    onChange={(event) => setBlockedDate(event.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <p className="mb-1 text-xs font-semibold text-slate-600">
                    Already Blocked (Store)
                  </p>
                  <div className="max-h-24 space-y-1 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-2">
                    {blockedAvailabilityDates.length > 0 ? (
                      blockedAvailabilityDates.map((item) => (
                        <p key={item.id} className="text-xs text-slate-600">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500">
                        No blocked dates yet.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeBlockPopup}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Block"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </ProviderLayout>
  );
}
