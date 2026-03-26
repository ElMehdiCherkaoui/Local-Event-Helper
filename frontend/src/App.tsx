import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardAdmin from './pages/admin/Dashboard';
import UserAdmin from './pages/admin/Users';
import EventAdmin from './pages/admin/Events';
import ModerationAdmin from './pages/admin/Moderation';
import LogsAdmin from './pages/admin/AuditLogs';

import OrganizerDashboard from './pages/organizer/Dashboard';
import OrganizerEvents from './pages/organizer/Events';
import OrganizerEventDetails from './pages/organizer/EventDetails';
import OrganizerProvidersSearch from './pages/organizer/ProvidersSearch';
import OrganizerProvidersDetails from './pages/organizer/ProvidersDetails';
import OrganizerMessages from './pages/organizer/Messages';
import OrganizerProfile from './pages/organizer/Profile';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/admin/dashboard' element={<DashboardAdmin />} />
				<Route path='/admin/users' element={<UserAdmin />} />
				<Route path='/admin/events' element={<EventAdmin />} />
				<Route path='/admin/moderation' element={<ModerationAdmin />} />
				<Route path='/admin/logs' element={<LogsAdmin />} />
				<Route path='/organizer/dashboard' element={<OrganizerDashboard />} />
				<Route path='/organizer/events' element={<OrganizerEvents />} />
				<Route path='/organizer/events/:eventId' element={<OrganizerEventDetails />} />
				<Route path='/organizer/providers' element={<OrganizerProvidersSearch />} />
				<Route path='/organizer/providers/:providerId' element={<OrganizerProvidersDetails />} />
				<Route path='/organizer/messages' element={<OrganizerMessages />} />
				<Route path='/organizer/profile' element={<OrganizerProfile />} />
			</Routes>
		</BrowserRouter>
	)
}
