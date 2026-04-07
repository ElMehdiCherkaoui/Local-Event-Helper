import ProviderLayout from '../../layouts/ProviderLayout';

type RatingRow = {
	stars: string;
	count: number;
	percent: number;
};

type ReviewItem = {
	name: string;
	initials: string;
	color: string;
	eventLabel: string;
	comment: string;
	rating: string;
	when: string;
	food: string;
	service: string;
	value: string;
};

const ratingRows: RatingRow[] = [
	{ stars: '5', count: 108, percent: 85 },
	{ stars: '4', count: 15, percent: 12 },
	{ stars: '3', count: 3, percent: 3 },
	{ stars: '2', count: 1, percent: 1 },
];

const reviews: ReviewItem[] = [
	{
		name: 'Emily Johnson',
		initials: 'E',
		color: 'bg-blue-500',
		eventLabel: 'Wedding Reception • Garden Wedding',
		comment:
			'Absolutely amazing catering service! The food was delicious and beautifully presented. Sarah and her team were professional, punctual, and went above and beyond to make our wedding day special. Highly recommend!',
		rating: '5.0',
		when: '2 days ago',
		food: '5.0',
		service: '5.0',
		value: '5.0',
	},
	{
		name: 'Michael Brown',
		initials: 'M',
		color: 'bg-green-500',
		eventLabel: 'Corporate Event • Annual Conference',
		comment:
			'Professional service and excellent food quality. Sarah Catering handled our corporate conference flawlessly. Our team was very impressed and will definitely book again!',
		rating: '5.0',
		when: '1 week ago',
		food: '5.0',
		service: '5.0',
		value: '5.0',
	},
	{
		name: 'Sarah Wilson',
		initials: 'S',
		color: 'bg-pink-500',
		eventLabel: 'Birthday Party • 30th Birthday',
		comment:
			'Great food and service overall. Guests loved the menu selection. The appetizers were creative and delicious. Only minor issue was timing on a couple of dishes, but everything else was perfect!',
		rating: '4.5',
		when: '2 weeks ago',
		food: '5.0',
		service: '4.0',
		value: '5.0',
	},
	{
		name: 'David Martinez',
		initials: 'D',
		color: 'bg-orange-500',
		eventLabel: 'Wedding Reception • Beach Wedding',
		comment:
			'Outstanding service from start to finish! Sarah helped us plan the perfect menu. The presentation was stunning and the taste exceeded our expectations. The team was incredibly organized!',
		rating: '5.0',
		when: '3 weeks ago',
		food: '5.0',
		service: '5.0',
		value: '5.0',
	},
];

export default function ProviderReviews() {
	return (
		<ProviderLayout title='Reviews & Ratings' subtitle='View customer feedback and manage responses'>
			<div className='space-y-4'>
				<section className='rounded-2xl border border-slate-200 bg-white p-4 sm:p-5'>
					<h3 className='text-base font-bold text-slate-900'>Overall Rating</h3>

					<div className='mt-3 grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]'>
						<div className='flex flex-col items-center justify-center rounded-xl bg-slate-50 p-4 text-center'>
							<p className='text-5xl font-bold text-slate-900'>4.9</p>
							<p className='mt-1 text-sm text-amber-500'>★★★★★</p>
							<p className='mt-1 text-xs text-slate-500'>Based on 127 reviews</p>
						</div>

						<div className='space-y-2'>
							{ratingRows.map((row) => (
								<div key={row.stars} className='grid grid-cols-[32px_1fr_28px] items-center gap-2 text-xs'>
									<span className='text-slate-600'>{row.stars} ★</span>
									<div className='h-2 rounded-full bg-slate-100'>
										<div
											className='h-2 rounded-full bg-amber-400'
											style={{ width: `${row.percent}%` }}
										/>
									</div>
									<span className='text-right text-slate-500'>{row.count}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				<section className='rounded-2xl border border-slate-200 bg-white p-3 sm:p-4'>
					<div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
						<select className='h-10 rounded-lg border border-slate-200 bg-gray-100 px-3 text-sm text-slate-600 outline-none'>
							<option>All Ratings</option>
							<option>5 Stars</option>
							<option>4 Stars</option>
							<option>3 Stars</option>
						</select>
						<select className='h-10 rounded-lg border border-slate-200 bg-gray-100   px-3 text-sm text-slate-600 outline-none'>
							<option>All Events</option>
							<option>Wedding</option>
							<option>Corporate</option>
							<option>Birthday</option>
						</select>
					</div>
				</section>

				<section className='space-y-3'>
					<h3 className='text-lg font-bold text-slate-900'>Customer Reviews</h3>

					{reviews.map((review) => (
						<article key={review.name} className='rounded-2xl border border-slate-200 bg-white p-4'>
							<div className='flex items-start justify-between gap-3'>
								<div className='flex items-start gap-3'>
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${review.color}`}
									>
										{review.initials}
									</div>
									<div>
										<h4 className='text-sm font-semibold text-slate-900'>{review.name}</h4>
										<p className='text-[11px] text-slate-500'>{review.eventLabel}</p>
									</div>
								</div>

								<div className='text-right'>
									<p className='text-xs font-semibold text-amber-500'>★★★★★</p>
									<p className='text-xs font-semibold text-slate-700'>{review.rating}</p>
									<p className='text-[10px] text-slate-400'>{review.when}</p>
								</div>
							</div>

							<p className='mt-3 text-sm leading-relaxed text-slate-600'>{review.comment}</p>

							<p className='mt-3 text-xs text-slate-500'>
								Food: <span className='font-semibold text-slate-700'>{review.food}</span> ★
								&nbsp;&nbsp; Service: <span className='font-semibold text-slate-700'>{review.service}</span> ★
								&nbsp;&nbsp; Value: <span className='font-semibold text-slate-700'>{review.value}</span> ★
							</p>
						</article>
					))}
				</section>

				<div className='flex items-center justify-center gap-2 pb-2 text-xs'>
					<button type='button' className='rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100'>
						Previous
					</button>
					<button type='button' className='rounded-md bg-[#8B5CF6] px-2.5 py-1 font-semibold text-white'>
						1
					</button>
					<button type='button' className='rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100'>
						2
					</button>
					<button type='button' className='rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100'>
						3
					</button>
					<button type='button' className='rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100'>
						Next
					</button>
				</div>
			</div>
		</ProviderLayout>
	);
}
