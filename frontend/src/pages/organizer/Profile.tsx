import OrganizerLayout from '../../layouts/OrganizerLayout';

export default function Profile() {
	return (
		<OrganizerLayout title='My Profile' subtitle='Manage your account information'>
			<div className='space-y-4'>
				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<h3 className='text-lg font-semibold text-slate-900'>Personal Information</h3>

					<div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'>
						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>First Name</label>
							<input
								type='text'
								defaultValue='ElMehdi'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Last Name</label>
							<input
								type='text'
								defaultValue='Cherkaoui'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Email Address</label>
							<input
								type='email'
								defaultValue='cherkaouim45@gmail.com'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Phone Number</label>
							<input
								type='text'
								defaultValue='0602334627'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Date of Birth</label>
							<input
								type='date'
								defaultValue='2006-10-26'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Bio</label>
							<textarea
								rows={3}
								defaultValue='Professional event organizer with 5 years of experience. Specialized in weddings and corporate events.'
								className='w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none'
							/>
						</div>
					</div>

					<div className='mt-4 flex gap-2'>
						<button
							type='button'
							className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
						>
							Save Changes
						</button>
						<button
							type='button'
							className='rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
						>
							Cancel
						</button>
					</div>
				</section>

				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<h3 className='text-lg font-semibold text-slate-900'>Address Information</h3>

					<div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-6'>
						<div className='sm:col-span-6'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Street Address</label>
							<input
								type='text'
								defaultValue='123 Main Street'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>City</label>
							<input
								type='text'
								defaultValue='Safi'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Country</label>
							<input
								type='text'
								defaultValue='Morocco'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div className='sm:col-span-2'>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Zip Code</label>
							<input
								type='text'
								defaultValue='40000'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>
					</div>

					<div className='mt-4 flex gap-2'>
						<button
							type='button'
							className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
						>
							Save Address
						</button>
						<button
							type='button'
							className='rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
						>
							Cancel
						</button>
					</div>
				</section>

				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<h3 className='text-lg font-semibold text-slate-900'>Change Password</h3>

					<div className='mt-4 space-y-3'>
						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Current Password</label>
							<input
								type='password'
								placeholder='Enter current password'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>New Password</label>
							<input
								type='password'
								placeholder='Enter new password'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Confirm Password</label>
							<input
								type='password'
								placeholder='Confirm new password'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>
					</div>

					<div className='mt-4'>
						<button
							type='button'
							className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
						>
							Update Password
						</button>
					</div>

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
