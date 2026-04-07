import ProviderLayout from '../../layouts/ProviderLayout';

type StatCard = {
	label: string;
	value: string;
	valueClass: string;
};

type DayState = 'past' | 'available' | 'blocked' | 'booked';

type DayCell = {
	day: number;
	state: DayState;
};

type Booking = {
	title: string;
	organizer: string;
	date: string;
	city: string;
	guests: string;
	status: string;
};

const stats: StatCard[] = [
	{ label: 'Available Days', value: '245', valueClass: 'text-emerald-600' },
	{ label: 'Booked Days', value: '65', valueClass: 'text-violet-600' },
	{ label: 'Blocked Days', value: '55', valueClass: 'text-red-600' },
	{ label: 'Upcoming Events', value: '12', valueClass: 'text-blue-600' },
];

const dayCells: DayCell[] = [
	{ day: 1, state: 'past' },
	{ day: 2, state: 'past' },
	{ day: 3, state: 'past' },
	{ day: 4, state: 'past' },
	{ day: 5, state: 'past' },
	{ day: 6, state: 'past' },
	{ day: 7, state: 'past' },
	{ day: 8, state: 'available' },
	{ day: 9, state: 'available' },
	{ day: 10, state: 'available' },
	{ day: 11, state: 'blocked' },
	{ day: 12, state: 'blocked' },
	{ day: 13, state: 'blocked' },
	{ day: 14, state: 'available' },
	{ day: 15, state: 'booked' },
	{ day: 16, state: 'available' },
	{ day: 17, state: 'available' },
	{ day: 18, state: 'available' },
	{ day: 19, state: 'available' },
	{ day: 20, state: 'booked' },
	{ day: 21, state: 'available' },
	{ day: 22, state: 'available' },
	{ day: 23, state: 'available' },
	{ day: 24, state: 'available' },
	{ day: 25, state: 'available' },
	{ day: 26, state: 'available' },
	{ day: 27, state: 'available' },
	{ day: 28, state: 'booked' },
];

const upcomingBookings: Booking[] = [
	{
		title: 'Garden Wedding',
		organizer: 'Emma Wilson',
		date: 'February 15, 2026',
		city: 'Marrakech',
		guests: '120 guests',
		status: 'Confirmed',
	},
	{
		title: 'Birthday Party',
		organizer: 'Alice Smith',
		date: 'February 20, 2026',
		city: 'Casablanca',
		guests: '50 guests',
		status: 'Confirmed',
	},
	{
		title: 'Anniversary Dinner',
		organizer: 'Michael Brown',
		date: 'February 28, 2026',
		city: 'Casablanca',
		guests: '80 guests',
		status: 'Confirmed',
	},
];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDayClass(state: DayState) {
	if (state === 'past') {
		return 'border border-slate-300 bg-slate-100 text-slate-400';
	}

	if (state === 'blocked') {
		return 'border-2 border-red-500 bg-red-50 text-red-700';
	}

	if (state === 'booked') {
		return 'border-2 border-violet-500 bg-violet-100 text-violet-700';
	}

	return 'border-2 border-emerald-500 bg-emerald-100 text-emerald-800';
}

export default function ProviderAvailability() {
	return (
		<ProviderLayout title='Availability Calendar' subtitle='Manage your availability for upcoming events'>
			<div className='space-y-4'>
				<div className='flex items-center justify-end'>
					<button
						type='button'
						className='rounded-md bg-[#8B5CF6] px-3 py-2 text-xs font-semibold text-white hover:bg-[#7C3AED] sm:px-4'
					>
						+ Block Dates
					</button>
				</div>

				<section className='grid grid-cols-2 gap-3 xl:grid-cols-4'>
					{stats.map((stat) => (
						<div key={stat.label} className='rounded-2xl border border-slate-200 bg-white p-4'>
							<p className='text-[11px] font-semibold uppercase tracking-wide text-slate-500'>{stat.label}</p>
							<p className={`mt-2 text-2xl font-bold sm:text-3xl ${stat.valueClass}`}>{stat.value}</p>
						</div>
					))}
				</section>

				<section className='rounded-2xl border border-slate-200 bg-white p-4 sm:p-5'>
					<div className='flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between'>
						<button
							type='button'
							className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'
						>
							← Previous
						</button>
						<h3 className='text-4xl font-bold text-slate-900 sm:text-3xl'>February 2026</h3>
						<button
							type='button'
							className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50'
						>
							Next →
						</button>
					</div>

					<div className='mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4'>
						<p className='flex items-center gap-2 text-slate-600'>
							<span className='h-2.5 w-2.5 rounded bg-emerald-500' />
							Available
						</p>
						<p className='flex items-center gap-2 text-slate-600'>
							<span className='h-2.5 w-2.5 rounded bg-violet-500' />
							Booked
						</p>
						<p className='flex items-center gap-2 text-slate-600'>
							<span className='h-2.5 w-2.5 rounded bg-red-500' />
							Blocked
						</p>
						<p className='flex items-center gap-2 text-slate-600'>
							<span className='h-2.5 w-2.5 rounded bg-slate-300' />
							Past Date
						</p>
					</div>

					<div className='mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-700 sm:gap-2 sm:text-sm'>
						{weekDays.map((day) => (
							<div key={day} className='py-2'>
								{day}
							</div>
						))}
					</div>

					<div className='grid grid-cols-7 gap-1 sm:gap-2'>
						{dayCells.map((cell) => (
							<div
								key={cell.day}
								className={`flex h-12 items-center justify-center rounded-lg text-sm font-semibold sm:h-16 md:h-20 lg:h-24 ${getDayClass(cell.state)}`}
							>
								{cell.day}
							</div>
						))}
					</div>
				</section>

				<section>
					<h3 className='mb-3 text-2xl font-bold text-slate-900 sm:text-3xl'>Upcoming Bookings</h3>
					<div className='space-y-3'>
						{upcomingBookings.map((booking) => (
							<article
								key={booking.title}
								className='flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between'
							>
								<div>
									<h4 className='text-lg font-bold text-slate-900 sm:text-xl'>{booking.title}</h4>
									<p className='text-xs text-slate-500 sm:text-sm'>
										Organizer: <span className='font-semibold text-slate-700'>{booking.organizer}</span>
									</p>
									<p className='mt-1 text-xs text-slate-500 sm:text-sm'>
										{booking.date} &nbsp;&nbsp;•&nbsp;&nbsp; {booking.city}
										&nbsp;&nbsp;•&nbsp;&nbsp; {booking.guests}
									</p>
								</div>

								<span className='self-start rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 sm:self-center'>
									{booking.status}
								</span>
							</article>
						))}
					</div>
				</section>
			</div>
		</ProviderLayout>
	);
}
