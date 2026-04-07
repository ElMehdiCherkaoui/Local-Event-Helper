import ProviderLayout from "../../layouts/ProviderLayout";

type ActiveService = {
  name: string;
  type: string;
  status: string;
  description: string;
  priceRange: string;
  minGuests: string;
  setupTime: string;
  bookings: string;
};

type InactiveService = {
  name: string;
  note: string;
};

const activeServices: ActiveService[] = [
  {
    name: "Wedding Catering",
    type: "Catering",
    status: "Active",
    description:
      "Full-service wedding catering with Moroccan and international cuisine. Includes setup, service staff, and cleanup.",
    priceRange: "$15-25/person",
    minGuests: "50",
    setupTime: "3 hours",
    bookings: "45 total",
  },
  {
    name: "Corporate Lunch Buffet",
    type: "Catering",
    status: "Active",
    description:
      "Professional buffet service for corporate events, meetings, and conferences. Flexible menu options.",
    priceRange: "$12-18/person",
    minGuests: "30",
    setupTime: "2 hours",
    bookings: "62 total",
  },
  {
    name: "Birthday Party Catering",
    type: "Catering",
    status: "Active",
    description:
      "Fun and festive catering for birthday parties. Kid-friendly and adult menu options available.",
    priceRange: "$10-20/person",
    minGuests: "20",
    setupTime: "1.5 hours",
    bookings: "38 total",
  },
];

const inactiveServices: InactiveService[] = [
  { name: "Cocktail Reception Service", note: "Temporarily deactivated" },
];

export default function ProviderServices() {
  return (
    <ProviderLayout
      title="My Services"
      subtitle="Manage your service offerings"
    >
      <div className="space-y-5">
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Active Services (3)
            </h3>
            <button
              type="button"
              className="rounded-md bg-[#8B5CF6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7C3AED]"
            >
              + Add Service
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {activeServices.map((service) => (
              <article
                key={service.name}
                className="rounded-2xl border border-slate-200 bg-white p-4"
              >
                <h4 className="text-3xl font-bold text-slate-900">
                  {service.name}
                </h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-[#7C3AED]">
                    {service.type}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                    {service.status}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <p className="text-slate-400">Price Range</p>
                    <p className="font-semibold text-[#7C3AED]">
                      {service.priceRange}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Min. Guests</p>
                    <p className="font-semibold text-slate-800">
                      {service.minGuests}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Setup Time</p>
                    <p className="font-semibold text-slate-800">
                      {service.setupTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">Bookings</p>
                    <p className="font-semibold text-slate-800">
                      {service.bookings}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 sm:grid-cols-3">
                  <button
                    type="button"
                    className="h-9 rounded-md bg-[#8B5CF6] px-3 text-xs font-semibold text-white hover:bg-[#7C3AED]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="h-9 rounded-md bg-orange-50 px-3 text-xs font-semibold text-orange-600 hover:bg-orange-100"
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
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
            Inactive Services (1)
          </h3>
          <div className="space-y-3">
            {inactiveServices.map((service) => (
              <article
                key={service.name}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h4 className="text-xl font-bold text-slate-900">
                    {service.name}
                  </h4>
                  <p className="text-sm text-slate-400">{service.note}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="h-9 rounded-md bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    Activate
                  </button>
                  <button
                    type="button"
                    className="h-9 rounded-md bg-slate-100 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </ProviderLayout>
  );
}
