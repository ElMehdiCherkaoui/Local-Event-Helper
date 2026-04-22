import { useEffect, useState } from "react";
import axios from "axios";
import ProviderLayout from "../../layouts/ProviderLayout";

type BookingItem = {
  id: number;
  status?: string | null;
  event_date?: string | null;
  city?: string | null;
  guests_count?: number | null;
  budget_amount?: string | number | null;
  requested_date?: string | null;
  event_details?: string | null;
  event?: {
    title?: string | null;
    location?: string | null;
  };
  organizer?: {
    name?: string | null;
  };
  service?: {
    title?: string | null;
  };
};

export default function ProviderBookings() {
  const [bookingRequests, setBookingRequests] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const loadBookings = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/booking-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const bookings = (response.data?.bookings || []) as BookingItem[];
        const pending = bookings.filter(
          (booking) => booking.status === "pending",
        );
        setBookingRequests(pending);
      } catch (err: any) {
        setError("Failed to load booking requests.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const updateRequestStatus = async (
    bookingId: number,
    status: "confirmed" | "declined",
  ) => {
    const token = localStorage.getItem("token");

    setActionLoadingId(bookingId);
    setError("");

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/booking-requests/${bookingId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setBookingRequests((current) =>
        current.filter((request) => request.id !== bookingId),
      );
    } catch (err: any) {
      setError("Failed to update booking request.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <ProviderLayout
      title="Booking Requests"
      subtitle="Manage and respond to event requests"
    >
      <div className="space-y-4">
        {loading ? (
          <p className="text-sm text-slate-500">Loading booking requests...</p>
        ) : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        {!loading && bookingRequests.length === 0 ? (
          <p className="text-sm text-slate-500">No pending requests.</p>
        ) : null}

        {bookingRequests.map((request) => (
          <article
            key={request.id}
            className="rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-2xl font-bold text-slate-900">
                {request.event?.title || "Event Request"}
              </h3>
              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                Pending
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Organizer:{" "}
              <span className="font-semibold text-slate-700">
                {request.organizer?.name || "Unknown organizer"}
              </span>
            </p>

            <p className="mt-1 text-xs text-slate-500">
              📅{" "}
              {new Date(request.event_date || new Date()).toLocaleDateString()}{" "}
              &nbsp;&nbsp;•&nbsp;&nbsp;{" "}
              {request.city || request.event?.location || "-"}{" "}
              &nbsp;&nbsp;•&nbsp;&nbsp; {request.guests_count || 0} guests
              &nbsp;&nbsp;•&nbsp;&nbsp; ${request.budget_amount || 0}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {new Date(
                request.requested_date || new Date(),
              ).toLocaleDateString()}
            </p>

            <div className="mt-3 border-t border-slate-100 pt-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Service Requested
              </p>
              <p className="mt-1 inline-block rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-[#7C3AED]">
                {request.service?.title || "Service"}
              </p>
            </div>

            <div className="mt-3">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Event Details
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {request.event_details || "No details provided."}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => updateRequestStatus(request.id, "confirmed")}
                disabled={actionLoadingId === request.id}
                className="h-9 rounded-md bg-green-600 px-3 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-60"
              >
                {actionLoadingId === request.id
                  ? "Saving..."
                  : "Accept Request"}
              </button>
              <button
                type="button"
                onClick={() => updateRequestStatus(request.id, "declined")}
                disabled={actionLoadingId === request.id}
                className="h-9 rounded-md bg-rose-50 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-100 disabled:opacity-60"
              >
                {actionLoadingId === request.id ? "Saving..." : "Decline"}
              </button>
              <button
                type="button"
                className="h-9 rounded-md bg-[#8B5CF6] px-3 text-xs font-semibold text-white hover:bg-[#7C3AED]"
              >
                Message
              </button>
            </div>
          </article>
        ))}
      </div>
    </ProviderLayout>
  );
}
