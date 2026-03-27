import OrganizerLayout from "../../layouts/OrganizerLayout";

import PersonIcon from "../../assets/icons/PersonIcon.svg";
import MoneyIcon from "../../assets/icons/MoneyIcon.svg";
import ClockIcon from "../../assets/icons/ClockIcon.svg";
import BagIcon from "../../assets/icons/BagIcon.svg";
import DateIcon from "../../assets/icons/DateIcon.svg";
import MoneyIcon2 from "../../assets/icons/MoneyIcon2.svg";

const stats = [
  {
    title: "ACTIVE EVENTS",
    value: "3",
    icon: BagIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "PENDING TASKS",
    value: "7",
    icon: ClockIcon,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "TOTAL BUDGET",
    value: "$8.5k",
    icon: MoneyIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "BOOKED PROVIDERS",
    value: "5",
    icon: PersonIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function Dashboard() {
  return (
    <OrganizerLayout
      title="Good morning, John"
      subtitle="Here’s what’s happening with your events"
    >
      <div className="space-y-6">
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg} ${card.iconColor}`}
              >
                <img src={card.icon} alt="" className="h-6 w-6" />
              </div>
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                {card.title}
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
                {card.value}
              </p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <div className="xl:col-span-2">
            <h3 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl">
              Upcoming Event
            </h3>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    Summer Wedding
                  </h4>
                </div>

                <span className="inline-flex w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                  Active
                </span>
              </div>

              <div className="mt-5 flex gap-3.5">
                <div className="flex items-center gap-2">
					<img src={DateIcon} alt="" className="h-4 w-4"/>
                  <p className="mt-1 text-sm font-semibold text-black/60">
                    Jun 15, 2026
                  </p>
                </div>
                <div className="flex items-center gap-2">
					<img src={MoneyIcon2} alt="" className="h-4 w-4"/>
                  <p className="mt-1 text-sm font-semibold text-black/60">
                    5,000
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-semibold text-slate-700">60%</span>
                </div>

                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className="h-2 w-[60%] rounded-full bg-blue-600" />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  View Event
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Edit Event
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </OrganizerLayout>
  );
}
