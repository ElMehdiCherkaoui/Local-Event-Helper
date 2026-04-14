import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardAdmin from "./pages/admin/Dashboard";
import UserAdmin from "./pages/admin/Users";
import EventAdmin from "./pages/admin/Events";
import ModerationAdmin from "./pages/admin/Moderation";
import LogsAdmin from "./pages/admin/AuditLogs";

import OrganizerDashboard from "./pages/organizer/Dashboard";
import OrganizerEvents from "./pages/organizer/Events";
import OrganizerEventDetails from "./pages/organizer/EventDetails";
import OrganizerProvidersSearch from "./pages/organizer/ProvidersSearch";
import OrganizerProvidersDetails from "./pages/organizer/ProvidersDetails";
import OrganizerMessages from "./pages/organizer/Messages";
import OrganizerProfile from "./pages/organizer/Profile";
import ProviderDashboard from "./pages/provider/Dashboard";
import ProviderServices from "./pages/provider/Services";
import ProviderBookings from "./pages/provider/Bookings";
import ProviderReviews from "./pages/provider/Reviews";
import ProviderAvailability from "./pages/provider/Availability";
import ProviderMessages from "./pages/provider/Messages";
import ProviderProfile from "./pages/provider/Profile";

function protectAdminPage(page: any) {
  const token = localStorage.getItem("token");
  const userText = localStorage.getItem("user");

  if (!token || !userText) {
    return <Navigate to="/login" replace />;
  }

  let user: any = null;

  try {
    user = JSON.parse(userText);
  } catch {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const roleId = user?.role_id;
  const isAdmin = roleId === 1;

  if (!isAdmin) {
    if (roleId === 3) {
      return <Navigate to="/provider/dashboard" replace />;
    }

    return <Navigate to="/organizer/dashboard" replace />;
  }

  return page;
}

function protectOrganizerPage(page: any) {
  const token = localStorage.getItem("token");
  const userText = localStorage.getItem("user");

  if (!token || !userText) {
    return <Navigate to="/login" replace />;
  }

  let user: any = null;

  try {
    user = JSON.parse(userText);
  } catch {
    return <Navigate to="/login" replace />;
  }

  const roleId = user?.role_id;
  const isOrganizer = roleId === 2;

  if (!isOrganizer) {
    if (roleId === 1) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (roleId === 3) {
      return <Navigate to="/provider/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return page;
}

function protectProviderPage(page: any) {
  const token = localStorage.getItem("token");
  const userText = localStorage.getItem("user");

  if (!token || !userText) {
    return <Navigate to="/login" replace />;
  }

  let user: any = null;

  try {
    user = JSON.parse(userText);
  } catch {
    return <Navigate to="/login" replace />;
  }

  const roleId = user?.role_id;
  const isProvider = roleId === 3;

  if (!isProvider) {
    if (roleId === 1) {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (roleId === 2) {
      return <Navigate to="/organizer/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return page;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/dashboard"
          element={protectAdminPage(<DashboardAdmin />)}
        />
        <Route path="/admin/users" element={protectAdminPage(<UserAdmin />)} />
        <Route
          path="/admin/events"
          element={protectAdminPage(<EventAdmin />)}
        />
        <Route
          path="/admin/moderation"
          element={protectAdminPage(<ModerationAdmin />)}
        />
        <Route path="/admin/logs" element={protectAdminPage(<LogsAdmin />)} />
        <Route
          path="/organizer/dashboard"
          element={protectOrganizerPage(<OrganizerDashboard />)}
        />
        <Route
          path="/organizer/events"
          element={protectOrganizerPage(<OrganizerEvents />)}
        />
        <Route
          path="/organizer/events/:eventId"
          element={protectOrganizerPage(<OrganizerEventDetails />)}
        />
        <Route
          path="/organizer/providers"
          element={protectOrganizerPage(<OrganizerProvidersSearch />)}
        />
        <Route
          path="/organizer/providers/:providerId"
          element={protectOrganizerPage(<OrganizerProvidersDetails />)}
        />
        <Route
          path="/organizer/messages"
          element={protectOrganizerPage(<OrganizerMessages />)}
        />
        <Route
          path="/organizer/profile"
          element={protectOrganizerPage(<OrganizerProfile />)}
        />
        <Route
          path="/provider/dashboard"
          element={protectProviderPage(<ProviderDashboard />)}
        />
        <Route
          path="/provider/services"
          element={protectProviderPage(<ProviderServices />)}
        />
        <Route
          path="/provider/bookings"
          element={protectProviderPage(<ProviderBookings />)}
        />
        <Route
          path="/provider/reviews"
          element={protectProviderPage(<ProviderReviews />)}
        />
        <Route
          path="/provider/availability"
          element={protectProviderPage(<ProviderAvailability />)}
        />
        <Route
          path="/provider/messages"
          element={protectProviderPage(<ProviderMessages />)}
        />
        <Route
          path="/provider/profile"
          element={protectProviderPage(<ProviderProfile />)}
        />
      </Routes>
    </BrowserRouter>
  );
}
