import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import AdminEventIcon from "../../assets/icons/AdminIconEvents.svg";
import BannedIcon from "../../assets/icons/BannedIcon.svg";
import FlagIcon from "../../assets/icons/FlagIcon.svg";
import ReportIcon from "../../assets/icons/ReportIcon.svg";
import AdminIconUsers from "../../assets/icons/AdminIconUsers.svg";
import Symbol from "../../assets/icons/Symbol.svg";

type StatItem = {
  label: string;
  value: number;
  icon: string;
  iconBg: string;
};

type ApiEvent = {
  id: number;
  title: string;
  location?: string | null;
  event_date?: string | null;
  created_at?: string;
  guests_count?: number | null;
  status?: string | null;
  organizer?: {
    name?: string;
    email?: string;
  };
};

type ModerationEvent = {
  eventId: number;
  id: string;
  title: string;
  organizer: string;
  email: string;
  location: string;
  date: string;
  submittedAgo: string;
  guests: number;
  budget: string;
  status: string;
};

const defaultStats: StatItem[] = [
  {
    label: "Pending Events",
    value: 0,
    icon: AdminEventIcon,
    iconBg: "bg-blue-500",
  },
  {
    label: "Reported Users",
    value: 0,
    icon: ReportIcon,
    iconBg: "bg-red-500",
  },
  {
    label: "Banned Users",
    value: 0,
    icon: BannedIcon,
    iconBg: "bg-pink-500",
  },
  {
    label: "Flagged Content",
    value: 0,
    icon: FlagIcon,
    iconBg: "bg-indigo-500",
  },
] as const;

function formatDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString();
}

function mapStatus(value?: string | null) {
  if (value === "planning") {
    return "Pending";
  }

  if (value === "cancelled") {
    return "Rejected";
  }

  return "Approved";
}

export default function Moderation() {
  const [stats, setStats] = useState<StatItem[]>(defaultStats as StatItem[]);
  const [moderationEvents, setModerationEvents] = useState<ModerationEvent[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const loadModerationData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const [statsResponse, usersResponse, eventsResponse] =
          await Promise.all([
            axios.get("http://127.0.0.1:8000/api/admin/statistics", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("http://127.0.0.1:8000/api/admin/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("http://127.0.0.1:8000/api/admin/events", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        const events: ApiEvent[] = eventsResponse.data?.events || [];
        const pendingEvents = events.filter(
          (event) => event.status === "planning",
        );
        const users = usersResponse.data?.users || [];

        const pendingEventsCount = pendingEvents.length;
        const bannedUsersCount = users.filter(
          (user: any) => user.is_banned,
        ).length;

        setStats([
          {
            label: "Pending Events",
            value: pendingEventsCount,
            icon: AdminEventIcon,
            iconBg: "bg-blue-500",
          },
          {
            label: "Reported Users",
            value: statsResponse.data?.users || 0,
            icon: ReportIcon,
            iconBg: "bg-red-500",
          },
          {
            label: "Banned Users",
            value: bannedUsersCount,
            icon: BannedIcon,
            iconBg: "bg-pink-500",
          },
          {
            label: "Flagged Content",
            value: statsResponse.data?.reviews || 0,
            icon: FlagIcon,
            iconBg: "bg-indigo-500",
          },
        ]);

        setModerationEvents(
          pendingEvents.map((event) => ({
            eventId: event.id,
            id: `EVT-${event.id}`,
            title: event.title,
            organizer: event.organizer?.name || "Unknown organizer",
            email: event.organizer?.email || "-",
            location: event.location || "-",
            date: formatDate(event.event_date),
            submittedAgo: formatDate(event.created_at),
            guests: event.guests_count || 0,
            budget: "0",
            status: mapStatus(event.status),
          })),
        );
      } catch (err: any) {
        setError("Failed to load moderation data.");
      } finally {
        setLoading(false);
      }
    };

    loadModerationData();
  }, []);

  const updateEventStatus = async (
    event: ModerationEvent,
    status: "in_progress" | "cancelled",
  ) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please login again.");
      return;
    }

    setActionLoadingId(event.eventId);
    setError("");

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/events/${event.eventId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setModerationEvents((current) =>
        current.filter(
          (currentEvent) => currentEvent.eventId !== event.eventId,
        ),
      );
      setStats((currentStats) =>
        currentStats.map((stat) => {
          if (stat.label === "Pending Events") {
            return { ...stat, value: Math.max(0, stat.value - 1) };
          }

          return stat;
        }),
      );
    } catch (err: any) {
      setError("Failed to update event status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <AdminLayout
      title="Moderation Center"
      subtitle="Review users, events, and handle reports"
    >
      <main className="space-y-6 p-4 md:p-6">
        {loading ? (
          <p className="text-sm text-gray-300">Loading moderation data...</p>
        ) : null}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-[#1E293B] p-4 md:p-5"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <p className="text-xs text-gray-400">{stat.label}</p>

                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-md text-xs text-white ${stat.iconBg}`}
                  >
                    <img src={stat.icon} alt="" />
                  </div>
                </div>

                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          {moderationEvents.map((event) => (
            <article
              key={event.id}
              className="rounded-xl border border-white/10 bg-[#1E293B] p-4 md:p-5"
            >
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">#{event.id}</p>
                </div>

                <span className="w-fit rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-300">
                  {event.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-5 text-sm">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Organizer</p>
                    <p className="font-medium text-white">{event.organizer}</p>
                    <p className="text-gray-400">{event.email}</p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      Location & Date
                    </p>
                    <p className="font-medium text-white flex items-center gap-2">
                      <img src={Symbol} alt="" /> {event.location}
                    </p>
                    <p className="text-gray-400">{event.date}</p>
                  </div>
                </div>

                <div className="space-y-5 text-sm md:text-left">
                  <div>
                    <p className="mb-1 text-xs text-gray-500">Submitted</p>
                    <p className="font-medium text-white">
                      {event.submittedAgo}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs text-gray-500">
                      Guests & Budget
                    </p>
                    <p className="font-medium text-white flex items-center gap-2">
                      <img src={AdminIconUsers} alt="" /> {event.guests} guests
                    </p>
                    <p className="text-gray-400 flex items-center gap-1">
                      {" "}
                      <div className="font-bold text-white">$</div>{" "}
                      {event.budget}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => updateEventStatus(event, "in_progress")}
                    disabled={actionLoadingId === event.eventId}
                    className="rounded-md bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:opacity-50"
                  >
                    {actionLoadingId === event.eventId
                      ? "Saving..."
                      : "Approve"}
                  </button>

                  <button
                    onClick={() => updateEventStatus(event, "cancelled")}
                    disabled={actionLoadingId === event.eventId}
                    className="rounded-md bg-rose-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-rose-600 disabled:opacity-50"
                  >
                    {actionLoadingId === event.eventId ? "Saving..." : "Reject"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </AdminLayout>
  );
}
