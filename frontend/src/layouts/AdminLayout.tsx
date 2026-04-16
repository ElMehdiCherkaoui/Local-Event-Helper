import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AdminIconDashboard from '../assets/icons/AdminIconDashboard.svg';
import AdminIconUsers from '../assets/icons/AdminIconUsers.svg';
import AdminIconEvents from '../assets/icons/AdminIconEvents.svg';
import AdminIconLogs from '../assets/icons/AdminIconLogs.svg';
import AdminIconModiration from '../assets/icons/AdminIconModiration.svg';

type AdminLayoutProps = {
	children: ReactNode;
	title: string;
	subtitle: string;
};

export default function AdminLayout({
	children,
	title,
	subtitle,
}: AdminLayoutProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	let loggedUserName = 'Admin User';
	let loggedUserInitials = 'AU';

	try {
		const userText = localStorage.getItem('user');
		if (userText) {
			const user = JSON.parse(userText);
			const fullName = (user?.name || '').trim();

			if (fullName) {
				loggedUserName = fullName;
				loggedUserInitials = fullName[0].toUpperCase();
			}
		}
	} catch {
		
	}

	const closeSidebar = () => setIsSidebarOpen(false);
	const openSidebar = () => setIsSidebarOpen(true);

	const isActive = (path: string) => location.pathname === path;

	const handleLogout = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			try {
				await fetch('http://127.0.0.1:8000/api/logout', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
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
		<div className="bg-[#2f2f2f] font-sans min-h-screen w-full">
			<div className="flex min-h-screen w-full overflow-hidden bg-[#0F172A]">
				<aside
					className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#020617] text-white transition-transform duration-300 md:static ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
						}`}
				>
					<div className="flex h-full flex-col">
						<div className=" border-white/10 px-6 py-5">
							<h1 className="text-xl text-center font-bold">LEH Admin</h1>
						</div>

						<nav className="flex-1 space-y-2 px-4 py-5 text-sm">
							<Link
								to="/admin/dashboard"
								onClick={closeSidebar}
								className={`flex items-center gap-3 rounded-md px-4 py-3 font-semibold transition-colors ${isActive("/admin/dashboard")
									? "bg-blue-500 text-white"
									: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<img src={AdminIconDashboard} alt="Dashboard" className="h-5 w-5" />
								<span>Dashboard</span>
							</Link>

							<Link
								to="/admin/users"
								onClick={closeSidebar}
								className={`flex items-center gap-3 rounded-md px-4 py-3 font-semibold transition-colors ${isActive("/admin/users")
									? "bg-blue-500 text-white"
									: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<img src={AdminIconUsers} alt="Users" className="h-5 w-5" />
								<span>Users</span>
							</Link>

							<Link
								to="/admin/events"
								onClick={closeSidebar}
								className={`flex items-center gap-3 rounded-md px-4 py-3 font-semibold  transition-colors ${isActive("/admin/events")
									? "bg-blue-500 text-white"
									: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<img src={AdminIconEvents} alt="Events" className="h-5 w-5" />
								<span>Events</span>
							</Link>

							<Link
								to="/admin/moderation"
								onClick={closeSidebar}
								className={`flex items-center gap-3 rounded-md px-4 py-3 font-semibold  transition-colors ${isActive("/admin/moderation")
									? "bg-blue-500 text-white"
									: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<img src={AdminIconModiration} alt="Moderation" className="h-5 w-5" />
								<span>Moderation</span>
							</Link>

							<Link
								to="/admin/logs"
								onClick={closeSidebar}
								className={`flex items-center gap-3 rounded-md px-4 py-3 font-semibold  transition-colors ${isActive("/admin/logs")
									? "bg-blue-500 text-white"
									: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<img src={AdminIconLogs} alt="Logs" className="h-5 w-5" />
								<span>Logs</span>
							</Link>
							<div className="px-4 pt-4">
								<div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3">
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
										{loggedUserInitials}
									</div>
									<div>
										<p className="text-xs font-medium text-white">{loggedUserName}</p>
										<p className="text-[10px] text-gray-400">Admin</p>
									</div>
								</div>
							</div>
							<div className="p-4">
								<button
									type="button"
									onClick={handleLogout}
									className="w-full rounded-md bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600"
								>
									Logout
								</button>
							</div>
						</nav>


					</div>
				</aside>

				{isSidebarOpen && (
					<div
						onClick={closeSidebar}
						className="fixed inset-0 z-40 bg-black/50 md:hidden"
					/>
				)}

				<div className="flex-1">
					<header className="flex items-center justify-between bg-[#1E293B] px-4 py-4 md:px-6">
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={openSidebar}
								className="text-white md:hidden"
							>
								☰
							</button>
							<div>
								<h2 className="text-xl font-semibold text-white">{title}</h2>
								<p className="text-[1em] text-gray-400">{subtitle}</p>
							</div>
						</div>


					</header>

					{children}
				</div>
			</div>
		</div>
	);
}
