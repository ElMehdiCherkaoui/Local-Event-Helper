import { Link, useParams } from "react-router-dom";
import OrganizerLayout from "../../layouts/OrganizerLayout";

type Service = {
  name: string;
  price: string;
  details: string;
};

type WorkEvent = {
  name: string;
  dateCity: string;
  description: string;
  price: string;
  rating: number;
};

type Review = {
  client: string;
  event: string;
  message: string;
  stars: string;
};

const services: Service[] = [
  {
    name: "Wedding Photography",
    price: "$1,200/day",
    details: "Full day coverage, 2 photographers",
  },
  {
    name: "Event Photography",
    price: "$800/day",
    details: "Event coverage, edited photos",
  },
  {
    name: "Portrait Session",
    price: "$400",
    details: "1 hour, digital copies included",
  },
];

const works: WorkEvent[] = [
  {
    name: "Summer Wedding",
    dateCity: "June 15, 2026 • Marrakech, Morocco",
    description:
      "Beautiful outdoor wedding with 150 guests. Provided full day coverage with professional editing.",
    price: "$1,200",
    rating: 4.9,
  },
  {
    name: "Birthday Party",
    dateCity: "March 20, 2026 • Marrakech, Morocco",
    description:
      "30th birthday celebration with 50 close friends. Candid and fun photography throughout the event.",
    price: "$600",
    rating: 4.8,
  },
  {
    name: "Corporate Event",
    dateCity: "April 10, 2026 • Casablanca, Morocco",
    description:
      "Annual company conference with 200 guests. Professional coverage of keynotes and networking moments.",
    price: "$800",
    rating: 4.7,
  },
  {
    name: "Engagement Party",
    dateCity: "February 14, 2026 • Fez, Morocco",
    description:
      "Intimate engagement celebration with 75 guests. Romantic and elegant photography style.",
    price: "$700",
    rating: 5.0,
  },
];

const reviews: Review[] = [
  {
    client: "Sarah Martinez",
    event: "Summer Wedding • June 2026",
    message:
      "John captured every precious moment of our wedding perfectly! Professional, attentive, and his photos are absolutely stunning. Highly recommend!",
    stars: "★★★★★",
  },
  {
    client: "Ahmed Hassan",
    event: "Corporate Event • April 2026",
    message:
      "Great photographer! Very professional and delivered all photos on time. Would work with him again.",
    stars: "★★★★☆",
  },
  {
    client: "Fatima Al-Mansouri",
    event: "Birthday Party • March 2026",
    message:
      "Amazing! John made everyone feel comfortable while taking photos. The candid shots are priceless. Best investment for our party!",
    stars: "★★★★★",
  },
];

const galleryColors = [
  "bg-pink-400",
  "bg-cyan-500",
  "bg-orange-400",
  "bg-emerald-500",
  "bg-pink-300",
  "bg-violet-400",
  "bg-cyan-500",
  "bg-yellow-400",
];

export default function ProvidersDetails() {
  const { providerId } = useParams();

  return (
    <OrganizerLayout
      title="Provider Profile"
      subtitle={`View provider details and work history${providerId ? ` • #${providerId}` : ""}`}
    >
      <div className="space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-3">
            <Link
              to="/organizer/providers"
              className="rounded-md px-2 py-1 text-slate-500 transition hover:bg-slate-100"
            >
              ←
            </Link>
            <p className="text-sm text-slate-500">Back to providers</p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="h-24 w-24 rounded-xl bg-blue-600" />
            <div className="flex-1">
              <h3 className="text-4xl font-semibold text-slate-900">
                John Photography
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                <span className="text-amber-500">★</span> 4.8/5 (45 reviews)
                &nbsp; 100+ completed events
              </p>
              <p className="mt-2 text-sm text-slate-500">
                📍 Marrakech, Morocco
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Professional photographer with 10+ years of experience in
                weddings, events, and celebrations. Specializes in capturing
                moments with artistic flair.
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Add to Event
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h4 className="text-2xl font-semibold text-slate-900">
            Services & Pricing
          </h4>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="rounded-xl border border-slate-200 p-3"
              >
                <p className="text-sm font-semibold text-slate-800">
                  {service.name}
                </p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {service.price}
                </p>
                <p className="mt-1 text-xs text-slate-500">{service.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h4 className="text-2xl font-semibold text-slate-900">
            Portfolio Gallery
          </h4>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {galleryColors.map((color, index) => (
              <div key={index} className={`h-40 rounded-lg ${color}`} />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h4 className="text-2xl font-semibold text-slate-900">
            Events He's Worked On
          </h4>
          <div className="mt-4 space-y-3">
            {works.map((work) => (
              <div
                key={work.name}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-slate-900">
                      {work.name}
                    </p>
                    <p className="text-xs text-slate-500">{work.dateCity}</p>
                  </div>
                  <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600">
                    ★ {work.rating}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  {work.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-blue-600">
                    {work.price}
                  </p>
                  <p className="text-xs font-semibold text-green-600">
                    ✓ Completed
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h4 className="text-2xl font-semibold text-slate-900">
            Client Reviews
          </h4>
          <div className="mt-4 space-y-3">
            {reviews.map((review) => (
              <div
                key={review.client}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {review.client}
                    </p>
                    <p className="text-xs text-slate-500">{review.event}</p>
                  </div>
                  <p className="text-amber-500">{review.stars}</p>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  "{review.message}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </OrganizerLayout>
  );
}
