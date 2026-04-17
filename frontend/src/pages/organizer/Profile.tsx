import { useEffect, useState, type ChangeEvent } from 'react';
import axios from 'axios';
import OrganizerLayout from '../../layouts/OrganizerLayout';

type UserProfile = {
	name?: string | null;
	email?: string | null;
	phone?: string | null;
	date_of_birth?: string | null;
	bio?: string | null;
	street_address?: string | null;
	city?: string | null;
	country?: string | null;
	zip_code?: string | null;
};

type PersonalForm = {
	name: string;
	email: string;
	phone: string;
	date_of_birth: string;
	bio: string;
};

type AddressForm = {
	street_address: string;
	city: string;
	country: string;
	zip_code: string;
};

type PasswordForm = {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};

export default function Profile() {
	const [personalForm, setPersonalForm] = useState<PersonalForm>({
		name: '',
		email: '',
		phone: '',
		date_of_birth: '',
		bio: '',
	});
	const [addressForm, setAddressForm] = useState<AddressForm>({
		street_address: '',
		city: '',
		country: '',
		zip_code: '',
	});
	const [passwordForm, setPasswordForm] = useState<PasswordForm>({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});

	const [initialPersonal, setInitialPersonal] = useState<PersonalForm | null>(null);
	const [initialAddress, setInitialAddress] = useState<AddressForm | null>(null);

	const [loading, setLoading] = useState(true);
	const [savingPersonal, setSavingPersonal] = useState(false);
	const [savingAddress, setSavingAddress] = useState(false);
	const [savingPassword, setSavingPassword] = useState(false);

	const [error, setError] = useState('');
	const [personalSuccess, setPersonalSuccess] = useState('');
	const [addressSuccess, setAddressSuccess] = useState('');
	const [passwordSuccess, setPasswordSuccess] = useState('');

	useEffect(() => {
		const loadProfile = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setError('Please login again.');
				setLoading(false);
				return;
			}

			try {
				const response = await axios.get('http://127.0.0.1:8000/api/user', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const user = (response.data?.user ?? {}) as UserProfile;
				const nextPersonal: PersonalForm = {
					name: user.name || '',
					email: user.email || '',
					phone: user.phone || '',
					date_of_birth: user.date_of_birth || '',
					bio: user.bio || '',
				};

				const nextAddress: AddressForm = {
					street_address: user.street_address || '',
					city: user.city || '',
					country: user.country || '',
					zip_code: user.zip_code || '',
				};

				setPersonalForm(nextPersonal);
				setAddressForm(nextAddress);
				setInitialPersonal(nextPersonal);
				setInitialAddress(nextAddress);
			} catch (err: any) {
				setError('Failed to load profile.');
			} finally {
				setLoading(false);
			}
		};

		loadProfile();
	}, []);

	const onPersonalChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setPersonalForm((current) => ({ ...current, [name]: value }));
	};

	const onAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setAddressForm((current) => ({ ...current, [name]: value }));
	};

	const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setPasswordForm((current) => ({ ...current, [name]: value }));
	};

	const savePersonal = async () => {
		const token = localStorage.getItem('token');

		setSavingPersonal(true);
		setError('');
		setPersonalSuccess('');

		try {
			const response = await axios.patch(
				'http://127.0.0.1:8000/api/profile',
				{
					name: personalForm.name,
					email: personalForm.email,
					phone: personalForm.phone || null,
					date_of_birth: personalForm.date_of_birth || null,
					bio: personalForm.bio || null,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
			
					},
				},
			);

			const user = (response.data?.user ?? {}) as UserProfile;
			const updated: PersonalForm = {
				name: user.name || '',
				email: user.email || '',
				phone: user.phone || '',
				date_of_birth: user.date_of_birth || '',
				bio: user.bio || '',
			};

			setPersonalForm(updated);
			setInitialPersonal(updated);
			setPersonalSuccess('Profile updated successfully.');
		} catch (err: any) {
			setError( 'Failed to update profile.');
		} finally {
			setSavingPersonal(false);
		}
	};

	const saveAddress = async () => {
		const token = localStorage.getItem('token');


		setSavingAddress(true);
		setError('');
		setAddressSuccess('');

		try {
			const response = await axios.patch(
				'http://127.0.0.1:8000/api/profile',
				{
					street_address: addressForm.street_address || null,
					city: addressForm.city || null,
					country: addressForm.country || null,
					zip_code: addressForm.zip_code || null,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
				
					},
				},
			);

			const user = (response.data?.user ?? {}) as UserProfile;
			const updated: AddressForm = {
				street_address: user.street_address || '',
				city: user.city || '',
				country: user.country || '',
				zip_code: user.zip_code || '',
			};

			setAddressForm(updated);
			setInitialAddress(updated);
			setAddressSuccess('Address updated successfully.');
		} catch (err: any) {
			setError('Failed to update address.');
		} finally {
			setSavingAddress(false);
		}
	};

	const updatePassword = async () => {
		const token = localStorage.getItem('token');

		if (!token) {
			setError('Please login again.');
			return;
		}

		if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
			setError('Please fill new password and confirm password.');
			return;
		}

		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			setError('Password confirmation does not match.');
			return;
		}

		setSavingPassword(true);
		setError('');
		setPasswordSuccess('');

		try {
			await axios.patch(
				'http://127.0.0.1:8000/api/profile',
				{
					password: passwordForm.newPassword,
					password_confirmation: passwordForm.confirmPassword,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					
					},
				},
			);

			setPasswordForm({
				currentPassword: '',
				newPassword: '',
				confirmPassword: '',
			});
			setPasswordSuccess('Password updated successfully.');
		} catch (err: any) {
			setError('Failed to update password.');
		} finally {
			setSavingPassword(false);
		}
	};

	const resetPersonal = () => {
		if (initialPersonal) {
			setPersonalForm(initialPersonal);
		}
	};

	const resetAddress = () => {
		if (initialAddress) {
			setAddressForm(initialAddress);
		}
	};

	return (
		<OrganizerLayout title='My Profile' subtitle='Manage your account information'>
			<div className='space-y-4'>
				{loading ? <p className='text-sm text-slate-500'>Loading profile...</p> : null}
				{error ? <p className='text-sm text-red-500'>{error}</p> : null}

				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<h3 className='text-lg font-semibold text-slate-900'>Personal Information</h3>

					<div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'>
						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Full Name</label>
							<input
								type='text'
								name='name'
								value={personalForm.name}
								onChange={onPersonalChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Email Address</label>
							<input
								type='email'
								name='email'
								value={personalForm.email}
								onChange={onPersonalChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Phone Number</label>
							<input
								type='text'
								name='phone'
								value={personalForm.phone}
								onChange={onPersonalChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Date of Birth</label>
							<input
								type='date'
								name='date_of_birth'
								value={personalForm.date_of_birth}
								onChange={onPersonalChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Bio</label>
							<textarea
								rows={3}
								name='bio'
								value={personalForm.bio}
								onChange={onPersonalChange}
								className='w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none'
							/>
						</div>
					</div>

					<div className='mt-4 flex gap-2'>
						<button
							type='button'
							onClick={savePersonal}
							disabled={savingPersonal}
							className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70'
						>
							{savingPersonal ? 'Saving...' : 'Save Changes'}
						</button>
						<button
							type='button'
							onClick={resetPersonal}
							className='rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
						>
							Cancel
						</button>
					</div>
					{personalSuccess ? <p className='mt-2 text-sm text-green-600'>{personalSuccess}</p> : null}
				</section>

				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<h3 className='text-lg font-semibold text-slate-900'>Address Information</h3>

					<div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-6'>
						<div className='sm:col-span-6'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Street Address</label>
							<input
								type='text'
								name='street_address'
								value={addressForm.street_address}
								onChange={onAddressChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>City</label>
							<input
								type='text'
								name='city'
								value={addressForm.city}
								onChange={onAddressChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Country</label>
							<input
								type='text'
								name='country'
								value={addressForm.country}
								onChange={onAddressChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Zip Code</label>
							<input
								type='text'
								name='zip_code'
								value={addressForm.zip_code}
								onChange={onAddressChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>
					</div>

					<div className='mt-4 flex gap-2'>
						<button
							type='button'
							onClick={saveAddress}
							disabled={savingAddress}
							className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70'
						>
							{savingAddress ? 'Saving...' : 'Save Address'}
						</button>
						<button
							type='button'
							onClick={resetAddress}
							className='rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
						>
							Cancel
						</button>
					</div>
					{addressSuccess ? <p className='mt-2 text-sm text-green-600'>{addressSuccess}</p> : null}
				</section>

				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<h3 className='text-lg font-semibold text-slate-900'>Change Password</h3>

					<div className='mt-4 space-y-3'>
						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Current Password</label>
							<input
								type='password'
								name='currentPassword'
								placeholder='Enter current password'
								value={passwordForm.currentPassword}
								onChange={onPasswordChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>New Password</label>
							<input
								type='password'
								name='newPassword'
								placeholder='Enter new password'
								value={passwordForm.newPassword}
								onChange={onPasswordChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Confirm Password</label>
							<input
								type='password'
								name='confirmPassword'
								placeholder='Confirm new password'
								value={passwordForm.confirmPassword}
								onChange={onPasswordChange}
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>
					</div>

					<div className='mt-4'>
						<button
							type='button'
							onClick={updatePassword}
							disabled={savingPassword}
							className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70'
						>
							{savingPassword ? 'Updating...' : 'Update Password'}
						</button>
					</div>
					{passwordSuccess ? <p className='mt-2 text-sm text-green-600'>{passwordSuccess}</p> : null}

					<div className='mt-5 border-t border-slate-200 pt-4'>
						<h4 className='text-lg font-semibold text-red-600'>Delete Account</h4>
						<p className='mt-1 text-xs text-slate-500'>
							Permanently delete your account and all associated data. This action cannot be undone.
						</p>
						<button
							type='button'
							className='mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700'
						>
							Delete Account
						</button>
					</div>
				</section>
			</div>
		</OrganizerLayout>
	);
}
