import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import OrganizerLayout from "../../layouts/OrganizerLayout";

type EventItem = {
  id: number;
  title: string;
  description?: string | null;
  event_date?: string | null;
  location?: string | null;
  guests_count?: number | null;
  status?: string | null;
};

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [guestsCount, setGuestsCount] = useState("");
  const [status, setStatus] = useState("planning");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const loadEvents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents((response.data?.events ?? []) as EventItem[]);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const openNewPopup = () => {
    setError("");
    setSelectedEvent(null);
    setTitle("");
    setDescription("");
    setEventDate("");
    setLocation("");
    setGuestsCount("");
    setStatus("planning");
    setShowFormPopup(true);
  };

  const openEditPopup = (event: EventItem) => {
    setError("");
    setSelectedEvent(event);
    setTitle(event.title || "");
    setDescription(event.description || "");
    setEventDate(event.event_date ? event.event_date.slice(0, 10) : "");
    setLocation(event.location || "");
    setGuestsCount(event.guests_count ? String(event.guests_count) : "");
    setStatus(event.status || "planning");
    setShowFormPopup(true);
  };

  const openDeletePopup = (event: EventItem) => {
    setError("");
    setSelectedEvent(event);
    setShowDeletePopup(true);
  };

  const closePopup = () => {
    setShowFormPopup(false);
    setShowDeletePopup(false);
    setSelectedEvent(null);
    setTitle("");
    setDescription("");
    setEventDate("");
    setLocation("");
    setGuestsCount("");
    setStatus("planning");
  };

  const handleSaveEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      if (selectedEvent) {
        await axios.patch(
          `http://127.0.0.1:8000/api/events/${selectedEvent.id}`,
          {
            title,
            description: description || null,
            event_date: eventDate,
            location: location || null,
            guests_count: guestsCount ? Number(guestsCount) : null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/events",
          {
            title,
            description: description || null,
            event_date: eventDate,
            location: location || null,
            guests_count: guestsCount ? Number(guestsCount) : null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      closePopup();
      await loadEvents();
    } catch (err: any) {
      setError("Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async () => {
    setSaving(true);
    setError("");

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/events/${selectedEvent?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      closePopup();
      await loadEvents();
    } catch (err: any) {
      setError("Failed to delete event.");
    } finally {
      setSaving(false);
    }
  };

  let visibleEvents = [...events];

  if (statusFilter !== "all") {
    visibleEvents = visibleEvents.filter(
      (event) => (event.status ?? "planning") === statusFilter,
    );
  }

  const keyword = searchText.trim().toLowerCase();

  if (keyword) {
    visibleEvents = visibleEvents.filter((event) => {
      const title = event.title.toLowerCase();
      const location = (event.location ?? "").toLowerCase();

      return title.includes(keyword) || location.includes(keyword);
    });
  }

  return (
    <OrganizerLayout
      title="My Events"
      subtitle="Manage all your events in one place"
    >
      <div className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <select
              className="h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="all">All Events</option>
              <option value="in_progress">In Progress</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search events..."
              className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500"
            />

            <button
              type="button"
              onClick={openNewPopup}
              className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + New Event
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Loading events...</p>
        ) : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        {!loading && visibleEvents.length === 0 ? (
          <p className="text-sm text-slate-500">No events found.</p>
        ) : null}

        {visibleEvents.map((event) => (
          <article
            key={event.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  {event.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {event.event_date
                    ? new Date(event.event_date).toLocaleDateString()
                    : "No date"}{" "}
                  | {event.location || "No location"} |{" "}
                  {event.guests_count ?? 0} guests
                </p>
              </div>

              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                  event.status === "in_progress"
                    ? "bg-blue-100 text-blue-700"
                    : event.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : event.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                }`}
              >
                {(event.status ?? "planning").replace("_", " ")}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              {event.description || "No description"}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr_1fr]">
              <Link
                to={`/organizer/events/${event.id}`}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View Details
              </Link>

              <button
                type="button"
                onClick={() => openEditPopup(event)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => openDeletePopup(event)}
                className="rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </article>
        ))}

        {showFormPopup || showDeletePopup ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">
                {showDeletePopup
                  ? "Delete Event"
                  : selectedEvent
                    ? "Edit Event"
                    : "Create New Event"}
              </h3>

              {showFormPopup && (
                <form className="mt-4 space-y-3" onSubmit={handleSaveEvent}>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      required
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">
                        Date
                      </label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(event) => setEventDate(event.target.value)}
                        required
                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">
                        Guests
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={guestsCount}
                        onChange={(event) => setGuestsCount(event.target.value)}
                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              )}

              {showDeletePopup && (
                <div className="mt-4">
                  <p className="text-sm text-slate-600">
                    Delete this event:{" "}
                    <span className="font-semibold">
                      {selectedEvent?.title}
                    </span>
                    ?
                  </p>

                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteEvent}
                      disabled={saving}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-70"
                    >
                      {saving ? "Deleting..." : "Confirm Delete"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </OrganizerLayout>
  );
}
