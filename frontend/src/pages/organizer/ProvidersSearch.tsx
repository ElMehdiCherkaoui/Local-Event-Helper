import OrganizerLayout from '../../layouts/OrganizerLayout';
import { Link } from 'react-router-dom';

type Provider = {
	id: number;
	name: string;
	role: string;
	city: string;
	description: string;
	price: string;
	rating: number;
	color: string;
};

const providers: Provider[] = [
	{
		id: 1,
		name: 'John Photography',
		role: 'Photographer',
		city: 'Marrakech',
		description: 'Professional photographer with 10+ years of experience.',
		price: '$800/day',
		rating: 4.8,
		color: 'bg-blue-600',
	},
	{
		id: 2,
		name: 'Sarah Catering',
		role: 'Caterer',
		city: 'Marrakech',
		description: 'Delicious catering services for all types of events.',
		price: '$15-25/person',
		rating: 4.9,
		color: 'bg-pink-600',
	},
	{
		id: 3,
		name: 'DJ Mike',
		role: 'DJ / Entertainment',
		city: 'Casablanca',
		description: 'Professional DJ with extensive music library.',
		price: '$700/event',
		rating: 4.7,
		color: 'bg-indigo-600',
	},
	{
		id: 4,
		name: 'Elegant Decor',
		role: 'Decorator',
		city: 'Marrakech',
		description: 'Creative event decoration with a touch of elegance.',
		price: '$500+',
		rating: 5.0,
		color: 'bg-teal-600',
	},
	{
		id: 5,
		name: 'Vision Films',
		role: 'Videographer',
		city: 'Rabat',
		description: 'Cinematic wedding and event videography.',
		price: '$1,200/day',
		rating: 4.9,
		color: 'bg-amber-600',
	},
	{
		id: 6,
		name: 'Riad Al Andalous',
		role: 'Venue',
		city: 'Marrakech',
		description: 'Beautiful traditional Moroccan venue.',
		price: '$2,000/day',
		rating: 4.8,
		color: 'bg-fuchsia-600',
	},
];

export default function ProvidersSearch() {
	return (
		<OrganizerLayout
			title='Find Providers'
			subtitle='Search and book service providers'
		>
			<div className='space-y-5'>
				<section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
					<div className='grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4'>
						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Category</label>
							<select className='h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none'>
								<option>All Categories</option>
								<option>Photographer</option>
								<option>Caterer</option>
								<option>Venue</option>
							</select>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Location</label>
							<input
								type='text'
								placeholder='City'
								className='h-10 w-full rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
							/>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Price Range</label>
							<select className='h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none'>
								<option>Any Price</option>
								<option>$</option>
								<option>$$</option>
								<option>$$$</option>
							</select>
						</div>

						<div>
							<label className='mb-1 block text-xs font-semibold text-slate-600'>Rating</label>
							<select className='h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 outline-none'>
								<option>Any Rating</option>
								<option>4.0+</option>
								<option>4.5+</option>
							</select>
						</div>
					</div>

					<div className='mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto]'>
						<input
							type='text'
							placeholder='Search by name...'
							className='h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 outline-none'
						/>
						<button
							type='button'
							className='h-10 rounded-lg bg-blue-600 px-6 text-sm font-semibold text-white transition hover:bg-blue-700'
						>
							Search
						</button>
					</div>
				</section>

				<div>
					<p className='text-sm text-slate-600'>
						Showing <span className='font-semibold text-slate-800'>12 providers</span> in your area
					</p>
				</div>

				<section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3'>
					{providers.map((provider) => (
						<article
							key={provider.id}
							className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'
						>
							<div className={`h-40 ${provider.color}`} />

							<div className='p-3'>
								<div className='flex items-start justify-between gap-3'>
									<div>
										<h3 className='text-xl font-semibold text-slate-900'>{provider.name}</h3>
										<p className='text-xs text-slate-500'>{provider.role}</p>
									</div>
									<span className='inline-flex rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-600'>
										★ {provider.rating}
									</span>
								</div>

								<p className='mt-2 text-xs text-slate-500'>📍 {provider.city}</p>
								<p className='mt-3 text-sm text-slate-500'>{provider.description}</p>
								<p className='mt-3 text-base font-semibold text-green-600'>{provider.price}</p>

								<div className='mt-3 grid grid-cols-[1fr_auto] gap-2'>
									<Link
										to={`/organizer/providers/${provider.id}`}
										className='rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-blue-700'
									>
										View Profile
									</Link>
									<button
										type='button'
										className='rounded-lg bg-green-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-600'
									>
										+ Add
									</button>
								</div>
							</div>
						</article>
					))}
				</section>

				<div className='flex items-center justify-center gap-2 text-sm text-slate-500'>
					<button type='button' className='px-2 py-1 hover:text-slate-700'>
						Previous
					</button>
					<button type='button' className='rounded bg-blue-600 px-2 py-1 text-white'>
						1
					</button>
					<button type='button' className='px-2 py-1 hover:text-slate-700'>
						2
					</button>
					<button type='button' className='px-2 py-1 hover:text-slate-700'>
						3
					</button>
					<button type='button' className='px-2 py-1 hover:text-slate-700'>
						Next
					</button>
				</div>
			</div>
		</OrganizerLayout>
	);
}
