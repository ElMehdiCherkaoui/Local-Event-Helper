import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from "../../layouts/AdminLayout";

type AdminUser = {
	id: number;
	name: string;
	email: string;
	is_banned: boolean;
	role?: {
		name?: string;
	};
	city?: string | null;
	created_at?: string;
};

const colorForRole = (roleName?: string) => {
	if (roleName === 'provider') {
		return 'bg-purple-500';
	}

	if (roleName === 'admin') {
		return 'bg-blue-500';
	}

	return 'bg-green-500';
};


export default function Users() {
	const [users, setUsers] = useState<AdminUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [userId, setuserId] = useState<number | null>(null);
	const [error, setError] = useState('');
	const [userType, setUserType] = useState("All");
	const [status, setStatus] = useState("All");
	const [location, setLocation] = useState("All");
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setError('No token found. Please login again.');
				setLoading(false);
				return;
			}

			try {
				const response = await axios.get('http://127.0.0.1:8000/api/admin/users', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				setUsers(response.data?.users || []);
			} catch (err: any) {
				setError(err?.response?.data?.message || 'Failed to load users.');
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const handleBanToggle = async (user: AdminUser) => {
		const token = localStorage.getItem('token');

		if (!token) {
			setError('No token found. Please login again.');
			return;
		}

		setuserId(user.id);
		setError('');

		try {
			const url = user.is_banned
				? `http://127.0.0.1:8000/api/admin/users/${user.id}/unban`
				: `http://127.0.0.1:8000/api/admin/users/${user.id}/ban`;

			await axios.patch(url, {}, {
				headers: { Authorization: `Bearer ${token}` },
			});

			const updatedUsers = users.map((currentUser) => {
				if (currentUser.id === user.id) {
					return { ...currentUser, is_banned: !currentUser.is_banned };
				}

				return currentUser;
			});

			setUsers(updatedUsers);
		} catch (err: any) {
			setError('Action failed.');
		} finally {
			setuserId(null);
		}
	};

	const filteredUsers = users.filter((user) => {
		const typeValue = user.role?.name;
		const statusValue = user.is_banned ? 'Banned' : 'Active';
		const locationValue = user.city;

		if (userType !== "All" && typeValue !== userType) {
			return false;
		}

		if (status !== "All" && statusValue !== status) {
			return false;
		}

		if (location !== "All" && locationValue !== location) {
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
				{loading ? <p className="text-sm text-gray-300">Loading users...</p> : null}
				{error ? <p className="text-sm text-red-400">{error}</p> : null}

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
									className={`flex h-8 w-8 items-center justify-center rounded-full ${colorForRole(user.role?.name)} text-xs font-bold`}
								>
									{user.name.charAt(0).toUpperCase()}
								</div>
								<div>
									<p className="font-medium">{user.name}</p>
									<p className="text-xs text-gray-400">{user.email}</p>
								</div>
							</div>

							<div className="col-span-1">
								<span
									className={`rounded px-2 py-1 text-[10px] ${user.role?.name === "organizer"
											? "bg-blue-500/20 text-blue-300"
											: user.role?.name === "provider"
											? "bg-purple-500/20 text-purple-300"
											: "bg-gray-500/20 text-gray-300"
										}`}
								>
									{user.role?.name}
								</span>
							</div>

							<div className="col-span-2 text-sm text-gray-300">
								{user.city || '-'}
							</div>

							<div className="col-span-2 text-sm text-gray-300">
								{new Date(user.created_at??'').toLocaleDateString()}
							</div>

							<div className="col-span-1">
								<span
									className={`rounded px-2 py-1 text-[10px] ${!user	.is_banned
											? "bg-green-500/20 text-green-300"
											: "bg-red-500/20 text-red-300"
										}`}
								>
									{user.is_banned ? 'Banned' : 'Active'}
								</span>
							</div>

							<div className="col-span-2 flex justify-center gap-2">
								<button
									onClick={() => handleBanToggle(user)}
									disabled={userId === user.id}
									className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-300 hover:bg-green-500/30 disabled:opacity-50"
								>
									{userId === user.id ? '...' : user.is_banned ? 'Unban' : 'Ban'}
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
										className={`flex h-9 w-9 items-center justify-center rounded-full ${colorForRole(user.role?.name)} text-xs font-bold text-white`}
									>
										{user.name.charAt(0).toUpperCase()}
									</div>
									<div>
										<p className="font-medium text-white">{user.name}</p>
										<p className="text-xs text-gray-400">{user.email}</p>
									</div>
								</div>
								<span
									className={`rounded px-2 py-1 text-[10px] ${!user.is_banned
											? "bg-green-500/20 text-green-300"
											: "bg-red-500/20 text-red-300"
										}`}
								>
									{user.is_banned ? 'Banned' : 'Active'}
								</span>
							</div>

							<div className="grid grid-cols-2 gap-3 text-xs">
								<div>
									<p className="text-gray-400">Type</p>
									<p className="text-white">{user.role?.name}</p>
								</div>
								<div>
									<p className="text-gray-400">Joined</p>
									<p className="text-white">{new Date(user.created_at??'').toLocaleDateString()}</p>
								</div>
								<div>
									<p className="text-gray-400">Location</p>
									<p className="text-white">{user.city || '-'}</p>
								</div>
								<div>
									<p className="text-gray-400">Email</p>
									<p className="text-white text-[9px]">{user.email}</p>
								</div>
							</div>

							<div className="mt-4 flex gap-2">
								<button
									onClick={() => handleBanToggle(user)}
									disabled={userId === user.id}
									className="flex-1 rounded bg-green-500/20 px-3 py-2 text-xs text-green-300 hover:bg-green-500/30 disabled:opacity-50"
								>
									{userId === user.id ? '...' : user.is_banned ? 'Unban' : 'Ban'}
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
