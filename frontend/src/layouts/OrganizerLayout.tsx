import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ProfileIconOrganizateur from "../assets/icons/ProfileIconOrganizateur.svg";
import MessagesIconOrganizateur from "../assets/icons/MessagesIconOrganizateur.svg";
import SearchIconOrganizateur from "../assets/icons/SearchIconOrganizateur.svg";
import EventsIconOrganizateur from "../assets/icons/EventsIconOrganizateur.svg";
import DashboardIconOrganizateur from "../assets/icons/DashboardIconOrganizateur.svg";

type OrganizerLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export default function OrganizerLayout({
  children,
  title,
  subtitle,
}: OrganizerLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        await fetch('http://127.0.0.1:8000/api/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
      } catch {
  
      }
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-[#2f2f2f] font-sans">
      <div className="flex min-h-screen w-full overflow-hidden bg-[#EDEDED]">

        <aside className="hidden w-64 flex-col bg-[#050B18] text-white lg:flex">
          <div className="flex h-full flex-col">
            <div className="px-8 py-5">
              <h1 className="text-xl font-bold">LEH</h1>
            </div>

            <nav className="flex-1 space-y-2 px-4 py-5 text-sm">
              <Link
                to="/organizer/dashboard"
                className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${
                  isActive("/organizer/dashboard")
                    ? "bg-[#1A2340] text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <img src={DashboardIconOrganizateur} alt="Dashboard" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/organizer/events"
                className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${
                  isActive("/organizer/events")
                    ? "bg-[#1A2340] text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <img src={EventsIconOrganizateur} alt="Events" />
                <span>My Events</span>
              </Link>

              <Link
                to="/organizer/providers"
                className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${
                  isActive("/organizer/providers")
                    ? "bg-[#1A2340] text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <img src={SearchIconOrganizateur} alt="Find Providers" />
                <span>Find Providers</span>
              </Link>

              <Link
                to="/organizer/messages"
                className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${
                  isActive("/organizer/messages")
                    ? "bg-[#1A2340] text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <img src={MessagesIconOrganizateur} alt="Messages" />
                <span>Messages</span>
              </Link>

              <Link
                to="/organizer/profile"
                className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${
                  isActive("/organizer/profile")
                    ? "bg-[#1A2340] text-white"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                <img src={ProfileIconOrganizateur} alt="Profile" />
                <span>My Profile</span>
              </Link>
            </nav>

            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold">
                  JD
                </div>

                <div>
                  <p className="text-xs font-medium">ElMehdi Cherkaoui</p>
                  <p className="text-[10px] text-gray-400">Organizer</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 w-full rounded-2xl border border-white/10 py-2.5 text-center text-md font-medium hover:bg-red-500 hover:text-black text-red-400"
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-black/5 bg-[#EDEDED] px-4 py-4 sm:px-5 lg:px-6">
            <div>
              <h2 className="text-sm font-bold text-[#161B26] sm:text-base lg:text-xl">
                {title}
              </h2>
              <p className="text-[10px] text-gray-500 sm:text-[11px] lg:text-xs">
                {subtitle}
              </p>
            </div>
          </header>

          <main className="px-4 py-4 pb-24 sm:px-5 lg:px-6 lg:py-5 lg:pb-6">
            {children}
          </main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#050B18] px-2 py-2 text-white lg:hidden">
        <div className="grid grid-cols-5 text-center text-[10px]">
          <Link
            to="/organizer/dashboard"
            className={`flex flex-col items-center gap-1 py-1 ${
              isActive("/organizer/dashboard")
                ? "text-blue-500"
                : "text-gray-400"
            }`}
          >
            <img src={DashboardIconOrganizateur} alt="Dashboard" />
            <span>Home</span>
          </Link>

          <Link
            to="/organizer/events"
            className={`flex flex-col items-center gap-1 py-1 ${
              isActive("/organizer/events") ? "text-blue-500" : "text-gray-400"
            }`}
          >
            <img src={EventsIconOrganizateur} alt="Events" />
            <span>Events</span>
          </Link>

          <Link
            to="/organizer/providers"
            className={`flex flex-col items-center gap-1 py-1 ${
              isActive("/organizer/providers")
                ? "text-blue-500"
                : "text-gray-400"
            }`}
          >
            <img src={SearchIconOrganizateur} alt="Find Providers" />
            <span>Search</span>
          </Link>

          <Link
            to="/organizer/messages"
            className={`flex flex-col items-center gap-1 py-1 ${
              isActive("/organizer/messages")
                ? "text-blue-500"
                : "text-gray-400"
            }`}
          >
            <img src={MessagesIconOrganizateur} alt="Messages" />
            <span>Messages</span>
          </Link>

          <Link
            to="/organizer/profile"
            className={`flex flex-col items-center gap-1 py-1 ${
              isActive("/organizer/profile") ? "text-blue-500" : "text-gray-400"
            }`}
          >
            <img src={ProfileIconOrganizateur} alt="Profile" />
            <span>Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
