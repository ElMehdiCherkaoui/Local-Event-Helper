import OrganizerLayout from '../../layouts/OrganizerLayout';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type EventStatus = 'In Progress' | 'Planning';

type OrganizerEvent = {
	id: number;
	name: string;
	date: string;
	city: string;
	guests: number;
	description: string;
	budget: string;
	spent: string;
	providersBooked: number;
	tasksDone: number;
	tasksTotal: number;
	progress: number;
	status: EventStatus;
};

const events: OrganizerEvent[] = [
	{
		id: 1,
		name: 'Summer Wedding',
		date: 'June 15, 2026',
		city: 'Marrakech',
		guests: 150,
		description: 'A beautiful outdoor wedding celebration with family and friends.',
		budget: '$5,000',
		spent: '$3,200',
		providersBooked: 3,
		tasksDone: 4,
		tasksTotal: 7,
		progress: 60,
		status: 'In Progress',
	},
	{
		id: 2,
		name: 'Birthday Party',
		date: 'March 20, 2026',
		city: 'Marrakech',
		guests: 50,
		description: '30th birthday celebration with close friends and family.',
		budget: '$1,500',
		spent: '$1,200',
		providersBooked: 2,
		tasksDone: 7,
		tasksTotal: 9,
		progress: 80,
		status: 'In Progress',
	},
	{
		id: 3,
		name: 'Corporate Event',
		date: 'April 10, 2026',
		city: 'Casablanca',
		guests: 200,
		description: 'Annual company conference and networking event.',
		budget: '$3,000',
		spent: '$800',
		providersBooked: 1,
		tasksDone: 3,
		tasksTotal: 10,
		progress: 40,
		status: 'Planning',
	},
];


function getStatusClasses(status: EventStatus): string {
	if (status === 'In Progress') {
		return 'bg-blue-100 text-blue-600';
	}

	return 'bg-amber-100 text-amber-700';
}

export default function Events() {
	const [popupType, setPopupType] = useState('');

	const [deleteReason, setDeleteReason] = useState('');

	const openNewPopup = () => {
		setPopupType('new');
	};

	const openEditPopup = () => {
		setPopupType('edit');
	};

	const openDeletePopup = () => {
		setPopupType('delete');
	};

	const closePopup = () => {
		setPopupType('');
	};



	let popupTitle = 'Delete Event';

	if (popupType === 'new') {
		popupTitle = 'Create New Event';
	} else if (popupType === 'edit') {
		popupTitle = 'Edit Event';
	}

	return (
		<OrganizerLayout title='My Events' subtitle='Manage all your events in one place'>
			<div className='space-y-5'>
				<div className='rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4'>
					<div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
						<select
							className='h-10 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500'
							defaultValue='all'
						>
							<option value='all'>All Events</option>
							<option value='progress'>In Progress</option>
							<option value='planning'>Planning</option>
						</select>

						<input
							type='text'
							placeholder='Search events...'
							className='h-10 flex-1 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500'
						/>

						<div className='grid grid-cols-2 gap-2 sm:flex sm:items-center'>
							<button
								type='button'
								className='h-10 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700'
							>
								Search
							</button>

							<button
								type='button'
								onClick={openNewPopup}
								className='h-10 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700'
							>
								+ New Event
							</button>
						</div>
					</div>
				</div>

				{events.map((event) => (
					<article
						key={event.id}
						className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'
					>
						<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
							<div>
								<h3 className='text-xl font-semibold text-slate-900'>{event.name}</h3>
								<p className='mt-1 text-xs text-slate-500 sm:text-sm'>
									{event.date} | {event.city} | {event.guests} guests
								</p>
							</div>

							<span
								className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(event.status)}`}
							>
								{event.status}
							</span>
						</div>

						<p className='mt-4 text-sm text-slate-500'>{event.description}</p>

						<div className='mt-5 grid grid-cols-2 gap-4 text-sm md:grid-cols-4'>
							<div>
								<p className='text-xs text-slate-500'>Budget</p>
								<p className='text-lg font-semibold text-slate-900'>{event.budget}</p>
							</div>

							<div>
								<p className='text-xs text-slate-500'>Spent</p>
								<p className='text-lg font-semibold text-slate-900'>{event.spent}</p>
							</div>

							<div>
								<p className='text-xs text-slate-500'>Providers</p>
								<p className='text-lg font-semibold text-slate-900'>
									{event.providersBooked} booked
								</p>
							</div>

							<div>
								<p className='text-xs text-slate-500'>Tasks</p>
								<p className='text-lg font-semibold text-slate-900'>
									{event.tasksDone}/{event.tasksTotal} done
								</p>
							</div>
						</div>

						<div className='mt-5'>
							<div className='mb-2 flex items-center justify-between text-xs sm:text-sm'>
								<span className='text-slate-500'>Progress</span>
								<span className='font-semibold text-slate-700'>{event.progress}%</span>
							</div>

							<div className='h-2 rounded-full bg-slate-100'>
								<div className='h-2 rounded-full bg-blue-600' style={{ width: `${event.progress}%` }} />
							</div>
						</div>

						<div className='mt-5 grid grid-cols-1 gap-2 sm:grid-cols-[2fr_2fr_1fr]'>
							<Link
								to={`/organizer/events/${event.id}`}
								className='rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700'
							>
								View Details
							</Link>

							<button
								type='button'
								onClick={openEditPopup}
								className='rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
							>
								Edit
							</button>

							<button
								type='button'
								onClick={openDeletePopup}
								className='rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-100'
							>
								Delete
							</button>
						</div>
					</article>
				))}

				{popupType && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
						<form  className='w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl'>
							<h3 className='text-lg font-semibold text-slate-900'>{popupTitle}</h3>

							{(popupType === 'new' || popupType === 'edit') && (
								<div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'>
									<div className='sm:col-span-2'>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Event Name</label>
										<input
											type='text'
											required
										
										
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Date</label>
										<input
											type='text'
										
									
											placeholder='June 15, 2026'
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>City</label>
										<input
											type='text'
										
							
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Guests</label>
										<input
											type='number'
											min='1'
										
							
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Budget</label>
										<input
											type='text'
										
								
											placeholder='$5,000'
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Status</label>
										<select
										
								
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										>
											<option value='In Progress'>In Progress</option>
											<option value='Planning'>Planning</option>
										</select>
									</div>
									<div className='sm:col-span-2'>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Description</label>
										<textarea
						
							
											className='w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
								</div>
							)}

							{popupType === 'delete' && (
								<div className='mt-4 space-y-3'>
									<p className='text-sm text-slate-600'>
										You are about to delete this event.
									</p>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Reason (optional)</label>
										<textarea
							
											value={deleteReason}
											onChange={(e) => setDeleteReason(e.target.value)}
											placeholder='Why are you deleting this event?'
											className='w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-red-300'
										/>
									</div>
								</div>
							)}

							<div className='mt-5 flex justify-end gap-2'>
								<button
									type='button'
									onClick={closePopup}
									className='rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100'
								>
									Cancel
								</button>
								<button
									type='submit'
									className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${popupType === 'delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
								>
									{popupType === 'delete' ? 'Confirm Delete' : 'Save'}
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</OrganizerLayout>
	);
}
