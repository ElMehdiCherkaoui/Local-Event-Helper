import ProviderLayout from "../../layouts/ProviderLayout";

type StatCard = {
  label: string;
  value: string;
  img: string;
};

type BookingRequest = {
  title: string;
  organizer: string;
  date: string;
  city: string;
  guests: string;
  description: string;
  status: string;
};

type UpcomingEvent = {
  title: string;
  date: string;
  city: string;
  guests: string;
  status: string;
};

type Review = {
  name: string;
  eventType: string;
  comment: string;
  timeAgo: string;
  rating: string;
};

const stats: StatCard[] = [
  {
    label: "Pending Requests",
    value: "5",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
  },
  {
    label: "Confirmed Bookings",
    value: "12",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
  },
  {
    label: "Average Rating",
    value: "4.9",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
  },
  {
    label: "Total Revenue",
    value: "$18.5k",
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828843.png",
  },
];

const recentRequests: BookingRequest[] = [
  {
    title: "Summer Wedding",
    organizer: "John Doe",
    date: "June 15, 2026",
    city: "Marrakech",
    guests: "150 guests",
    description:
      "Catering service needed for outdoor wedding celebration with Moroccan and international cuisine.",
    status: "Pending",
  },
  {
    title: "Birthday Party",
    organizer: "Alice Smith",
    date: "March 20, 2026",
    city: "Casablanca",
    guests: "50 guests",
    description:
      "Looking for catering services for 30th birthday celebration. Mix of appetizers and main courses.",
    status: "Pending",
  },
  {
    title: "Corporate Event",
    organizer: "Business Solutions Inc.",
    date: "April 12, 2026",
    city: "Rabat",
    guests: "200 guests",
    description:
      "Corporate conference catering. Need lunch buffet and coffee breaks throughout the day.",
    status: "Pending",
  },
];

const upcomingEvents: UpcomingEvent[] = [
  {
    title: "Garden Wedding",
    date: "February 28, 2026",
    city: "Marrakech",
    guests: "120 guests",
    status: "Confirmed",
  },
  {
    title: "Anniversary Dinner",
    date: "March 5, 2026",
    city: "Casablanca",
    guests: "60 guests",
    status: "Confirmed",
  },
];

const recentReviews: Review[] = [
  {
    name: "Emily Johnson",
    eventType: "Wedding Reception",
    comment:
      "Absolutely amazing catering service. The food was delicious and beautifully presented.",
    timeAgo: "2 days ago",
    rating: "5.0",
  },
  {
    name: "Michael Brown",
    eventType: "Corporate Event",
    comment:
      "Professional service and excellent food quality. Our team was very impressed.",
    timeAgo: "1 week ago",
    rating: "5.0",
  },
  {
    name: "Sarah Wilson",
    eventType: "Birthday Party",
    comment:
      "Great food and service. Guests loved the menu selection. Would book again.",
    timeAgo: "2 weeks ago",
    rating: "4.5",
  },
];

export default function ProviderDashboard() {
  return (
    <ProviderLayout
      title="Welcome, Sarah Catering"
      subtitle="Manage your catering services and bookings"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl  bg-white p-4">
              <img src={stat.img} alt="" className="w-7 h-7 mb-2"/>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Recent Booking Requests
            </h3>
            <button
              type="button"
              className="text-xs font-semibold text-[#7C3AED] hover:text-[#5B21B6]"
            >
              View All →
            </button>
          </div>

          <div className="space-y-4">
            {recentRequests.map((request) => (
              <article
                key={request.title}
                className="rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {request.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Organizer: {request.organizer}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                       {request.date} | {request.city} | {request.guests}
                    </p>
                  </div>
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
                    {request.status}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {request.description}
                </p>

                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    className="h-9 rounded-md bg-green-600 px-3 text-xs font-semibold text-white hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="h-9 rounded-md bg-red-50 px-3 text-xs font-semibold text-red-600 hover:bg-red-100"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    className="h-9 rounded-md bg-slate-100 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl p-4 sm:p-5">
          <h3 className="mb-3 text-base font-bold text-slate-900">
            Upcoming Confirmed Events
          </h3>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 ">
            {upcomingEvents.map((event) => (
              <article
                key={event.title}
                className="rounded-xl border-l-4 border-green-500 p-3 bg-white "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {event.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {event.date}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {event.city} | {event.guests}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    {event.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="rounded-md bg-[#8B5CF6] px-3 py-2 text-xs font-semibold text-white hover:bg-[#7C3AED]"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Contact
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Recent Reviews
            </h3>
            <button
              type="button"
              className="text-xs font-semibold text-[#7C3AED] hover:text-[#5B21B6]"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentReviews.map((review) => (
              <article
                key={review.name}
                className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {review.eventType}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    {review.comment}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {review.timeAgo}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-semibold text-amber-500 ">*****</p>
                  <p className="text-xs font-semibold text-slate-600">
                    {review.rating}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </ProviderLayout>
  );
}
