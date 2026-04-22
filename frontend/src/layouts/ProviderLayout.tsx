import type { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProviderIconDashboard from '../assets/icons/IconProviderAvailability.svg';
import ProviderIconServices from '../assets/icons/IconProviderServices.svg';
import ProviderIconBookings from '../assets/icons/IconProviderBooking.svg';
import ProviderIconAvailability from '../assets/icons/IconProviderAvailability.svg';
import ProviderIconMessages from '../assets/icons/IconProviderMessages.svg';
import ProviderIconProfile from '../assets/icons/IconProviderProfile.svg';

type ProviderLayoutProps = {
	children: ReactNode;
	title: string;
	subtitle: string;
};

type NavItem = {
	label: string;
	path: string;
	mobileLabel: string;
	icon?: string;
};

const navItems: NavItem[] = [
	{ label: 'Dashboard', path: '/provider/dashboard', mobileLabel: 'Home', icon: ProviderIconDashboard },
	{ label: 'My Services', path: '/provider/services', mobileLabel: 'Services', icon: ProviderIconServices },
	{ label: 'Booking Requests', path: '/provider/bookings', mobileLabel: 'Bookings', icon: ProviderIconBookings },
	{ label: 'Availability', path: '/provider/availability', mobileLabel: 'Availability', icon: ProviderIconAvailability },
	{ label: 'Messages', path: '/provider/messages', mobileLabel: 'Messages', icon: ProviderIconMessages },
	{ label: 'My Profile', path: '/provider/profile', mobileLabel: 'Profile', icon: ProviderIconProfile },
];	

export default function ProviderLayout({ children, title, subtitle }: ProviderLayoutProps) {
	const location = useLocation();
	const navigate = useNavigate();

	let loggedUserName = 'Provider User';
	let loggedUserInitials = 'PU';

	try {
		const userText = localStorage.getItem('user');
		if (userText) {
			const user = JSON.parse(userText);
			const fullName = (user?.name || '').trim();

			if (fullName) {
				loggedUserName = fullName;
				loggedUserInitials = fullName[0].toUpperCase();
			}
		}
	} catch {
		
	}

	const isActive = (path: string) => location.pathname === path;

	const handleLogout = async () => {
		const token = localStorage.getItem('token');

		if (token) {
			try {
				await fetch('http://127.0.0.1:8000/api/logout', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: 'application/json',
					},
				});
			} catch {
			
			}
		}

		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigate('/login');
	};

	return (
		<div className='min-h-screen w-full bg-[#2f2f2f] font-sans'>
			<div className='flex min-h-screen w-full overflow-hidden bg-[#EDEDED]'>
				<aside className='hidden w-64 flex-col bg-[#16003A] text-white lg:flex'>
					<div className='flex h-full flex-col'>
						<div className='px-6 py-5'>
							<h1 className='text-lg font-bold'>LEH Provider</h1>
						</div>

						<nav className='flex-1 space-y-2 px-4 py-4 text-sm sticky'>
							{navItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`flex items-center gap-3 rounded-md px-4 py-2.5 transition-colors ${
										isActive(item.path)
											? 'bg-[#2A0B5A] text-white'
											: 'text-purple-100/80 hover:bg-white/10'
									}`}
								>
									{item.icon && <img src={item.icon} alt={item.label} className='h-5 w-5' />}
									<span>{item.label}</span>
								</Link>
							))}
						</nav>

						<div className='border-t border-white/10 p-4'>
							<div className='flex items-center gap-3'>
								<div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#8B5CF6] text-[10px] font-semibold'>
									{loggedUserInitials}
								</div>
								<div>
									<p className='text-xs font-medium'>{loggedUserName}</p>
									<p className='text-[10px] text-purple-100/70'>Caterer</p>
								</div>
							</div>

							<button
								type='button'
								onClick={handleLogout}
								className='mt-4 w-full rounded-md border border-white/15 py-2 text-center text-xs font-medium text-white hover:bg-white/10'
							>
								Sign out
							</button>
						</div>
					</div>
				</aside>

				<div className='flex-1'>
					<header className='border-b border-black/5 bg-[#FFFFFF] px-4 py-4 sm:px-5 lg:px-6'>
						<div>
							<h2 className='text-sm font-bold text-[#161B26] sm:text-base lg:text-xl'>{title}</h2>
							<p className='text-[10px] text-gray-500 sm:text-[11px] lg:text-xs'>{subtitle}</p>
						</div>
					</header>

					<main className='px-4 py-4 pb-24 sm:px-5 lg:px-6 lg:py-5 lg:pb-6'>{children}</main>
				</div>
			</div>

			<nav className='fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#16003A] px-2 py-2 text-white lg:hidden'>
				<div className='grid grid-cols-7 text-center text-[10px]'>
					{navItems.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={`flex flex-col items-center gap-1 py-1 ${
								isActive(item.path) ? 'text-[#8B5CF6]' : 'text-purple-100/70'
							}`}
						>
							<img src={item.icon} alt={item.label} className='h-5 w-5' />
							<span>{item.mobileLabel}</span>
						</Link>
					))}
				</div>
			</nav>
		</div>
	);
}
