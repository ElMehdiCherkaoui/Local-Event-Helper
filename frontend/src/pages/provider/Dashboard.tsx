import { useEffect, useState } from "react";
import axios from "axios";
import ProviderLayout from "../../layouts/ProviderLayout";

type StatCard = {
  label: string;
  value: string;
};

type UserProfile = {
  name?: string | null;
};

type BookingItem = {
  status?: string | null;
  budget_amount?: string | number | null;
  provider?: {
    id?: number | null;
  } | null;
};

type ReviewItem = {
  rating?: string | number | null;
};

export default function ProviderDashboard() {
  const [providerName, setProviderName] = useState("Provider");
  const [pendingRequests, setPendingRequests] = useState("0");
  const [confirmedBookings, setConfirmedBookings] = useState("0");
  const [averageRating, setAverageRating] = useState("0.0");
  const [totalRevenue, setTotalRevenue] = useState("$0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        };

        const [userResponse, servicesResponse, bookingsResponse, reviewsResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/user", { headers }),
          axios.get("http://127.0.0.1:8000/api/provider/services", { headers }),
          axios.get("http://127.0.0.1:8000/api/booking-requests", { headers }),
          axios.get("http://127.0.0.1:8000/api/reviews", { headers }),
        ]);

        const user = (userResponse.data?.user ?? {}) as UserProfile;
        setProviderName(user.name || "Provider");

        const services = servicesResponse.data?.services ?? [];
        const bookings = (bookingsResponse.data?.bookings ?? []) as BookingItem[];
        const reviews = (reviewsResponse.data?.reviews ?? []) as ReviewItem[];

        let pendingCount = 0;
        let confirmedCount = 0;
        let revenueCount = 0;

        for (const booking of bookings) {
          if (booking.status === "pending") {
            pendingCount += 1;
          }

          if (booking.status === "confirmed") {
            confirmedCount += 1;
            revenueCount += Number(booking.budget_amount || 0);
          }
        }

        let ratingSum = 0;
        let ratingCount = 0;

        for (const review of reviews) {
          const rating = Number(review.rating || 0);

          if (rating > 0) {
            ratingSum += rating;
            ratingCount += 1;
          }
        }

        const average = ratingCount > 0 ? (ratingSum / ratingCount).toFixed(1) : "0.0";

        setPendingRequests(String(pendingCount));
        setConfirmedBookings(String(confirmedCount));
        setAverageRating(average);
        setTotalRevenue(`$${revenueCount.toFixed(0)}`);

        if (services.length === 0 && bookings.length === 0 && reviews.length === 0) {
          setError("");
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats: StatCard[] = [
    {
      label: "Pending Requests",
      value: pendingRequests,
    },
    {
      label: "Confirmed Bookings",
      value: confirmedBookings,
    },
    {
      label: "Average Rating",
      value: averageRating,
    },
    {
      label: "Total Revenue",
      value: totalRevenue,
    },
  ];

  return (
    <ProviderLayout
      title={`Welcome, ${providerName}`}
      subtitle="Manage your services and bookings"
    >
      <div className="space-y-4">
        {loading ? <p className="text-sm text-slate-500">Loading dashboard...</p> : null}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                {stat.label}
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </ProviderLayout>
  );
}
