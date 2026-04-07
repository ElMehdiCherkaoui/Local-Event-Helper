import ProviderLayout from '../../layouts/ProviderLayout';

type BookingRequest = {
	title: string;
	status: string;
	organizer: string;
	date: string;
	location: string;
	guests: string;
	budget: string;
	receivedAt: string;
	serviceRequested: string;
	eventDetails: string;
};

const bookingRequests: BookingRequest[] = [
	{
		title: 'Summer Wedding',
		status: 'Pending',
		organizer: 'John Doe',
		date: 'June 15, 2026',
		location: 'Marrakech, Morocco',
		guests: '150 guests',
		budget: '$3,000',
		receivedAt: 'Received 2 hours ago',
		serviceRequested: 'Wedding Catering',
		eventDetails:
			'Looking for full catering service for outdoor wedding. Need both Moroccan and international cuisine options. Setup required by 4 PM, event starts at 6 PM. Dietary requirements: 10 vegetarian, 5 vegan guests.',
	},
	{
		title: 'Birthday Party',
		status: 'Pending',
		organizer: 'Alice Smith',
		date: 'March 20, 2026',
		location: 'Casablanca, Morocco',
		guests: '50 guests',
		budget: '$800',
		receivedAt: 'Received 5 hours ago',
		serviceRequested: 'Birthday Party Catering',
		eventDetails:
			'30th birthday celebration. Need finger foods, appetizers, and a dessert table. Indoor venue. Event from 7 PM to 11 PM.',
	},
	{
		title: 'Corporate Conference',
		status: 'Pending',
		organizer: 'Business Solutions Inc.',
		date: 'April 10, 2026',
		location: 'Rabat, Morocco',
		guests: '200 guests',
		budget: '$4,500',
		receivedAt: 'Received 1 day ago',
		serviceRequested: 'Corporate Lunch Buffet',
		eventDetails:
			'Full day conference. Need lunch buffet service from 12 PM to 2 PM, plus coffee breaks at 10 AM and 3 PM. Professional presentation required.',
	},
];

export default function ProviderBookings() {
	return (
		<ProviderLayout title='Booking Requests' subtitle='Manage and respond to event requests'>
			<div className='space-y-4'>
				{bookingRequests.map((request) => (
					<article key={request.title} className='rounded-2xl border border-slate-200 bg-white p-4'>
						<div className='flex flex-wrap items-center gap-2'>
							<h3 className='text-2xl font-bold text-slate-900'>{request.title}</h3>
							<span className='rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700'>
								{request.status}
							</span>
						</div>

						<p className='mt-1 text-sm text-slate-500'>
							Organizer: <span className='font-semibold text-slate-700'>{request.organizer}</span>
						</p>

						<p className='mt-1 text-xs text-slate-500'>
							📅 {request.date} &nbsp;&nbsp;•&nbsp;&nbsp;📍 {request.location}
							&nbsp;&nbsp;•&nbsp;&nbsp;👥 {request.guests} &nbsp;&nbsp;•&nbsp;&nbsp;💰 {request.budget}
						</p>

						<p className='mt-2 text-xs text-slate-400'>{request.receivedAt}</p>

						<div className='mt-3 border-t border-slate-100 pt-3'>
							<p className='text-xs font-bold uppercase tracking-wide text-slate-500'>Service Requested</p>
							<p className='mt-1 inline-block rounded-full bg-violet-50 px-2 py-0.5 text-xs font-semibold text-[#7C3AED]'>
								{request.serviceRequested}
							</p>
						</div>

						<div className='mt-3'>
							<p className='text-xs font-bold uppercase tracking-wide text-slate-500'>Event Details</p>
							<p className='mt-1 text-sm leading-relaxed text-slate-600'>{request.eventDetails}</p>
						</div>

						<div className='mt-4 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 sm:grid-cols-3'>
							<button
								type='button'
								className='h-9 rounded-md bg-green-600 px-3 text-xs font-semibold text-white hover:bg-green-700'
							>
								Accept Request
							</button>
							<button
								type='button'
								className='h-9 rounded-md bg-rose-50 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-100'
							>
								Decline
							</button>
							<button
								type='button'
								className='h-9 rounded-md bg-[#8B5CF6] px-3 text-xs font-semibold text-white hover:bg-[#7C3AED]'
							>
								Message
							</button>
						</div>
					</article>
				))}
			</div>
		</ProviderLayout>
	);
}
