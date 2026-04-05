import AdminLayout from "../../layouts/AdminLayout";
import AdminEventIcon from '../../assets/icons/AdminIconEvents.svg';
import BannedIcon from '../../assets/icons/BannedIcon.svg';
import FlagIcon from '../../assets/icons/FlagIcon.svg';
import ReportIcon from '../../assets/icons/ReportIcon.svg';
import AdminIconUsers from '../../assets/icons/AdminIconUsers.svg';
import Symbol from '../../assets/icons/Symbol.svg';
const stats = [
		{
			label: "Pending Events",
			value: 18,
			icon: AdminEventIcon,
			iconBg: "bg-blue-500",
		},
		{
			label: "Reported Users",
			value: 5,
			icon: ReportIcon,
			iconBg: "bg-red-500",
		},
		{
			label: "Banned Users",
			value: 17,
			icon: BannedIcon,
			iconBg: "bg-pink-500",
		},
		{
			label: "Flagged Content",
			value: 3,
			icon: FlagIcon,
			iconBg: "bg-indigo-500",
		},
	] as const;

	const moderationEvents = [
		{
			id: "EVT-2401",
			title: "Beach Wedding Ceremony",
			organizer: "Emma Wilson",
			email: "emma@example.com",
			location: "Essaouira Beach",
			date: "July 20, 2026",
			submittedAgo: "2 hours ago",
			guests: 120,
			budget: "6,000",
			status: "Pending",
		},
		{
			id: "EVT-2402",
			title: "Tech Startup Launch",
			organizer: "Tech Innovations Ltd",
			email: "contact@techinnovations.com",
			location: "Casablanca Convention",
			date: "March 15, 2026",
			submittedAgo: "5 hours ago",
			guests: 300,
			budget: "12,000",
			status: "Pending",
		},
	] ;
export default function Moderation() {
	

	return (
		<AdminLayout
			title="Moderation Center"
			subtitle="Review users, events, and handle reports"
		>
			<main className="space-y-6 p-4 md:p-6">
				<section>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{stats.map((stat) => (
							<div
								key={stat.label}
								className="rounded-xl border border-white/10 bg-[#1E293B] p-4 md:p-5"
							>
								<div className="mb-4 flex items-start justify-between gap-3">
									<p className="text-xs text-gray-400">{stat.label}</p>

									<div
										className={`flex h-7 w-7 items-center justify-center rounded-md text-xs text-white ${stat.iconBg}`}
									>
									<img src={stat.icon} alt="" />
									</div>
									
								</div>

								<p className="text-3xl font-bold text-white">{stat.value}</p>
							</div>
						))}
					</div>
				</section>

				<section className="space-y-4">
					{moderationEvents.map((event) => (
						<article
							key={event.id}
							className="rounded-xl border border-white/10 bg-[#1E293B] p-4 md:p-5"
						>
							<div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
								<div>
									<h3 className="text-lg font-semibold text-white">
										{event.title}
									</h3>
									<p className="mt-1 text-xs text-gray-500">#{event.id}</p>
								</div>

								<span className="w-fit rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-medium text-yellow-300">
									{event.status}
								</span>
							</div>

							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="space-y-5 text-sm">
									<div>
										<p className="mb-1 text-xs text-gray-500">Organizer</p>
										<p className="font-medium text-white">{event.organizer}</p>
										<p className="text-gray-400">{event.email}</p>
									</div>

									<div>
										<p className="mb-1 text-xs text-gray-500">Location & Date</p>
										<p className="font-medium text-white flex items-center gap-2"><img src={Symbol} alt="" /> {event.location}</p>
										<p className="text-gray-400">{event.date}</p>
									</div>
								</div>

								<div className="space-y-5 text-sm md:text-left">
									<div>
										<p className="mb-1 text-xs text-gray-500">Submitted</p>
										<p className="font-medium text-white">{event.submittedAgo}</p>
									</div>

									<div>
										<p className="mb-1 text-xs text-gray-500">Guests & Budget</p>
										<p className="font-medium text-white flex items-center gap-2"><img src={AdminIconUsers} alt="" /> {event.guests} guests</p>
										<p className="text-gray-400 flex items-center gap-1" > <div className="font-bold text-white">$</div> {event.budget}</p>
									</div>
								</div>
							</div>

							<div className="mt-5 border-t border-white/10 pt-4">
								<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
									<button className="rounded-md bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-600">
										Approve
									</button>

									<button className="rounded-md bg-rose-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-rose-600">
										Reject
									</button>
								</div>
							</div>
						</article>
					))}
				</section>
			</main>
		</AdminLayout>
	);
}