import { useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

const sampleUsers = [
	{
		id: 1,
		name: "ELMehdi Cherkaoui",
		email: "john@example.com",
		type: "Organizer",
		location: "Marrakech",
		joined: "Jan 15, 2024",
		status: "Active",
		avatar: "J",
		color: "bg-blue-500",
	},
	{
		id: 2,
		name: "Sarah Catering",
		email: "sarah@catering.com",
		type: "Provider",
		location: "Marrakech",
		joined: "Dec 3, 2023",
		status: "Active",
		avatar: "S",
		color: "bg-purple-500",
	},
	{
		id: 3,
		name: "Alice Smith",
		email: "alice@example.com",
		type: "Organizer",
		location: "Casablanca",
		joined: "Feb 20, 2024",
		status: "Active",
		avatar: "A",
		color: "bg-green-500",
	},
	{
		id: 4,
		name: "SpamBot123",
		email: "spam@fake.com",
		type: "Provider",
		location: "Safi",
		joined: "Jan 5, 2024",
		status: "Banned",
		avatar: "S",
		color: "bg-red-500",
	},
	{
		id: 5,
		name: "John Photo",
		email: "john@photography.com",
		type: "Provider",
		location: "Rabat",
		joined: "Nov 12, 2023",
		status: "Active",
		avatar: "J",
		color: "bg-orange-500",
	},
	{
		id: 6,
		name: "Hamza TL",
		email: "hamzaPro123@gmail.com",
		type: "Admin",
		location: "Safi",
		joined: "Nov 13, 2023",
		status: "Active",
		avatar: "H",
		color: "bg-blue-500",
	},
];

export default function Users() {
	const [userType, setUserType] = useState("All");
	const [status, setStatus] = useState("All");
	const [location, setLocation] = useState("All");
	const [search, setSearch] = useState("");

	const filteredUsers = sampleUsers.filter((user) => {
		if (userType !== "All" && user.type !== userType) {
			return false;
		}

		if (status !== "All" && user.status !== status) {
			return false;
		}

		if (location !== "All" && user.location !== location) {
			return false;
		}

		const text = search.toLowerCase().trim();
		if (
			text &&
			!user.name.toLowerCase().includes(text) &&
			!user.email.toLowerCase().includes(text)
		) {
			return false;
		}

		return true;
	});

	return (
		<AdminLayout
			title="User Management"
			subtitle="Manage organizers and providers"
		>
			<main className="space-y-4 p-4 md:p-6">
				<section className="space-y-4 rounded-xl border border-white/10 bg-[#0d1b34] p-3 md:p-4">
					<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
						<div>
							<label className="mb-1 block text-[10px] uppercase tracking-wide text-gray-400">
								User Type
							</label>
							<select
								value={userType}
								onChange={(e) => setUserType(e.target.value)}
								className="w-full rounded-md border border-white/10 bg-[#091427] px-3 py-2 text-sm text-white outline-none"
							>
								<option>All</option>
								<option>Organizer</option>
								<option>Provider</option>
							</select>
						</div>

						<div>
							<label className="mb-1 block text-[10px] uppercase tracking-wide text-gray-400">
								Status
							</label>
							<select
								value={status}
								onChange={(e) => setStatus(e.target.value)}
								className="w-full rounded-md border border-white/10 bg-[#091427] px-3 py-2 text-sm text-white outline-none"
							>
								<option>All</option>
								<option>Active</option>
								<option>Banned</option>
							</select>
						</div>

						<div>
							<label className="mb-1 block text-[10px] uppercase tracking-wide text-gray-400">
								Location
							</label>
							<select
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								className="w-full rounded-md border border-white/10 bg-[#091427] px-3 py-2 text-sm text-white outline-none"
							>
								<option>All</option>
								<option>Marrakech</option>
								<option>Casablanca</option>
								<option>Rabat</option>
								<option>Safi</option>
							</select>
						</div>

						<div>
							<label className="mb-1 block text-[10px] uppercase tracking-wide text-gray-400">
								Search
							</label>
							<input
								type="text"
								placeholder="Name or email..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full rounded-md border border-white/10 bg-[#091427] px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none"
							/>
						</div>
					</div>
				</section>

				<section className="hidden overflow-hidden rounded-xl border border-white/10 bg-[#0d1b34] xl:block">
					<div className="grid grid-cols-12 border-b border-white/10 bg-[#0b172d] px-4 py-3 text-[11px] uppercase tracking-wide text-gray-400">
						<div className="col-span-4">User</div>
						<div className="col-span-1">Type</div>
						<div className="col-span-2">Location</div>
						<div className="col-span-2">Joined</div>
						<div className="col-span-1">Status</div>
						<div className="col-span-2 text-center">Actions</div>
					</div>

					{filteredUsers.map((user) => (
						<div
							key={user.id}
							className="grid grid-cols-12 items-center border-b border-white/10 bg-[#1a2740] px-4 py-4 text-sm text-white"
						>
							<div className="col-span-4 flex items-center gap-3">
								<div
									className={`flex h-8 w-8 items-center justify-center rounded-full ${user.color} text-xs font-bold`}
								>
									{user.avatar}
								</div>
								<div>
									<p className="font-medium">{user.name}</p>
									<p className="text-xs text-gray-400">{user.email}</p>
								</div>
							</div>

							<div className="col-span-1">
								<span
									className={`rounded px-2 py-1 text-[10px] ${user.type === "Organizer"
											? "bg-blue-500/20 text-blue-300"
											: "bg-purple-500/20 text-purple-300"
										}`}
								>
									{user.type}
								</span>
							</div>

							<div className="col-span-2 text-sm text-gray-300">
								{user.location}
							</div>

							<div className="col-span-2 text-sm text-gray-300">
								{user.joined}
							</div>

							<div className="col-span-1">
								<span
									className={`rounded px-2 py-1 text-[10px] ${user.status === "Active"
											? "bg-green-500/20 text-green-300"
											: "bg-red-500/20 text-red-300"
										}`}
								>
									{user.status}
								</span>
							</div>

							<div className="col-span-2 flex justify-center gap-2">
								<button className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-300 hover:bg-green-500/30">
									{user.status === "Banned" ? "Unban" : "Ban"}
								</button>
								<button className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-300 hover:bg-red-500/30">
									Delete
								</button>
							</div>
						</div>
					))}
				</section>

				<section className="space-y-3 xl:hidden">
					{filteredUsers.map((user) => (
						<div
							key={user.id}
							className="rounded-xl border border-white/10 bg-[#1a2740] p-4"
						>
							{/* Card Header with Avatar and Status */}
							<div className="mb-3 flex items-start justify-between gap-3">
								<div className="flex items-center gap-3">
									<div
										className={`flex h-9 w-9 items-center justify-center rounded-full ${user.color} text-xs font-bold text-white`}
									>
										{user.avatar}
									</div>
									<div>
										<p className="font-medium text-white">{user.name}</p>
										<p className="text-xs text-gray-400">{user.email}</p>
									</div>
								</div>
								<span
									className={`rounded px-2 py-1 text-[10px] ${user.status === "Active"
											? "bg-green-500/20 text-green-300"
											: "bg-red-500/20 text-red-300"
										}`}
								>
									{user.status}
								</span>
							</div>

							<div className="grid grid-cols-2 gap-3 text-xs">
								<div>
									<p className="text-gray-400">Type</p>
									<p className="text-white">{user.type}</p>
								</div>
								<div>
									<p className="text-gray-400">Joined</p>
									<p className="text-white">{user.joined}</p>
								</div>
								<div>
									<p className="text-gray-400">Location</p>
									<p className="text-white">{user.location}</p>
								</div>
								<div>
									<p className="text-gray-400">Email</p>
									<p className="text-white text-[9px]">{user.email}</p>
								</div>
							</div>

							<div className="mt-4 flex gap-2">
								<button className="flex-1 rounded bg-green-500/20 px-3 py-2 text-xs text-green-300 hover:bg-green-500/30">
									{user.status === "Banned" ? "Unban" : "Ban"}
								</button>
								<button className="flex-1 rounded bg-red-500/20 px-3 py-2 text-xs text-red-300 hover:bg-red-500/30">
									Delete
								</button>
							</div>
						</div>
					))}
				</section>

				<div className="flex items-center justify-center gap-2 pt-2">
					<button className="rounded border border-white/10 bg-[#091427] px-3 py-1.5 text-xs text-gray-300 hover:bg-white/5">
						Prev
					</button>
					<button className="rounded bg-blue-500 px-3 py-1.5 text-xs text-white">
						1
					</button>
					<button className="rounded border border-white/10 bg-[#091427] px-3 py-1.5 text-xs text-gray-300 hover:bg-white/5">
						2
					</button>
					<button className="rounded border border-white/10 bg-[#091427] px-3 py-1.5 text-xs text-gray-300 hover:bg-white/5">
						3
					</button>
					<button className="rounded border border-white/10 bg-[#091427] px-3 py-1.5 text-xs text-gray-300 hover:bg-white/5">
						Next
					</button>
				</div>
			</main>
		</AdminLayout>
	);
}
