import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

import ProviderLayout from "../../layouts/ProviderLayout";

type UserRole = {
	id?: number | null;
	name?: string | null;
} | null;

type UserProfile = {
	name?: string | null;
	email?: string | null;
	business_name?: string | null;
	phone?: string | null;
	date_of_birth?: string | null;
	bio?: string | null;
	street_address?: string | null;
	city?: string | null;
	country?: string | null;
	zip_code?: string | null;
	role?: UserRole;
};

type ProfileForm = {
	name: string;
	email: string;
	business_name: string;
	phone: string;
	date_of_birth: string;
	bio: string;
	street_address: string;
	city: string;
	country: string;
	zip_code: string;
};

type PasswordForm = {
	password: string;
	password_confirmation: string;
};

const emptyProfileForm: ProfileForm = {
	name: "",
	email: "",
	business_name: "",
	phone: "",
	date_of_birth: "",
	bio: "",
	street_address: "",
	city: "",
	country: "",
	zip_code: "",
};

const emptyPasswordForm: PasswordForm = {
	password: "",
	password_confirmation: "",
};

function formatDateForInput(value?: string | null) {
	if (!value) {
		return "";
	}

	return value.slice(0, 10);
}

export default function ProviderProfile() {
	const [user, setUser] = useState<UserProfile | null>(null);
	const [profileForm, setProfileForm] = useState<ProfileForm>(emptyProfileForm);
	const [passwordForm, setPasswordForm] =
		useState<PasswordForm>(emptyPasswordForm);
	const [loading, setLoading] = useState(true);
	const [savingProfile, setSavingProfile] = useState(false);
	const [savingPassword, setSavingPassword] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const loadProfile = async () => {
		const token = localStorage.getItem("token");

		if (!token) {
			setError("Please sign in again.");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.get("http://127.0.0.1:8000/api/user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const apiUser = (response.data?.user ?? null) as UserProfile | null;
			setUser(apiUser);
			setProfileForm({
				name: apiUser?.name || "",
				email: apiUser?.email || "",
				business_name: apiUser?.business_name || "",
				phone: apiUser?.phone || "",
				date_of_birth: formatDateForInput(apiUser?.date_of_birth),
				bio: apiUser?.bio || "",
				street_address: apiUser?.street_address || "",
				city: apiUser?.city || "",
				country: apiUser?.country || "",
				zip_code: apiUser?.zip_code || "",
			});
		} catch {
			setError("Failed to load profile.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProfile();
	}, []);

	const handleProfileChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = event.target;
		setProfileForm((current) => ({ ...current, [name]: value }));
	};

	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setPasswordForm((current) => ({ ...current, [name]: value }));
	};

	const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const token = localStorage.getItem("token");

		setSavingProfile(true);
		setError("");
		setSuccess("");

		try {
			const response = await axios.patch(
				"http://127.0.0.1:8000/api/profile",
				{
					name: profileForm.name,
					email: profileForm.email,
					business_name: profileForm.business_name || null,
					phone: profileForm.phone || null,
					date_of_birth: profileForm.date_of_birth || null,
					bio: profileForm.bio || null,
					street_address: profileForm.street_address || null,
					city: profileForm.city || null,
					country: profileForm.country || null,
					zip_code: profileForm.zip_code || null,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const updatedUser = response.data?.user as UserProfile | undefined;

			if (updatedUser) {
				setUser(updatedUser);
				localStorage.setItem("user", JSON.stringify(updatedUser));
			}

			setSuccess("Profile updated successfully.");
		} catch {
			setError("Failed to save profile.");
		} finally {
			setSavingProfile(false);
		}
	};

	const savePassword = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const token = localStorage.getItem("token");

		if (!passwordForm.password || !passwordForm.password_confirmation) {
			setError("Please fill the new password fields.");
			return;
		}

		if (passwordForm.password !== passwordForm.password_confirmation) {
			setError("Password confirmation does not match.");
			return;
		}

		setSavingPassword(true);
		setError("");
		setSuccess("");

		try {
			const response = await axios.patch(
				"http://127.0.0.1:8000/api/profile",
				{
					password: passwordForm.password,
					password_confirmation: passwordForm.password_confirmation,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			const updatedUser = response.data?.user as UserProfile | undefined;

			if (updatedUser) {
				setUser(updatedUser);
				localStorage.setItem("user", JSON.stringify(updatedUser));
			}

			setPasswordForm(emptyPasswordForm);
			setSuccess("Password updated successfully.");
		} catch {
			setError("Failed to update password.");
		} finally {
			setSavingPassword(false);
		}
	};

	return (
		<ProviderLayout
			title="My Profile"
			subtitle={
				user?.business_name || "Manage your account information and settings"
			}
		>
			<div className="space-y-4">
				{loading ? (
					<p className="text-sm text-slate-500">Loading profile...</p>
				) : null}
				{error ? <p className="text-sm text-red-500">{error}</p> : null}
				{success ? <p className="text-sm text-emerald-600">{success}</p> : null}

				<form onSubmit={saveProfile} className="space-y-4">
					<section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
						<h3 className="text-2xl font-bold text-slate-900">
							Personal Information
						</h3>

						<div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
							<div className="md:col-span-2">
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Full Name
								</label>
								<input
									name="name"
									type="text"
									value={profileForm.name}
									onChange={handleProfileChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>

							<div className="md:col-span-2">
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Email Address
								</label>
								<input
									name="email"
									type="email"
									value={profileForm.email}
									onChange={handleProfileChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Phone Number
								</label>
								<input
									name="phone"
									type="text"
									value={profileForm.phone}
									onChange={handleProfileChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Date of Birth
								</label>
								<input
									name="date_of_birth"
									type="date"
									value={profileForm.date_of_birth}
									onChange={handleProfileChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>

							<div className="md:col-span-2">
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Bio
								</label>
								<textarea
									name="bio"
									rows={3}
									value={profileForm.bio}
									onChange={handleProfileChange}
									className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>
						</div>
					</section>

					<section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
						<h3 className="text-2xl font-bold text-slate-900">
							Address Information
						</h3>

						<div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
							<div className="md:col-span-3">
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Street Address
								</label>
								<input
									name="street_address"
									type="text"
									value={profileForm.street_address}
									onChange={handleProfileChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									City
								</label>
								<input
									name="city"
									type="text"
									value={profileForm.city}
									onChange={handleProfileChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Country
								</label>
								<input
									name="country"
									type="text"
									value={profileForm.country}
									onChange={handleProfileChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Zip Code
								</label>
								<input
									name="zip_code"
									type="text"
									value={profileForm.zip_code}
									onChange={handleProfileChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>

							<div className="md:col-span-3">
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Business Name
								</label>
								<input
									name="business_name"
									type="text"
									value={profileForm.business_name}
									onChange={handleProfileChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>
						</div>

						<div className="mt-4 flex gap-2">
							<button
								type="submit"
								disabled={savingProfile}
								className="rounded-xl bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7C3AED] disabled:opacity-70"
							>
								{savingProfile ? "Saving..." : "Save Changes"}
							</button>
							<button
								type="button"
								onClick={loadProfile}
								className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
							>
								Reload
							</button>
						</div>
					</section>
				</form>

				<form onSubmit={savePassword} className="space-y-4">
					<section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
						<h3 className="text-2xl font-bold text-slate-900">
							Change Password
						</h3>

						<div className="mt-4 space-y-3">
							<div>
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									New Password
								</label>
								<input
									name="password"
									type="password"
									value={passwordForm.password}
									onChange={handlePasswordChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>

							<div>
								<label className="mb-1 block text-xs font-semibold text-slate-600">
									Confirm Password
								</label>
								<input
									name="password_confirmation"
									type="password"
									value={passwordForm.password_confirmation}
									onChange={handlePasswordChange}
									className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-violet-500"
								/>
							</div>
						</div>

						<div className="mt-4">
							<button
								type="submit"
								disabled={savingPassword}
								className="rounded-xl bg-[#8B5CF6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7C3AED] disabled:opacity-70"
							>
								{savingPassword ? "Updating..." : "Update Password"}
							</button>
						</div>
					</section>
				</form>

				<section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
					<h4 className="text-2xl font-bold text-red-600">Delete Account</h4>
					<p className="mt-1 text-sm text-slate-500">
						Permanently delete your account and all associated data. This action
						cannot be undone.
					</p>
					<button
						type="button"
						className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
					>
						Delete Account
					</button>
				</section>
			</div>
		</ProviderLayout>
	);
}
