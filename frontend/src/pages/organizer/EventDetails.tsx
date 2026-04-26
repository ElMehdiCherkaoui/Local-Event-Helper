import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

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

type TaskItem = {
  id: number;
  title: string;
  description?: string | null;
  due_date?: string | null;
  status?: string | null;
};

type BudgetItem = {
  id: number;
  total_amount: number;
  spent_amount: number;
  remaining_amount: number;
};

type BookingItem = {
  id: number;
  event_id?: number | null;
  status?: string | null;
  budget_amount?: number | string | null;
  provider?: {
    id?: number | null;
    name?: string | null;
  } | null;
  service?: {
    id?: number | null;
    title?: string | null;
    category?: string | null;
  } | null;
};

type EventForm = {
  title: string;
  description: string;
  event_date: string;
  location: string;
  guests_count: string;
  status: string;
};

type BudgetForm = {
  total_amount: string;
  spent_amount: string;
};

type TaskForm = {
  title: string;
  description: string;
  due_date: string;
  status: string;
};

const emptyEventForm: EventForm = {
  title: "",
  description: "",
  event_date: "",
  location: "",
  guests_count: "",
  status: "planning",
};

const emptyBudgetForm: BudgetForm = {
  total_amount: "",
  spent_amount: "",
};

const emptyTaskForm: TaskForm = {
  title: "",
  description: "",
  due_date: "",
  status: "todo",
};

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [budget, setBudget] = useState<BudgetItem | null>(null);
  const [bookings, setBookings] = useState<BookingItem[]>([]);


  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [popupType, setPopupType] = useState<
    "" | "event" | "budget" | "task" | "deleteTask" | "deleteBudget"
  >("");
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [eventForm, setEventForm] = useState<EventForm>(emptyEventForm);
  const [budgetForm, setBudgetForm] = useState<BudgetForm>(emptyBudgetForm);
  const [taskForm, setTaskForm] = useState<TaskForm>(emptyTaskForm);



  const formatBookingStatus = (status?: string | null) => {
    if (status === "confirmed") {
      return {
        label: "Confirmed",
        className: "text-green-600",
      };
    }

    if (status === "declined") {
      return {
        label: "Declined",
        className: "text-red-500",
      };
    }

    if (status === "cancelled") {
      return {
        label: "Cancelled",
        className: "text-slate-500",
      };
    }

    return {
      label: "Pending",
      className: "text-orange-500",
    };
  };

  const formatBookingPrice = (booking: BookingItem) => {
    if (booking.budget_amount === null || booking.budget_amount === undefined) {
      return "Budget not set";
    }

    const amount = Number(booking.budget_amount);

    if (Number.isNaN(amount)) {
      return "Budget not set";
    }

    return `$${amount.toLocaleString()}`;
  };

  const loadData = async () => {
    const token = localStorage.getItem("token");

    if (!token || !eventId) {
      setError("Please sign in again.");
      setLoading(false);
      return;
    }

    try {
      const [eventResponse, tasksResponse, budgetResponse, bookingsResponse] =
        await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/events/${eventId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`http://127.0.0.1:8000/api/events/${eventId}/tasks`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(`http://127.0.0.1:8000/api/events/${eventId}/budget`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/api/booking-requests", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      const apiEvent = eventResponse.data?.event as EventItem | undefined;
      const apiTasks = tasksResponse.data?.tasks ?? [];
      const apiBudget = budgetResponse.data?.budget ?? null;
      const apiBookings = (bookingsResponse.data?.bookings ?? []) as BookingItem[];
      const eventBookings = apiBookings.filter(
        (booking) => String(booking.event_id) === String(eventId),
      );

      setEvent(apiEvent ?? null);
      setTasks(apiTasks);
      setBudget(apiBudget);
      setBookings(eventBookings);

      setEventForm({
        title: apiEvent?.title || "",
        description: apiEvent?.description || "",
        event_date: apiEvent?.event_date
          ? apiEvent.event_date
          : "",
        location: apiEvent?.location || "",
        guests_count: apiEvent?.guests_count
          ? String(apiEvent.guests_count)
          : "",
        status: apiEvent?.status || "planning",
      });

      setBudgetForm({
        total_amount: apiBudget ? String(apiBudget.total_amount) : "",
        spent_amount: apiBudget ? String(apiBudget.spent_amount) : "",
      });

    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load event.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [eventId]);

  const openProviderConversation = async (
    providerId?: number | null,
  ) => {
    const token = localStorage.getItem("token");

    let organizerId: number | null = null;

    try {
      const userText = localStorage.getItem("user");
      if (userText) {
        const parsed = JSON.parse(userText);
        const parsedId = Number(parsed?.id);
        organizerId = Number.isNaN(parsedId) ? null : parsedId;
      }
    } catch {
      organizerId = null;
    }



    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/conversations",
        {
          organizer_id: organizerId,
          provider_id: providerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const conversationId = Number(response.data?.conversation?.id);

      if (!Number.isNaN(conversationId) && conversationId > 0) {
        navigate(`/organizer/messages?conversationId=${conversationId}`);
        return;
      }

      navigate("/organizer/messages");
    } catch {
      setError("Failed to open conversation.");
    }
  };

  const openEventPopup = () => {
    setSelectedTask(null);
    setPopupType("event");
  };

  const openBudgetPopup = () => {
    setPopupType("budget");
  };

  const openTaskPopup = (task?: TaskItem) => {
    if (task) {
      setSelectedTask(task);
      setTaskForm({
        title: task.title,
        description: task.description || "",
        due_date: task.due_date ? task.due_date.slice(0, 10) : "",
        status: task.status || "todo",
      });
    } else {
      setSelectedTask(null);
      setTaskForm(emptyTaskForm);
    }

    setPopupType("task");
  };

  const openDeleteTaskPopup = (task: TaskItem) => {
    setSelectedTask(task);
    setPopupType("deleteTask");
  };

  const openDeleteBudgetPopup = () => {
    setPopupType("deleteBudget");
  };

  const closePopup = () => {
    setPopupType("");
    setSelectedTask(null);
    setTaskForm(emptyTaskForm);
    setBudgetForm({
      total_amount: budget ? String(budget.total_amount) : "",
      spent_amount: budget ? String(budget.spent_amount) : "",
    });
    if (event) {
      setEventForm({
        title: event.title || "",
        description: event.description || "",
        event_date: event.event_date ? event.event_date.slice(0, 10) : "",
        location: event.location || "",
        guests_count: event.guests_count ? String(event.guests_count) : "",
        status: event.status || "planning",
      });
    }
  };

  const handleEventChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setEventForm((current) => ({ ...current, [name]: value }));
  };

  const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBudgetForm((current) => ({ ...current, [name]: value }));
  };

  const handleTaskChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setTaskForm((current) => ({ ...current, [name]: value }));
  };

  const saveEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token || !eventId) {
      setError("Please sign in again.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/events/${eventId}`,
        {
          title: eventForm.title,
          description: eventForm.description || null,
          event_date: eventForm.event_date,
          location: eventForm.location || null,
          guests_count: eventForm.guests_count
            ? Number(eventForm.guests_count)
            : null,
          status: eventForm.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setEvent(response.data?.event ?? null);
      closePopup();
    } catch (err: any) {
      setError("Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const saveBudget = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    setSaving(true);
    setError("");

    const payload = {
      total_amount: budgetForm.total_amount
        ? Number(budgetForm.total_amount)
        : 0,
      spent_amount: budgetForm.spent_amount
        ? Number(budgetForm.spent_amount)
        : 0,
    };

    try {
      if (budget) {
        const response = await axios.patch(
          `http://127.0.0.1:8000/api/events/${eventId}/budget`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBudget(response.data?.budget ?? null);
      } else {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/events/${eventId}/budget`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setBudget(response.data?.budget ?? null);
      }

      closePopup();
    } catch (err: any) {
      setError("Failed to save budget.");
    } finally {
      setSaving(false);
    }
  };

  const deleteBudget = async () => {
    const token = localStorage.getItem("token");

    if (!token || !eventId) {
      setError("Please sign in again.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await axios.delete(`http://127.0.0.1:8000/api/events/${eventId}/budget`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudget(null);
      closePopup();
    } catch (err: any) {
      setError("Failed to delete budget.");
    } finally {
      setSaving(false);
    }
  };

  const saveTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    setSaving(true);
    setError("");

    const payload = {
      title: taskForm.title,
      description: taskForm.description || null,
      due_date: taskForm.due_date || null,
      status: taskForm.status,
    };

    try {
      if (selectedTask) {
        await axios.patch(
          `http://127.0.0.1:8000/api/events/${eventId}/tasks/${selectedTask.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        await axios.post(
          `http://127.0.0.1:8000/api/events/${eventId}/tasks`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      await loadData();
      closePopup();
    } catch (err: any) {
      setError("Failed to save task.");
    } finally {
      setSaving(false);
    }
  };

  const markTaskDone = async (task: TaskItem) => {
    const token = localStorage.getItem("token");

    if (!token || !eventId) {
      setError("Please sign in again.");
      return;
    }

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/events/${eventId}/tasks/${task.id}`,
        {
          status: "done",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await loadData();
    } catch (err: any) {
      setError("Failed to update task.");
    }
  };

  const deleteTask = async () => {
    const token = localStorage.getItem("token");

    setSaving(true);
    setError("");

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/events/${eventId}/tasks/${selectedTask?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await loadData();
      closePopup();
    } catch (err: any) {
      setError("Failed to delete task.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <OrganizerLayout
      title={event?.title || "Event Details"}
      subtitle={`Event Details & Management${eventId ? ` • #${eventId}` : ""}`}
    >
      <div className="space-y-5">
        {loading ? (
          <p className="text-sm text-slate-500">Loading event...</p>
        ) : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={openEventPopup}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:px-4"
          >
            Edit
          </button>
          <Link
            to="/organizer/events"
            className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 sm:px-4"
          >
            ← Back
          </Link>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h3 className="text-base font-semibold text-slate-900">
            Event Overview
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <p className="text-xs text-slate-500">Date</p>
              <p className="font-semibold text-slate-900">
                {event?.event_date
                  ? new Date(event.event_date).toLocaleDateString()
                  : "No date"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="font-semibold text-slate-900">
                {event?.location || "No location"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Guests</p>
              <p className="font-semibold text-slate-900">
                {event?.guests_count ?? 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Status</p>
              <p className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
                {event?.status}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            {event?.description || "No description"}
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-900">
              Budget Tracking
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={openBudgetPopup}
                className="rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-600"
              >
                {budget ? "Edit Budget" : "+ Add Budget"}
              </button>
              {budget ? (
                <button
                  type="button"
                  onClick={openDeleteBudgetPopup}
                  className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                >
                  Delete
                </button>
              ) : null}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-3">
              <p className="text-xs text-slate-500">Total Budget</p>
              <p className="text-2xl font-bold text-green-600">
                ${budget?.total_amount?.toLocaleString() || "0"}
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-xs text-slate-500">Spent</p>
              <p className="text-2xl font-bold text-blue-600">
                ${budget?.spent_amount?.toLocaleString() || "0"}
              </p>
            </div>
            <div className="rounded-lg bg-orange-50 p-3">
              <p className="text-xs text-slate-500">Remaining</p>
              <p className="text-2xl font-bold text-orange-500">
                ${budget?.remaining_amount?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-900">Tasks</h3>
            <button
              type="button"
              onClick={() => openTaskPopup()}
              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              + Add Task
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : "No due date"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {task.status || "todo"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {task.status !== "done" ? (
                    <button
                      type="button"
                      onClick={() => markTaskDone(task)}
                      className="rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-600"
                    >
                      Done
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => openTaskPopup(task)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => openDeleteTaskPopup(task)}
                    className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-900">
              Booked Providers
            </h3>
            <Link
              to="/organizer/providers"
              className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
            >
              + Find More
            </Link>
          </div>


          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking) => {
              const bookingStatus = formatBookingStatus(booking.status);
              const canViewDetails = Number.isInteger(booking.service?.id);

              return (
                <div key={booking.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {booking.provider?.name || "Provider"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {booking.service?.category || booking.service?.title || "Service"}
                      </p>
                    </div>
                    <p className={`text-xs font-medium ${bookingStatus.className}`}>
                      {bookingStatus.label}
                    </p>
                  </div>

                  <p className="mt-3 text-sm font-semibold text-green-600">
                    {formatBookingPrice(booking)}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openProviderConversation(
                          booking.provider?.id,

                        )
                      }
                      className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                    >
                 {"Message"}
                    </button>

                    {canViewDetails ? (
                      <Link
                        to={`/organizer/providers/${booking.service?.id}`}
                        className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        View
                      </Link>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="rounded-md border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-400"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!loading && bookings.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              No providers added to this event yet.
            </p>
          ) : null}
        </section>

        {popupType !== "" ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">
                {popupType === "event"
                  ? "Edit Event"
                  : popupType === "budget"
                    ? budget
                      ? "Edit Budget"
                      : "Add Budget"
                    : popupType === "task"
                      ? selectedTask
                        ? "Edit Task"
                        : "Add Task"
                      : popupType === "deleteTask"
                        ? "Delete Task"
                        : "Delete Budget"}
              </h3>

              {popupType === "event" ? (
                <form
                  className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
                  onSubmit={saveEvent}
                >
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Event Name
                    </label>
                    <input
                      name="title"
                      type="text"
                      value={eventForm.title}
                      onChange={handleEventChange}
                      required
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Date
                    </label>
                    <input
                      name="event_date"
                      type="date"
                      value={eventForm.event_date}
                      onChange={handleEventChange}
                      required
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Location
                    </label>
                    <input
                      name="location"
                      type="text"
                      value={eventForm.location}
                      onChange={handleEventChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Guests
                    </label>
                    <input
                      name="guests_count"
                      type="number"
                      min="0"
                      value={eventForm.guests_count}
                      onChange={handleEventChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Status
                    </label>
                    <select
                      name="status"
                      value={eventForm.status}
                      onChange={handleEventChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    >

                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>

                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={eventForm.description}
                      onChange={handleEventChange}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
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
              ) : null}

              {popupType === "budget" ? (
                <form
                  className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
                  onSubmit={saveBudget}
                >
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Total Amount
                    </label>
                    <input
                      name="total_amount"
                      type="number"
                      min="0"
                      value={budgetForm.total_amount}
                      onChange={handleBudgetChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Spent Amount
                    </label>
                    <input
                      name="spent_amount"
                      type="number"
                      min="0"
                      value={budgetForm.spent_amount}
                      onChange={handleBudgetChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-green-500"
                    />
                  </div>

                  <div className="sm:col-span-2 mt-2 flex justify-end gap-2">
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
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-70"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              ) : null}

              {popupType === "task" ? (
                <form
                  className="mt-4 grid grid-cols-1 gap-3"
                  onSubmit={saveTask}
                >
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Task Title
                    </label>
                    <input
                      name="title"
                      type="text"
                      value={taskForm.title}
                      onChange={handleTaskChange}
                      required
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Due Date
                    </label>
                    <input
                      name="due_date"
                      type="date"
                      value={taskForm.due_date}
                      onChange={handleTaskChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Status
                    </label>
                    <select
                      name="status"
                      value={taskForm.status}
                      onChange={handleTaskChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={taskForm.description}
                      onChange={handleTaskChange}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="mt-2 flex justify-end gap-2">
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
              ) : null}

              {popupType === "deleteTask" ? (
                <div className="mt-4">
                  <p className="text-sm text-slate-600">
                    Delete task:{" "}
                    <span className="font-semibold">{selectedTask?.title}</span>{" "}
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
                      onClick={deleteTask}
                      disabled={saving}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-70"
                    >
                      {saving ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ) : null}

              {popupType === "deleteBudget" ? (
                <div className="mt-4">
                  <p className="text-sm text-slate-600">
                    Delete the event budget?
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
                      onClick={deleteBudget}
                      disabled={saving}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-70"
                    >
                      {saving ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </OrganizerLayout>
  );
}
