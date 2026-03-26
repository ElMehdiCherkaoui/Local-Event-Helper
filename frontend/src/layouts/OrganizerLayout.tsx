import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type OrganizerLayoutProps = {
	children: ReactNode;
	title?: string;
	subtitle?: string;
};

function DashboardIcon() {
	return <span className="text-sm">⌘</span>;
}

function EventsIcon() {
	return <span className="text-sm">≡</span>;
}

function ProvidersIcon() {
	return <span className="text-sm">⌕</span>;
}

function MessagesIcon() {
	return <span className="text-sm">▭</span>;
}

function ProfileIcon() {
	return <span className="text-sm">◌</span>;
}

export default function OrganizerLayout({
	children,
	title,
	subtitle,
}: OrganizerLayoutProps) {
	const location = useLocation();

	const isActive = (path: string) => location.pathname === path;

	return (
		<div className="min-h-screen w-full bg-[#2f2f2f] font-sans">
			<div className="flex min-h-screen w-full overflow-hidden bg-[#EDEDED]">
				{/* Desktop sidebar only */}
				<aside className="hidden w-64 flex-col bg-[#050B18] text-white lg:flex">
					<div className="flex h-full flex-col">
						<div className="px-8 py-5">
							<h1 className="text-xl font-bold">LEH</h1>
						</div>

						<nav className="flex-1 space-y-2 px-4 py-5 text-sm">
							<Link
								to="/organizer/dashboard"
								className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${isActive("/organizer/dashboard")
										? "bg-[#1A2340] text-white"
										: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<DashboardIcon />
								<span>Dashboard</span>
							</Link>

							<Link
								to="/organizer/events"
								className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${isActive("/organizer/events")
										? "bg-[#1A2340] text-white"
										: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<EventsIcon />
								<span>My Events</span>
							</Link>

							<Link
								to="/organizer/providers"
								className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${isActive("/organizer/providers")
										? "bg-[#1A2340] text-white"
										: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<ProvidersIcon />
								<span>Find Providers</span>
							</Link>

							<Link
								to="/organizer/messages"
								className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${isActive("/organizer/messages")
										? "bg-[#1A2340] text-white"
										: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<MessagesIcon />
								<span>Messages</span>
							</Link>

							<Link
								to="/organizer/profile"
								className={`flex items-center gap-3 rounded-md px-4 py-3 transition-colors ${isActive("/organizer/profile")
										? "bg-[#1A2340] text-white"
										: "text-gray-300 hover:bg-white/5"
									}`}
							>
								<ProfileIcon />
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
						className={`flex flex-col items-center gap-1 py-1 ${isActive("/organizer/dashboard")
								? "text-blue-500"
								: "text-gray-400"
							}`}
					>
						<DashboardIcon />
						<span>Home</span>
					</Link>

					<Link
						to="/organizer/events"
						className={`flex flex-col items-center gap-1 py-1 ${isActive("/organizer/events") ? "text-blue-500" : "text-gray-400"
							}`}
					>
						<EventsIcon />
						<span>Events</span>
					</Link>

					<Link
						to="/organizer/providers"
						className={`flex flex-col items-center gap-1 py-1 ${isActive("/organizer/providers")
								? "text-blue-500"
								: "text-gray-400"
							}`}
					>
						<ProvidersIcon />
						<span>Search</span>
					</Link>

					<Link
						to="/organizer/messages"
						className={`flex flex-col items-center gap-1 py-1 ${isActive("/organizer/messages")
								? "text-blue-500"
								: "text-gray-400"
							}`}
					>
						<MessagesIcon />
						<span>Messages</span>
					</Link>

					<Link
						to="/organizer/profile"
						className={`flex flex-col items-center gap-1 py-1 ${isActive("/organizer/profile") ? "text-blue-500" : "text-gray-400"
							}`}
					>
						<ProfileIcon />
						<span>Profile</span>
					</Link>
				</div>
			</nav>
		</div>
	);
}
