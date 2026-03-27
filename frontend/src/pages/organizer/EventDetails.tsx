import OrganizerLayout from '../../layouts/OrganizerLayout';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

type ExpenseItem = {
	id: number;
	name: string;
	provider: string;
	amount: string;
	status: 'Paid' | 'Pending';
};

type TaskItem = {
	id: number;
	title: string;
	dueDate: string;
	state: 'done' | 'todo' | 'urgent';
};

type ProviderItem = {
	id: number;
	name: string;
	service: string;
	rating: number;
	price: string;
	status: 'Confirmed' | 'Pending';
};

const expenses: ExpenseItem[] = [
	{ id: 1, name: 'John Photography', provider: 'Photos', amount: '$800', status: 'Paid' },
	{ id: 2, name: 'Sarah Catering', provider: 'Catering (50 guests)', amount: '$1,500', status: 'Paid' },
	{ id: 3, name: 'DJ Mike', provider: 'Music/Entertainment', amount: '$700', status: 'Pending' },
	{ id: 4, name: 'Decorations & Flowers', provider: 'Venue decoration', amount: '$200', status: 'Paid' },
];

const tasks: TaskItem[] = [
	{ id: 1, title: 'Book photographer', dueDate: 'Due May 1, 2026', state: 'done' },
	{ id: 2, title: 'Confirm catering menu', dueDate: 'Due May 10, 2026', state: 'done' },
	{ id: 3, title: 'Book DJ', dueDate: 'Due May 15, 2026', state: 'done' },
	{ id: 4, title: 'Order decorations', dueDate: 'Due May 30, 2026', state: 'done' },
	{ id: 5, title: 'Send invitations', dueDate: 'Due June 1, 2026', state: 'todo' },
	{ id: 6, title: 'Finalize guest count', dueDate: 'Due June 10, 2026', state: 'todo' },
	{ id: 7, title: 'Final venue walkthrough', dueDate: 'Due June 12, 2026 - Urgent', state: 'urgent' },
];

const providers: ProviderItem[] = [
	{ id: 1, name: 'John Photography', service: 'Photos', rating: 4.8, price: '$800', status: 'Confirmed' },
	{ id: 2, name: 'Sarah Catering', service: 'Catering', rating: 4.9, price: '$1,500', status: 'Confirmed' },
	{ id: 3, name: 'DJ Mike', service: 'DJ/Entertainment', rating: 4.7, price: '$700', status: 'Pending' },
];

function taskClasses(state: TaskItem['state']): string {
	if (state === 'done') {
		return 'border-green-100 bg-green-50';
	}

	if (state === 'urgent') {
		return 'border-red-100 bg-red-50';
	}

	return 'border-slate-200 bg-white';
}

export default function EventDetails() {
	const { eventId } = useParams();
	const [popupType, setPopupType] = useState('');

	const openPopup = (type: string) => {
		setPopupType(type);
	};

	const closePopup = () => {
		setPopupType('');
	};

	let popupTitle = 'Provider Details';

	if (popupType === 'editEvent') {
		popupTitle = 'Edit Event';
	} else if (popupType === 'addExpense') {
		popupTitle = 'Add Expense';
	} else if (popupType === 'addTask') {
		popupTitle = 'Add Task';
	} else if (popupType === 'editTask') {
		popupTitle = 'Edit Task';
	} else if (popupType === 'findProviders') {
		popupTitle = 'Find Providers';
	} else if (popupType === 'messageProvider') {
		popupTitle = 'Message Provider';
	}

	const totalBudget = 5000;
	const spentBudget = 3200;
	const remainingBudget = totalBudget - spentBudget;
	const completion = Math.round((tasks.filter((task) => task.state === 'done').length / tasks.length) * 100);

	return (
		<OrganizerLayout
			title='Summer Wedding'
			subtitle={`Event Details & Management${eventId ? ` • #${eventId}` : ''}`}
		>
			<div className='space-y-5'>
				<div className='flex items-center justify-end gap-2'>
					<button
						type='button'
						onClick={() => openPopup('editEvent')}
						className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:px-4'
					>
						Edit
					</button>
					<Link
						to='/organizer/events'
						className='rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 sm:px-4'
					>
						← Back
					</Link>
				</div>

				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<h3 className='text-base font-semibold text-slate-900'>Event Overview</h3>
					<div className='mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4'>
						<div>
							<p className='text-xs text-slate-500'>Date</p>
							<p className='font-semibold text-slate-900'>June 15, 2026</p>
						</div>
						<div>
							<p className='text-xs text-slate-500'>Location</p>
							<p className='font-semibold text-slate-900'>Marrakech</p>
						</div>
						<div>
							<p className='text-xs text-slate-500'>Guests</p>
							<p className='font-semibold text-slate-900'>150</p>
						</div>
						<div>
							<p className='text-xs text-slate-500'>Status</p>
							<p className='inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600'>
								In Progress
							</p>
						</div>
					</div>
					<p className='mt-4 text-sm text-slate-500'>
						A beautiful outdoor wedding celebration with family and friends. The ceremony
						will take place in the historical Menara garden followed by a reception with
						dinner and dancing.
					</p>
				</section>

				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<div className='flex items-center justify-between gap-3'>
						<h3 className='text-base font-semibold text-slate-900'>Budget Tracking</h3>
						<button
							type='button'
							onClick={() => openPopup('addExpense')}
							className='rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-600'
						>
							+ Add Expense
						</button>
					</div>

					<div className='mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3'>
						<div className='rounded-lg bg-green-50 p-3'>
							<p className='text-xs text-slate-500'>Total Budget</p>
							<p className='text-2xl font-bold text-green-600'>$5,000</p>
						</div>
						<div className='rounded-lg bg-blue-50 p-3'>
							<p className='text-xs text-slate-500'>Spent</p>
							<p className='text-2xl font-bold text-blue-600'>$3,200</p>
						</div>
						<div className='rounded-lg bg-orange-50 p-3'>
							<p className='text-xs text-slate-500'>Remaining</p>
							<p className='text-2xl font-bold text-orange-500'>${remainingBudget}</p>
						</div>
					</div>

					<div className='mt-4'>
						<div className='mb-2 flex items-center justify-between text-xs'>
							<span className='text-slate-500'>Budget Used</span>
							<span className='font-semibold text-slate-700'>${spentBudget.toLocaleString()} / ${totalBudget.toLocaleString()}</span>
						</div>
						<div className='h-2 rounded-full bg-slate-100'>
							<div className='h-2 w-[64%] rounded-full bg-blue-600' />
						</div>
					</div>

					<div className='mt-5'>
						<h4 className='text-sm font-semibold text-slate-900'>Expense Breakdown</h4>
						<div className='mt-3 space-y-2'>
							{expenses.map((expense) => (
								<div
									key={expense.id}
									className='flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2'
								>
									<div>
										<p className='text-sm font-medium text-slate-800'>{expense.name}</p>
										<p className='text-xs text-slate-500'>{expense.provider}</p>
									</div>
									<div className='text-right'>
										<p className='text-sm font-semibold text-slate-900'>{expense.amount}</p>
										<p
											className={`text-xs font-medium ${expense.status === 'Paid' ? 'text-green-600' : 'text-orange-500'}`}
										>
											{expense.status}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<div className='flex items-center justify-between gap-3'>
						<h3 className='text-base font-semibold text-slate-900'>Tasks & Checklist</h3>
						<button
							type='button'
							onClick={() => openPopup('addTask')}
							className='rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700'
						>
							+ Add Task
						</button>
					</div>

					<div className='mt-4'>
						<div className='mb-2 flex items-center justify-between text-xs'>
							<span className='text-slate-500'>Task Completion</span>
							<span className='font-semibold text-slate-700'>{completion}% ({tasks.filter((task) => task.state === 'done').length} of {tasks.length})</span>
						</div>
						<div className='h-2 rounded-full bg-slate-100'>
							<div className='h-2 rounded-full bg-green-500' style={{ width: `${completion}%` }} />
						</div>
					</div>

					<div className='mt-3 space-y-2'>
						{tasks.map((task) => (
							<div
								key={task.id}
								className={`flex items-center justify-between rounded-lg border px-3 py-2 ${taskClasses(task.state)}`}
							>
								<div className='flex items-start gap-2'>
									<input
										type='checkbox'
										checked={task.state === 'done'}
										readOnly
										className='mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600'
									/>
									<div>
										<p className='text-sm font-medium text-slate-800'>{task.title}</p>
										<p className='text-xs text-slate-500'>{task.dueDate}</p>
									</div>
								</div>
								<button
									type='button'
									onClick={() => openPopup('editTask')}
									className='text-xs font-medium text-blue-600 hover:text-blue-700'
								>
									Edit
								</button>
							</div>
						))}
					</div>
				</section>

				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
					<div className='flex items-center justify-between gap-3'>
						<h3 className='text-base font-semibold text-slate-900'>Booked Providers</h3>
						<button
							type='button'
							onClick={() => openPopup('findProviders')}
							className='rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700'
						>
							+ Find More
						</button>
					</div>

					<div className='mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3'>
						{providers.map((provider) => (
							<div
								key={provider.id}
								className='rounded-lg border border-slate-200 p-3'
							>
								<div className='flex items-start justify-between gap-2'>
									<div>
										<p className='text-sm font-semibold text-slate-800'>{provider.name}</p>
										<p className='text-xs text-slate-500'>{provider.service}</p>
										<p className='text-xs text-amber-500'>★ {provider.rating}</p>
									</div>
									<p
										className={`text-xs font-medium ${provider.status === 'Confirmed' ? 'text-green-600' : 'text-orange-500'}`}
									>
										{provider.status}
									</p>
								</div>

								<p className='mt-3 text-sm font-semibold text-green-600'>{provider.price}</p>

								<div className='mt-3 grid grid-cols-2 gap-2'>
									<button
										type='button'
										onClick={() => openPopup('messageProvider')}
										className='rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700'
									>
										Message
									</button>
									<button
										type='button'
										onClick={() => openPopup('viewProvider')}
										className='rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100'
									>
										View
									</button>
								</div>
							</div>
						))}
					</div>
				</section>

				{popupType !== '' && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'>
						<div className='w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl'>
							<h3 className='text-lg font-semibold text-slate-900'>{popupTitle}</h3>

							{popupType === 'editEvent' && (
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
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Location</label>
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
											rows={3}
											className='w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
								</div>
							)}

							{popupType === 'addExpense' && (
								<div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'>
									<div className='sm:col-span-2'>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Expense Name</label>
										<input
											type='text'
											required
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-green-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Provider</label>
										<input
											type='text'
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-green-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Amount</label>
										<input
											type='text'
											placeholder='$500'
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-green-500'
										/>
									</div>
									<div className='sm:col-span-2'>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Status</label>
										<select
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-green-500'
										>
											<option value='Pending'>Pending</option>
											<option value='Paid'>Paid</option>
										</select>
									</div>
								</div>
							)}

							{(popupType === 'addTask' || popupType === 'editTask') && (
								<div className='mt-4 grid grid-cols-1 gap-3'>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Task Title</label>
										<input
											type='text'
											required
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Due Date</label>
										<input
											type='text'
											placeholder='June 10, 2026'
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Priority</label>
										<select
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										>
											<option value='Low'>Low</option>
											<option value='Normal'>Normal</option>
											<option value='High'>High</option>
										</select>
									</div>
								</div>
							)}

							{popupType === 'findProviders' && (
								<div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'>
									<div className='sm:col-span-2'>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Service</label>
										<input
											type='text'
											required
											placeholder='Catering, DJ, Photography...'
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
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Max Budget</label>
										<input
											type='text'
											placeholder='$1,000'
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
								</div>
							)}

							{popupType === 'messageProvider' && (
								<div className='mt-4 grid grid-cols-1 gap-3'>
									<p className='text-xs text-slate-500'>To: Selected Provider</p>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Subject</label>
										<input
											type='text'
											required
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Message</label>
										<textarea
											rows={4}
											required
											className='w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
								</div>
							)}

							{popupType === 'viewProvider' && (
								<div className='mt-4 grid grid-cols-1 gap-3'>
									<p className='text-sm text-slate-600'>Provider: <span className='font-semibold text-slate-800'>Selected Provider</span></p>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Internal Notes</label>
										<textarea
											rows={3}
											className='w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500'
										/>
									</div>
									<div>
										<label className='mb-1 block text-xs font-semibold text-slate-600'>Preferred Contact</label>
										<select
											className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none focus:border-blue-500'
										>
											<option value='Message'>Message</option>
											<option value='Phone'>Phone</option>
											<option value='Email'>Email</option>
										</select>
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
									type='button'
									onClick={closePopup}
									className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
								>
									Save
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</OrganizerLayout>
	);
}
