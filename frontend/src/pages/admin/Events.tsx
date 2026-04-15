import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import AdminEventIcon from "../../assets/icons/AdminIconEvents.svg";
import ActiveIcon from "../../assets/icons/ActiveIcon.svg";
import CompletedIcon from "../../assets/icons/CompletedIcon.svg";
import UpIcon from "../../assets/icons/UpIcon.svg";

type AdminStats = {
  events: number;
  services: number;
  bookings: number;
  reviews: number;
};

type AdminEvent = {
  id: number;
  title: string;
  event_date?: string | null;
  location?: string | null;
  guests_count?: number | null;
  status?: string | null;
  created_at?: string;
  organizer?: {
    name?: string;
  };
};

const emptyStats: AdminStats = {
  events: 0,
  services: 0,
  bookings: 0,
  reviews: 0,
};

function formatDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString();
}

function statusClass(status?: string | null) {
  if (status === "completed") {
    return "bg-purple-500/20 text-purple-300";
  }

  if (status === "in_progress") {
    return "bg-green-500/20 text-green-300";
  }

  if (status === "cancelled") {
    return "bg-red-500/20 text-red-300";
  }

  return "bg-blue-500/20 text-blue-300";
}

export default function Events() {
  const [stats, setStats] = useState<AdminStats>(emptyStats);
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const [statsResponse, eventsResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/admin/statistics", {
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

        setStats({
          events: statsResponse.data?.events || 0,
          services: statsResponse.data?.services || 0,
          bookings: statsResponse.data?.bookings || 0,
          reviews: statsResponse.data?.reviews || 0,
        });

        setEvents(eventsResponse.data?.events || []);
      } catch (err: any) {
        setError( "Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <AdminLayout title="Events & Statistics" subtitle="Simple event dashboard">
      <main className="space-y-4 p-4 md:p-6">
        {loading ? (
          <p className="text-sm text-gray-300">Loading events...</p>
        ) : null}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Event Statistics</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-[#1E293B] p-4">
              <div className="mb-3 flex items-start justify-between">
                <p className="text-xs text-gray-400">Total Events</p>
                <img src={AdminEventIcon} alt="" className="w-4" />
              </div>
              <h4 className="text-2xl font-bold text-white">{stats.events}</h4>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#1E293B] p-4">
              <div className="mb-3 flex items-start justify-between">
                <p className="text-xs text-gray-400">Bookings</p>
                <img src={ActiveIcon} alt="" className="w-4" />
              </div>
              <h4 className="text-2xl font-bold text-white">
                {stats.bookings}
              </h4>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#1E293B] p-4">
              <div className="mb-3 flex items-start justify-between">
                <p className="text-xs text-gray-400">Reviews</p>
                <img src={CompletedIcon} alt="" className="w-4" />
              </div>
              <h4 className="text-2xl font-bold text-white">{stats.reviews}</h4>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#1E293B] p-4">
              <div className="mb-3 flex items-start justify-between">
                <p className="text-xs text-gray-400">Services</p>
                <img src={UpIcon} alt="" className="w-4" />
              </div>
              <h4 className="text-2xl font-bold text-white">
                {stats.services}
              </h4>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-white">Recent Events</h3>

          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border border-white/10 bg-[#1E293B] p-4 text-white"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-semibold">{event.title}</h4>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] ${statusClass(event.status)}`}
                    >
                      {event.status || "planning"}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-gray-400">
                    {event.organizer?.name || "Unknown organizer"}
                  </p>
                  <p className="mt-2 text-xs text-gray-300">
                    {formatDate(event.event_date)} · {event.location || "-"} ·{" "}
                    {event.guests_count || 0} guests
                  </p>
                </div>

                <p className="text-xs text-blue-300">
                  Created {formatDate(event.created_at)}
                </p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </AdminLayout>
  );
}
