import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import ProviderLayout from "../../layouts/ProviderLayout";

type ServiceItem = {
  id: number;
  title?: string | null;
  category?: string | null;
  description?: string | null;
  price_min?: string | number | null;
  price_max?: string | number | null;
  price_unit?: string | null;
  min_guests?: number | null;
  setup_time_minutes?: number | null;
  bookings_count?: number | null;
  status?: "active" | "inactive" | null;
};

type ServiceForm = {
  title: string;
  category: string;
  description: string;
  price_min: string;
  price_max: string;
  price_unit: string;
  min_guests: string;
  setup_time_minutes: string;
  status: "active" | "inactive";
};

const emptyForm: ServiceForm = {
  title: "",
  category: "",
  description: "",
  price_min: "",
  price_max: "",
  price_unit: "person",
  min_guests: "",
  setup_time_minutes: "",
  status: "active",
};

function formatPrice(service: ServiceItem) {
  const min = service.price_min ?? "";
  const max = service.price_max ?? "";

  if (min && max) {
    return `$${min} - $${max}${service.price_unit ? ` / ${service.price_unit}` : ""}`;
  }

  if (min) {
    return `$${min}${service.price_unit ? ` / ${service.price_unit}` : ""}`;
  }

  if (max) {
    return `$${max}${service.price_unit ? ` / ${service.price_unit}` : ""}`;
  }

  return "Price on request";
}

export default function ProviderServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyForm);

  useEffect(() => {
    const loadServices = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/provider/services", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setServices((response.data?.services) as ServiceItem[]);
      } catch (err: any) {
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const activeServices = services.filter((service) => service.status !== "inactive");
  const inactiveServices = services.filter((service) => service.status === "inactive");

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const openEditForm = (service: ServiceItem) => {
    setEditingId(service.id);
    setForm({
      title: service.title || "",
      category: service.category || "",
      description: service.description || "",
      price_min: service.price_min?.toString() || "",
      price_max: service.price_max?.toString() || "",
      price_unit: service.price_unit || "person",
      min_guests: service.min_guests?.toString() || "",
      setup_time_minutes: service.setup_time_minutes?.toString() || "",
      status: service.status === "inactive" ? "inactive" : "active",
    });
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const saveService = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      title: form.title,
      category: form.category || null,
      description: form.description || null,
      price_min: form.price_min ? Number(form.price_min) : null,
      price_max: form.price_max ? Number(form.price_max) : null,
      price_unit: form.price_unit || null,
      min_guests: form.min_guests ? Number(form.min_guests) : null,
      setup_time_minutes: form.setup_time_minutes ? Number(form.setup_time_minutes) : null,
      status: form.status,
    };

    try {
      if (editingId === null) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/provider/services",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setServices((current) => [response.data?.service, ...current].filter(Boolean));
        setSuccess("Service created successfully.");
      } else {
        const response = await axios.patch(
          `http://127.0.0.1:8000/api/provider/services/${editingId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const updatedService = response.data?.service as ServiceItem;
        setServices((current) =>
          current.map((service) => (service.id === editingId ? updatedService : service)),
        );
        setSuccess("Service updated successfully.");
      }

      closeForm();
    } catch (err: any) {
      setError("Failed to save service.");
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (serviceId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/provider/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setServices((current) => current.filter((service) => service.id !== serviceId));
      setSuccess("Service deleted successfully.");
    } catch (err: any) {
      setError("Failed to delete service.");
    }
  };

  const setServiceStatus = async (serviceId: number, status: "active" | "inactive") => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/provider/services/${serviceId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const updatedService = response.data?.service as ServiceItem;
      setServices((current) =>
        current.map((service) => (service.id === serviceId ? updatedService : service)),
      );
      setSuccess(status === "active" ? "Service activated." : "Service deactivated.");
    } catch (err: any) {
      setError("Failed to update service status.");
    }
  };

  return (
    <ProviderLayout title="My Services" subtitle="Manage your service offerings">
      <div className="space-y-5">
        {loading ? <p className="text-sm text-slate-500">Loading services...</p> : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {success ? <p className="text-sm text-green-600">{success}</p> : null}

        <section>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Active Services ({activeServices.length})
            </h3>
            <button
              type="button"
              onClick={openAddForm}
              className="rounded-md bg-[#8B5CF6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7C3AED]"
            >
              + Add Service
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {activeServices.map((service) => (
              <article
                key={service.id}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <h4 className="text-3xl font-bold text-slate-900">
                  {service.title || "Service"}
                </h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-[#7C3AED]">
                    {service.category || "Service"}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                    Active
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {service.description || "No description"}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <p className="text-slate-400">Price Range</p>
                    <p className="font-semibold text-[#7C3AED]">
                      {formatPrice(service)}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Min. Guests</p>
                    <p className="font-semibold text-slate-800">
                      {service.min_guests ?? "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Setup Time</p>
                    <p className="font-semibold text-slate-800">
                      {service.setup_time_minutes ? `${service.setup_time_minutes} min` : "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Bookings</p>
                    <p className="font-semibold text-slate-800">
                      {service.bookings_count ?? 0}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => openEditForm(service)}
                    className="h-9 rounded-md bg-[#8B5CF6] px-3 text-xs font-semibold text-white hover:bg-[#7C3AED]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceStatus(service.id, "inactive")}
                    className="h-9 rounded-md bg-orange-50 px-3 text-xs font-semibold text-orange-600 hover:bg-orange-100"
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteService(service.id)}
                    className="h-9 rounded-md bg-rose-50 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold text-slate-900">
            Inactive Services ({inactiveServices.length})
          </h3>
          <div className="space-y-3">
            {inactiveServices.map((service) => (
              <article
                key={service.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {service.title || "Service"}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {service.category || "Service"} • {service.description || "No description"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceStatus(service.id, "active")}
                    className="h-9 rounded-md bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    Activate
                  </button>
                  <button
                    type="button"
                    onClick={() => openEditForm(service)}
                    className="h-9 rounded-md bg-slate-100 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteService(service.id)}
                    className="h-9 rounded-md bg-rose-50 px-4 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {showForm ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">
                {editingId === null ? "Add Service" : "Edit Service"}
              </h3>

              <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" onSubmit={saveService}>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Title</label>
                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Category</label>
                  <input
                    name="category"
                    type="text"
                    value={form.category}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={form.description}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Price Min</label>
                  <input
                    name="price_min"
                    type="number"
                    min="0"
                    value={form.price_min}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Price Max</label>
                  <input
                    name="price_max"
                    type="number"
                    min="0"
                    value={form.price_max}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Price Unit</label>
                  <input
                    name="price_unit"
                    type="text"
                    value={form.price_unit}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Min Guests</label>
                  <input
                    name="min_guests"
                    type="number"
                    min="0"
                    value={form.min_guests}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Setup Time Minutes</label>
                  <input
                    name="setup_time_minutes"
                    type="number"
                    min="0"
                    value={form.setup_time_minutes}
                    onChange={handleChange}
                    className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div className="sm:col-span-2 mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7C3AED] disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save Service"}
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
