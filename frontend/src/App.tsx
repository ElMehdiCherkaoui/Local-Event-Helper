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
			</Routes>
		</BrowserRouter>
	)
}
