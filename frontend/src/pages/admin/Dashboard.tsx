import AdminLayout from "../../layouts/AdminLayout";

export default function DashboardAdmin() {
	return (
		<AdminLayout title="Admin Dashboard" subtitle="System Overview & Statistics">
			<main className="space-y-6 p-4 md:p-6">
				<section>
					<h3 className="mb-4 text-sm font-semibold text-white">Platform Overview</h3>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
						<div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
							<div className="mb-3 flex items-center justify-between">
								<p className="text-xs text-gray-400">Total Users</p>
								<span className="rounded-md bg-cyan-500 p-2 text-white">👤</span>
							</div>
							<h4 className="text-2xl font-bold text-white">1,247</h4>
						</div>

						<div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
							<div className="mb-3 flex items-center justify-between">
								<p className="text-xs text-gray-400">Total Events</p>
								<span className="rounded-md bg-purple-500 p-2 text-white">📅</span>
							</div>
							<h4 className="text-2xl font-bold text-white">3,456</h4>
						</div>

						<div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
							<div className="mb-3 flex items-center justify-between">
								<p className="text-xs text-gray-400">Total Providers</p>
								<span className="rounded-md bg-orange-500 p-2 text-white">📋</span>
							</div>
							<h4 className="text-2xl font-bold text-white">428</h4>
						</div>

						<div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
							<div className="mb-3 flex items-center justify-between">
								<p className="text-xs text-gray-400">Revenue</p>
								<span className="rounded-md bg-green-500 p-2 text-white">💲</span>
							</div>
							<h4 className="text-2xl font-bold text-white">$45.2K</h4>
						</div>
					</div>
				</section>

				<section>
					<h3 className="mb-4 text-sm font-semibold text-white">User Statistics</h3>

					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
						<div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
							<div className="flex items-start justify-between">
								<div>
									<p className="mb-4 text-xs text-gray-400">Organizers</p>
									<h4 className="text-2xl font-bold text-white">819</h4>
								</div>
								<span className="text-cyan-400">👤</span>
							</div>

							<div className="mt-6 space-y-2 text-sm">
								<div className="flex justify-between text-gray-300">
									<span>Active</span>
									<span className="text-green-400">742</span>
								</div>
								<div className="flex justify-between text-gray-300">
									<span>Banned</span>
									<span className="text-red-400">12</span>
								</div>
							</div>
						</div>

						<div className="rounded-lg border border-white/5 bg-[#1E293B] p-5">
							<div className="flex items-start justify-between">
								<div>
									<p className="mb-4 text-xs text-gray-400">Providers</p>
									<h4 className="text-2xl font-bold text-white">428</h4>
								</div>
								<span className="text-purple-400">👜</span>
							</div>

							<div className="mt-6 space-y-2 text-sm">
								<div className="flex justify-between text-gray-300">
									<span>Active</span>
									<span className="text-green-400">401</span>
								</div>
								<div className="flex justify-between text-gray-300">
									<span>Banned</span>
									<span className="text-red-400">5</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section>
					<h3 className="mb-4 text-sm font-semibold text-white">Event Statistics</h3>

					<div className="rounded-lg border border-white/5 bg-[#1E293B] p-4">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
							<div className="rounded-md border border-white/5 bg-[#0F172A] p-4">
								<p className="text-xs text-gray-400">Active Events</p>
								<h4 className="mt-2 text-xl font-bold text-white">234</h4>
							</div>

							<div className="rounded-md border border-white/5 bg-[#0F172A] p-4">
								<p className="text-xs text-gray-400">Completed</p>
								<h4 className="mt-2 text-xl font-bold text-green-400">2,890</h4>
							</div>

							<div className="rounded-md border border-white/5 bg-[#0F172A] p-4">
								<p className="text-xs text-gray-400">Pending Approval</p>
								<h4 className="mt-2 text-xl font-bold text-orange-400">18</h4>
							</div>

							<div className="rounded-md border border-white/5 bg-[#0F172A] p-4">
								<p className="text-xs text-gray-400">Cancelled</p>
								<h4 className="mt-2 text-xl font-bold text-red-400">314</h4>
							</div>
						</div>
					</div>
				</section>

				<section>
					<h3 className="mb-4 text-sm font-semibold text-white">Quick Actions</h3>

					<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
						<div className="rounded-lg bg-blue-600 p-5 text-white">
							<div className="mb-4 text-xl">👥</div>
							<h4 className="font-semibold">Manage Users</h4>
							<p className="mt-1 text-sm text-blue-100">Add, edit, or remove users</p>
						</div>

						<div className="rounded-lg bg-orange-600 p-5 text-white">
							<div className="mb-4 text-xl">⚖️</div>
							<h4 className="font-semibold">Moderation Queue</h4>
							<p className="mt-1 text-sm text-orange-100">Review pending items (18)</p>
						</div>

						<div className="rounded-lg bg-green-600 p-5 text-white lg:col-span-1">
							<div className="mb-4 text-xl">📄</div>
							<h4 className="font-semibold">View Reports</h4>
							<p className="mt-1 text-sm text-green-100">Detailed analytics & reports</p>
						</div>
					</div>
				</section>
			</main>
		</AdminLayout>
	);
}