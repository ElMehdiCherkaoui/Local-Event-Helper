import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import AdminIconUsers from "../../assets/icons/AdminIconUsers.svg";
import AdminIconEvents from "../../assets/icons/AdminIconEvents.svg";
import ProvidersIcon from "../../assets/icons/ProvidersIcon.svg";
import RevenueIcon from "../../assets/icons/Revenue.svg";
import ManagmentIcon from "../../assets/icons/ManagmentIcon.svg";
import OrganizateurIcon from "../../assets/icons/OrganizateurIcon.svg";
import ProviderIcon2 from "../../assets/icons/ProviderIcon2.svg";
import ModerationIcon from "../../assets/icons/ModerationIcon2.svg";

type AdminStats = {
  users: number;
  banned_users: number;
  events: number;
  services: number;
  bookings: number;
  reviews: number;
  conversations: number;
  messages: number;
};

type AdminUser = {
  is_banned?: boolean;
  role?: {
    name?: string;
  };
};

const emptyStats: AdminStats = {
  users: 0,
  banned_users: 0,
  events: 0,
  services: 0,
  bookings: 0,
  reviews: 0,
  conversations: 0,
  messages: 0,
};



export default function DashboardAdmin() {
  const [stats, setStats] = useState<AdminStats>(emptyStats);
  const [organizersTotal, setOrganizersTotal] = useState(0);
  const [organizersBanned, setOrganizersBanned] = useState(0);
  const [providersTotal, setProvidersTotal] = useState(0);
  const [providersBanned, setProvidersBanned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const [statsResponse, usersResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/admin/statistics", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
          axios.get("http://127.0.0.1:8000/api/admin/users", {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }),
        ]);

        const apiStats = statsResponse.data;
        setStats({
          users: apiStats.users,
          banned_users: apiStats.banned_users,
          events: apiStats.events,
          services: apiStats.services,
          bookings: apiStats.bookings,
          reviews: apiStats.reviews,
          conversations: apiStats.conversations,
          messages: apiStats.messages,
        });

        const users: AdminUser[] = usersResponse.data?.users;

        const organizers = users.filter(
          (user) => user.role?.name === "organizer",
        );
        const providers = users.filter(
          (user) => user.role?.name === "provider",
        );

        const bannedOrganizers = organizers.filter(
          (user) => user.is_banned,
        ).length;
        const bannedProviders = providers.filter(
          (user) => user.is_banned,
        ).length;

        setOrganizersTotal(organizers.length);
        setOrganizersBanned(bannedOrganizers);
        setProvidersTotal(providers.length);
        setProvidersBanned(bannedProviders);
      } catch (err: any) {
        const message =
          err?.response?.data?.message || "Failed to load dashboard data.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <AdminLayout
      title="Admin Dashboard"
      subtitle="System Overview & Statistics"
    >
      <main className="space-y-6 p-4 md:p-6">
        {loading ? (
          <p className="text-sm text-gray-300">Loading dashboard data...</p>
        ) : null}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}

        <section>
          <h3 className="mb-4 text-sm font-semibold text-white">
            Platform Overview
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-gray-400">Total Users</p>
                <img
                  src={AdminIconUsers}
                  alt="Users"
                  className="rounded-md bg-cyan-500 text-white px-2 py-4"
                />
              </div>
              <h4 className="text-2xl font-bold text-white">
                {new Date(stats.users).toLocaleString()}
              </h4>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-gray-400">Total Events</p>

                <img
                  src={AdminIconEvents}
                  className="rounded-md bg-purple-500 p-2 text-white px-2 py-4"
                />
              </div>
              <h4 className="text-2xl font-bold text-white">
                {new Date(stats.events).toLocaleString()}
              </h4>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-gray-400">Total Providers</p>

                <img
                  src={ProvidersIcon}
                  className="rounded-md bg-orange-500 p-2 text-white px-2 py-4"
                />
              </div>
              <h4 className="text-2xl font-bold text-white">
                {new Date(providersTotal).toLocaleString()}
              </h4>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs text-gray-400">Total Bookings</p>

                <img
                  src={RevenueIcon}
                  className="rounded-md bg-green-500 p-2 text-white px-2 py-4"
                />
              </div>
              <h4 className="text-2xl font-bold text-white">
                {new Date(stats.bookings).toLocaleString()}
              </h4>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-sm font-semibold text-white">
            User Statistics
          </h3>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
            <div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-4 text-xs text-gray-400">Organizers</p>
                  <h4 className="text-2xl font-bold text-white">
                    {new Date(organizersTotal).toLocaleString()}
                  </h4>
                </div>
                <img src={OrganizateurIcon} alt="" />
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Active</span>
                  <span className="text-green-400">
                    {new Date(organizersTotal - organizersBanned).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Banned</span>
                  <span className="text-red-400">
                    {new Date(organizersBanned).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-4 text-xs text-gray-400">Providers</p>
                  <h4 className="text-2xl font-bold text-white">
                    {new Date(providersTotal).toLocaleString()}
                  </h4>
                </div>

                <img src={ProviderIcon2} alt="" />
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between text-gray-300">
                  <span>Active</span>
                  <span className="text-green-400">
                    {new Date(providersTotal - providersBanned).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Banned</span>
                  <span className="text-red-400">
                    {new Date(providersBanned).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-sm font-semibold text-white">
            Event Statistics
          </h3>

          <div className="rounded-lg border border-white/5 bg-[#1E293B] p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-md border border-white/5 bg-[#0F172A] p-4">
                <p className="text-xs text-gray-400">Total Events</p>
                <h4 className="mt-2 text-xl font-bold text-white">
                  {new Date(stats.events).toLocaleString()}
                </h4>
              </div>

              <div className="rounded-md border border-white/5 bg-[#0F172A] p-4">
                <p className="text-xs text-gray-400">Services</p>
                <h4 className="mt-2 text-xl font-bold text-green-400">
                  {new Date(stats.services).toLocaleString()}
                </h4>
              </div>

              <div className="rounded-md border border-white/5 bg-[#0F172A] p-4">
                <p className="text-xs text-gray-400">Reviews</p>
                <h4 className="mt-2 text-xl font-bold text-orange-400">
                  {new Date(stats.reviews).toLocaleString()}
                </h4>
              </div>

              <div className="rounded-md border border-white/5 bg-[#0F172A] p-4">
                <p className="text-xs text-gray-400">Messages</p>
                <h4 className="mt-2 text-xl font-bold text-red-400">
                  {new Date(stats.messages).toLocaleString()}
                </h4>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-sm font-semibold text-white">
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-lg bg-blue-600 p-5 text-white">
              <img src={AdminIconUsers} alt="" className="mb-4 w-12" />
              <h4 className="font-semibold">Manage Users</h4>
              <p className="mt-1 text-sm text-blue-100">
                Add, edit, or remove users
              </p>
            </div>

            <div className="rounded-lg bg-orange-600 p-5 text-white">
              <img src={ModerationIcon} alt="" className="mb-4 w-12" />
              <h4 className="font-semibold">Moderation Queue</h4>
              <p className="mt-1 text-sm text-orange-100">
                Total reviews ({new Date(stats.reviews).toLocaleString()})
              </p>
            </div>

            <div className="rounded-lg bg-green-600 p-5 text-white lg:col-span-1">
              <img src={ManagmentIcon} alt="" className="mb-4 w-8" />
              <h4 className="font-semibold">View Reports</h4>
              <p className="mt-1 text-sm text-green-100">
                Detailed analytics & reports
              </p>
            </div>
          </div>
        </section>
      </main>
    </AdminLayout>
  );
}
