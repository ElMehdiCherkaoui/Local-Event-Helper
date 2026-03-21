import AdminLayout from "../../layouts/AdminLayout";
import AdminEventIcon from '../../assets/icons/AdminIconEvents.svg';
import ActiveIcon from '../../assets/icons/ActiveIcon.svg';
import CompletedIcon from '../../assets/icons/CompletedIcon.svg';
import UpIcon from '../../assets/icons/UpIcon.svg';

type StatCardProps = {
	label: string;
	value: string;
	icon: string;
	subtitle: string;
	iconColor?: string;
};

const recentEvents = [
	{
		id: "EVT-1234",
		name: "Summer Wedding",
		owner: "El Mehdi Cherkaoui",
		date: "June 15, 2026",
		location: "Marrakech",
		guests: 150,
		budget: "$5,000",
		status: "Active",
		statusClass: "bg-green-500/20 text-green-300",
		created_at: "",
	},
	{
		id: "EVT-1236",
		name: "Corporate Conference",
		owner: "Business Solutions Inc.",
		date: "April 18, 2026",
		location: "Rabat",
		guests: 200,
		budget: "$4,500",
		status: "Upcoming",
		statusClass: "bg-blue-500/20 text-blue-300",
		created_at: "",
	},
	{
		id: "EVT-1236",
		name: "Birthday Party",
		owner: "Alice Smith",
		date: "Feb 1, 2026",
		location: "Casablanca",
		guests: 50,
		budget: "$800",
		status: "Completed",
		statusClass: "bg-purple-500/20 text-purple-300",
		created_at: "",
	},
];

function StatCard({
	label,
	value,
	icon,
	subtitle,

}: StatCardProps) {
	return (
		<div className="rounded-xl border border-white/10 bg-[#1E293B] p-4">
			<div className="mb-3 flex items-start justify-between">
				<p className="text-xs text-gray-400">{label}</p>
				<img src={icon} alt="" className="w-4" />
			</div>

			<h4 className="text-2xl font-bold text-white">{value}</h4>
			<p className="mt-1 text-xs text-gray-500">{subtitle}</p>
		</div>
	);
}

export default function Events() {
	return (
		<AdminLayout
			title="Events & Statistics"
			subtitle="View and manage all platform events"
		>
			<main className="space-y-4 p-4 md:p-6">
				<section>
					<h3 className="mb-3 text-sm font-semibold text-white">
						Event Statistics
					</h3>

					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
						<StatCard
							label="Total Events"
							value="3,456"
							icon={AdminEventIcon}
							subtitle="All time"
							iconColor="text-blue-400"
						/>
						<StatCard
							label="Active Events"
							value="234"
							icon={ActiveIcon}
							subtitle="Ongoing"
							iconColor="text-green-400"
						/>
						<StatCard
							label="Completed"
							value="2,890"
							icon={CompletedIcon}
							subtitle="Finished"
							iconColor="text-purple-400"
						/>
						<StatCard
							label="This Month"
							value="127"
							icon={UpIcon}
							subtitle="+8%"
							iconColor="text-emerald-400"
						/>
					</div>
				</section>
				<h3 className="mb-4 text-sm font-semibold text-white">
					Provider Statistics
				</h3>
				<section className="rounded-xl border border-white/10 bg-[#1E293B] p-4">


					<div className="space-y-4">
						<div className="rounded-md border border-white/30 bg-[#0F172A] p-4">
							<p className="text-xs text-gray-400">Total Providers</p>
							<p className="mt-1 text-2xl font-bold text-white">428</p>
						</div>

						<div className=" h-[0.1em] w-fullrounded bg-white/30"></div>

						<div className="space-y-3 text-xs text-gray-300">
							<div>
								<div className="mb-1 flex items-center justify-between">
									<span>Photography</span>
									<span>150</span>
								</div>
								<div className="h-1.5 rounded bg-[#1c2b49]">
									<div className="h-1.5 w-[65%] rounded bg-blue-500"></div>
								</div>
							</div>

							<div>
								<div className="mb-1 flex items-center justify-between">
									<span>Catering</span>
									<span>128</span>
								</div>
								<div className="h-1.5 rounded bg-[#1c2b49]">
									<div className="h-1.5 w-[55%] rounded bg-purple-500"></div>
								</div>
							</div>

							<div>
								<div className="mb-1 flex items-center justify-between">
									<span>DJ/Music</span>
									<span>86</span>
								</div>
								<div className="h-1.5 rounded bg-[#1c2b49]">
									<div className="h-1.5 w-[40%] rounded bg-pink-500"></div>
								</div>
							</div>

							<div >
								<div className="mb-1 flex items-center justify-between">
									<span>Decoration</span>
									<span>64</span>
								</div>
								<div className="h-1.5 rounded bg-[#1c2b49]">
									<div className="h-1.5 w-[30%] rounded bg-green-500"></div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="space-y-3">
					<h3 className="text-sm font-semibold text-white">Recent Events</h3>

					{recentEvents.map((event) => (
						<article
							key={event.id}
							className="rounded-xl border border-white/10 bg-[#1E293B] p-4 text-white"
						>
							<div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
								<div>
									<div className="flex flex-wrap items-center gap-2">
										<h4 className="font-semibold">{event.name}</h4>
										<span
											className={`rounded px-2 py-0.5 text-[10px] ${event.statusClass}`}
										>
											{event.status}
										</span>
									</div>

									<p className="mt-1 text-xs text-gray-400">{event.owner}</p>

									<p className="mt-2 text-xs text-gray-300">
										{event.date} · {event.location} · {event.guests} guests ·{" "}
										{event.budget}
									</p>
								</div>

								<p className="text-xs text-blue-300">{event.created_at}</p>
							</div>
						</article>
					))}
				</section>

				<div className="flex flex-wrap items-center justify-center gap-2 pt-1">
					<button className="rounded border border-white/10 bg-[#091427] px-3 py-1.5 text-xs text-gray-300">
						Prev
					</button>
					<button className="rounded bg-blue-500 px-3 py-1.5 text-xs text-white">
						1
					</button>
					<button className="rounded border border-white/10 bg-[#091427] px-3 py-1.5 text-xs text-gray-300">
						2
					</button>
					<button className="rounded border border-white/10 bg-[#091427] px-3 py-1.5 text-xs text-gray-300">
						3
					</button>
					<button className="rounded border border-white/10 bg-[#091427] px-3 py-1.5 text-xs text-gray-300">
						Next
					</button>
				</div>
			</main>
		</AdminLayout>
	);
}