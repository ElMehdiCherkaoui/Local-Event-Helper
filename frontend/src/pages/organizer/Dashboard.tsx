import { useEffect, useState } from "react";
import axios from "axios";

import OrganizerLayout from "../../layouts/OrganizerLayout";

import PersonIcon from "../../assets/icons/PersonIcon.svg";
import MoneyIcon from "../../assets/icons/MoneyIcon.svg";
import ClockIcon from "../../assets/icons/ClockIcon.svg";
import BagIcon from "../../assets/icons/BagIcon.svg";

type EventTask = {
  status?: string | null;
};

type EventBudget = {
  total_amount?: string | number | null;
};

type EventItem = {
  status?: string | null;
  tasks?: EventTask[];
  bookings?: { status?: string | null }[];
  budget?: EventBudget | null;
};

type DashboardStats = {
  activeEvents: number;
  pendingTasks: number;
  totalBudget: number;
  bookedProviders: number;
};

const emptyStats: DashboardStats = {
  activeEvents: 0,
  pendingTasks: 0,
  totalBudget: 0,
  bookedProviders: 0,
};

const cards = [
  {
    title: "ACTIVE EVENTS",
    key: "activeEvents",
    icon: BagIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "PENDING EVENTS",
    key: "pendingTasks",
    icon: ClockIcon,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "TOTAL BUDGET",
    key: "totalBudget",
    icon: MoneyIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "BOOKED PROVIDERS",
    key: "bookedProviders",
    icon: PersonIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
] as const;

function getUserName() {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return "UNKOWN USER";
  }

  try {
    const user = JSON.parse(storedUser);

    return user?.name;
  } catch {
    return "UNKOWN USER";
  }
}

export default function Dashboard() {
  const [userName] = useState(() => getUserName());
  const [stats, setStats] = useState<DashboardStats>(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStats = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const events = (response.data?.events ?? []) as EventItem[];

        const activeEvents = events.filter(
          (event) => event.status === "in_progress",
        ).length;

        const pendingTasks = events.filter(
          (event) => event.status === "planning",
        ).length;

        let totalBudget = 0;

        for (const event of events) {
          totalBudget += Number(event.budget?.total_amount ?? 0);
        }

        let bookedProviders = 0;

        for (const event of events) {
          const bookings = event.bookings ?? [];

          for (const booking of bookings) {
            if (booking.status === "confirmed") {
              bookedProviders += 1;
            }
          }
        }

        setStats({
          activeEvents,
          pendingTasks,
          totalBudget,
          bookedProviders,
        });
      } catch (err: any) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <OrganizerLayout
      title={`Good morning, ${userName}`}
      subtitle="Here’s what’s happening with your events"
    >
      <div className="space-y-6">
        {loading ? (
          <p className="text-sm text-slate-500">Loading dashboard data...</p>
        ) : null}

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
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
                {card.key === "totalBudget"
                  ? `$${stats[card.key].toLocaleString()}`
                  : stats[card.key].toLocaleString()}
              </p>
            </div>
          ))}
        </section>
      </div>
    </OrganizerLayout>
  );
}
