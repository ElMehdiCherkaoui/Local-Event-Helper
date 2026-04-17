import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import OrganizerLayout from "../../layouts/OrganizerLayout";

type ServiceItem = {
  id: number;
  title: string;
  category?: string | null;
  description?: string | null;
  price_min?: string | number | null;
  price_max?: string | number | null;
  price_unit?: string | null;
  provider?: {
    name?: string | null;
    city?: string | null;
  } | null;
};

type EventItem = {
  id: number;
  title: string;
  event_date?: string | null;
};

type BookingForm = {
  event_id: string;
  event_date: string;
  city: string;
  guests_count: string;
  budget_amount: string;
  event_details: string;
};

const emptyBookingForm: BookingForm = {
  event_id: "",
  event_date: "",
  city: "",
  guests_count: "",
  budget_amount: "",
  event_details: "",
};

export default function ProvidersSearch() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );
  const [showPopup, setShowPopup] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>(emptyBookingForm);

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");

      try {
        const [servicesResponse, eventsResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/search/services", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/api/events", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setServices((servicesResponse.data?.services ?? []) as ServiceItem[]);
        setEvents((eventsResponse.data?.events ?? []) as EventItem[]);
      } catch (err: any) {
        setError( "Failed to load providers.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const openPopup = (service: ServiceItem) => {
    setSelectedService(service);
    setBookingForm({
      ...emptyBookingForm,
      city: service.provider?.city || "",
    });
    setSuccess("");
    setError("");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedService(null);
    setBookingForm(emptyBookingForm);
  };

  const handleBookingChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setBookingForm((current) => ({ ...current, [name]: value }));
  };

  const handleAddProvider = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token || !selectedService) {
      setError("Please sign in again.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/booking-requests",
        {
          event_id: Number(bookingForm.event_id),
          service_id: selectedService.id,
          event_date: bookingForm.event_date || null,
          city: bookingForm.city || null,
          guests_count: bookingForm.guests_count
            ? Number(bookingForm.guests_count)
            : null,
          budget_amount: bookingForm.budget_amount
            ? Number(bookingForm.budget_amount)
            : null,
          event_details: bookingForm.event_details || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
           
          },
        },
      );

      setSuccess("Provider added to the event successfully. wait for provider confirmation.");
      closePopup();
    } catch (err: any) {
      setError("Failed to add provider.");
    } finally {
      setSaving(false);
    }
  };

  const visibleServices = services.filter((service) => {
    const searchValue = searchText.trim().toLowerCase();
    const title = (service.title || "").toLowerCase();
    const category = (service.category || "").toLowerCase();
    const providerName = (service.provider?.name || "").toLowerCase();
    const city = (service.provider?.city || "").toLowerCase();

    const matchesSearch =
      searchValue === "" ||
      title.includes(searchValue) ||
      category.includes(searchValue) ||
      providerName.includes(searchValue);

    const matchesCategory =
      categoryFilter === "all" || category === categoryFilter.toLowerCase();

    const matchesCity =
      cityFilter.trim() === "" ||
      city.includes(cityFilter.trim().toLowerCase());

    return matchesSearch && matchesCategory && matchesCity;
  });

  return (
    <OrganizerLayout
      title="Find Providers"
      subtitle="Search and add providers to your event"
    >
      <div className="space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none"
              >
                <option value="all">All Categories</option>
                <option value="photographer">Photographer</option>
                <option value="caterer">Caterer</option>
                <option value="venue">Venue</option>
                <option value="dj">DJ</option>
                <option value="decorator">Decorator</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                Location
              </label>
              <input
                type="text"
                value={cityFilter}
                onChange={(event) => setCityFilter(event.target.value)}
                placeholder="City"
                className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]">
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by name..."
              className="h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
            />
            <button
              type="button"
              onClick={() => setSearchText(searchText.trim())}
              className="h-10 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </section>

        {loading ? (
          <p className="text-sm text-slate-500">Loading providers...</p>
        ) : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}

        <div>
          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {visibleServices.length} providers
            </span>
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleServices.map((service) => (
            <article
              key={service.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {service.provider?.name || service.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {service.category || "Service"}
                    </p>
                  </div>
                  <span className="inline-flex rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600">
                    ★ 4.8
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  📍 {service.provider?.city || "No city"}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  {service.description || "No description"}
                </p>

                <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
                  <Link
                    to={`/organizer/providers/${service.id}`}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => openPopup(service)}
                    className="rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-600"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {!loading && visibleServices.length === 0 ? (
          <p className="text-sm text-slate-500">No providers found.</p>
        ) : null}

        {showPopup ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">
                Add{" "}
                {selectedService?.provider?.name ||
                  selectedService?.title ||
                  "Provider"}{" "}
                to Event
              </h3>

              <form className="mt-4 space-y-3" onSubmit={handleAddProvider}>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Select Event
                  </label>
                  <select
                    name="event_id"
                    value={bookingForm.event_id}
                    onChange={handleBookingChange}
                    required
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                  >
                    <option value="">Choose your event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Event Date
                    </label>
                    <input
                      name="event_date"
                      type="date"
                      value={bookingForm.event_date}
                      onChange={handleBookingChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      value={bookingForm.city}
                      onChange={handleBookingChange}
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
                      value={bookingForm.guests_count}
                      onChange={handleBookingChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">
                      Budget
                    </label>
                    <input
                      name="budget_amount"
                      type="number"
                      min="0"
                      value={bookingForm.budget_amount}
                      onChange={handleBookingChange}
                      className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">
                    Event Details
                  </label>
                  <textarea
                    name="event_details"
                    rows={3}
                    value={bookingForm.event_details}
                    onChange={handleBookingChange}
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
                    {saving ? "Saving..." : "Add to Event"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </OrganizerLayout>
  );
}
