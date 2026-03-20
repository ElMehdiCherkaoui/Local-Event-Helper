import { Link } from "react-router-dom";
import datetimeIcon from "../assets/icons/datetime.svg";
import moneyIcon from "../assets/icons/money.svg";
import searchIcon from "../assets/icons/search.svg";
import trueIcon from "../assets/icons/true.svg";
import messagesIcon from "../assets/icons/messages.svg";
import starIcon from "../assets/icons/star.svg";
import backpackIcon from "../assets/icons/backpack.svg";
import bagIcon from "../assets/icons/bag.svg";
import boxIcon from "../assets/icons/boxe.svg";
import cameraIcon from "../assets/icons/camera.svg";
import homeIcon from "../assets/icons/home.svg";
import musicIcon from "../assets/icons/music.svg";

type Step = {
	id: number;
	title: string;
	description: string;
	badgeClass: string;
};

type Feature = {
	title: string;
	description: string;
	icon: string;
	iconAlt: string;
	iconBgClass: string;
	iconSizeClass?: string;
};

type Category = {
	title: string;
	icon: string;
	iconAlt: string;
};

type Testimonial = {
	name: string;
	role: string;
	text: string;
};

const howItWorks: Step[] = [
	{
		id: 1,
		title: "Create Your Account",
		description: "Sign up as an event organizer and set up your profile in minutes",
		badgeClass: "bg-blue-100 text-blue-500",
	},
	{
		id: 2,
		title: "Create Your Event",
		description:
			"Tell us about your event, date, budget, and what services you need",
		badgeClass: "bg-green-100 text-green-600",
	},
	{
		id: 3,
		title: "Browse & Book Providers",
		description:
			"Search through verified providers and book the ones that fit your needs",
		badgeClass: "bg-purple-100 text-purple-600",
	},
];

const features: Feature[] = [
	{
		title: "Event Management",
		description:
			"Create, edit, and manage multiple events with all details in one place. Track dates, locations, and descriptions easily.",
		icon: datetimeIcon,
		iconAlt: "Event Management",
		iconBgClass: "bg-blue-600",
	},
	{
		title: "Budget Tracking",
		description:
			"Set event budgets and track spending in real-time. See exactly how much you've allocated and spent on each service.",
		icon: moneyIcon,
		iconAlt: "Budget Tracking",
		iconBgClass: "bg-green-600",
	},
	{
		title: "Provider Search",
		description:
			"Browse hundreds of verified service providers. Filter by category, rating, budget, and availability to find the perfect match.",
		icon: searchIcon,
		iconAlt: "Provider Search",
		iconBgClass: "bg-purple-600",
	},
	{
		title: "Task Management",
		description:
			"Create to-do lists for each event. Track what's been done and what still needs attention before the big day.",
		icon: trueIcon,
		iconAlt: "Task Management",
		iconBgClass: "bg-orange-500",
		iconSizeClass: "w-7 h-7",
	},
	{
		title: "Direct Messaging",
		description:
			"Communicate directly with service providers through our built-in messaging system. Ask questions and negotiate prices easily.",
		icon: messagesIcon,
		iconAlt: "Direct Messaging",
		iconBgClass: "bg-red-600",
	},
	{
		title: "Ratings & Reviews",
		description:
			"See honest reviews from other event organizers. Make informed decisions based on real experiences with service providers.",
		icon: starIcon,
		iconAlt: "Ratings & Reviews",
		iconBgClass: "bg-yellow-500",
	},
];

const categories: Category[] = [
	{ title: "Photography", icon: cameraIcon, iconAlt: "Photography" },
	{ title: "Catering", icon: bagIcon, iconAlt: "Catering" },
	{ title: "DJ & Music", icon: musicIcon, iconAlt: "DJ & Music" },
	{ title: "Decoration", icon: backpackIcon, iconAlt: "Decoration" },
	{ title: "Flowers", icon: boxIcon, iconAlt: "Flowers" },
	{ title: "Venue & More", icon: homeIcon, iconAlt: "Venue & More" },
];

const testimonials: Testimonial[] = [
	{
		name: "Sarah Johnson",
		role: "Wedding Organizer",
		text: `"Local Event Helper made planning my wedding so much easier! I found amazing vendors and managed everything in one place. Highly recommend!"`,
	},
	{
		name: "Michael Chen",
		role: "Corporate Event Planner",
		text: `"Great platform! The budget tracking feature helped me stay on budget for my corporate event. Easy to use and very reliable."`,
	},
	{
		name: "Emma Williams",
		role: "Birthday Party Planner",
		text: `"I organized my daughter's birthday party using LEH and it was perfect! Found great vendors at reasonable prices. Thank you!"`,
	},
];



export default function Home() {
	return (
		<div className="bg-[#DDE5FF] font-sans text-gray-800 antialiased">
			<nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
					<Link to="/" className="flex items-center gap-2">
						<span className="text-blue-500 font-extrabold text-2xl">LEH</span>
					</Link>

					<div className="flex items-center gap-3">
						<Link
							to="/login"
							className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition px-4 py-2 rounded-lg hover:bg-blue-50"
						>
							Log In
						</Link>
						<Link
							to="/register"
							className="text-sm font-semibold bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow transition"
						>
							Sign Up
						</Link>
					</div>
				</div>
			</nav>

			<section className="bg-blue-500 py-20 px-6">
				<div className="max-w-5xl mx-auto text-center">
					<h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
						Plan Your Perfect Event
					</h1>
					<p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto mb-8">
						Find and book professional service providers for weddings, birthdays,
						corporate events, and more
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							to="/register"
							className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
						>
							Get Started
						</Link>
						<a
							href="#how-it-works"
							className="border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition"
						>
							Learn More
						</a>
					</div>
				</div>
			</section>

			<section id="how-it-works" className="bg-gray-50 py-20 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="mb-14">
						<h2 className="text-4xl md:text-5xl font-extrabold text-black text-center">
							How It Works
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{howItWorks.map((step) => (
							<div key={step.id} className="bg-white rounded-lg shadow-sm p-10 text-center">
								<div
									className={`w-14 h-14 mx-auto mb-6 rounded-full flex items-center justify-center text-xl font-bold ${step.badgeClass}`}
								>
									{step.id}
								</div>
								<h3 className="text-xl font-semibold text-black mb-3">{step.title}</h3>
								<p className="text-gray-500 text-sm leading-6">{step.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-24 px-6 bg-white">
				<div className="max-w-6xl mx-auto">
					<div className="mb-16">

						<h2 className="text-4xl md:text-5xl font-extrabold text-black text-center">
							Features for Event Organizers
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
						{features.map((feature) => (
							<div key={feature.title} className="flex items-start gap-5">
								<div
									className={`w-10 h-10 rounded-md ${feature.iconBgClass} flex items-center justify-center shrink-0`}
								>
									<img
										src={feature.icon}
										alt={feature.iconAlt}
										className={feature.iconSizeClass ?? "w-5 h-5"}
									/>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-black mb-2">{feature.title}</h3>
									<p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-24 px-6 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<div className="mb-14">

						<h2 className="text-4xl md:text-5xl font-extrabold text-black text-center">
							Find Providers For...
						</h2>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
						{categories.map((category) => (
							<div
								key={category.title}
								className="bg-white border border-gray-200 rounded-md px-6 py-8 flex flex-col items-center justify-center text-center shadow-xs"
							>
								<img src={category.icon} alt={category.iconAlt} className="w-8 h-8 mb-3" />
								<h3 className="text-base font-semibold text-black">{category.title}</h3>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-24 px-6 bg-white">
				<div className="max-w-6xl mx-auto">
					<div className="mb-16">

						<h2 className="text-4xl md:text-5xl font-extrabold text-black text-center">
							What Our Users Say
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{testimonials.map((item) => (
							<div key={item.name} className="bg-white border border-gray-200 rounded-md p-6">
								<div className="text-yellow-500 text-sm mb-4">★★★★★</div>
								<p className="text-gray-600 text-sm leading-7 mb-6">{item.text}</p>
								<div>
									<h3 className="text-black font-bold text-base">{item.name}</h3>
									<p className="text-gray-500 text-sm">{item.role}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section>
				<div className="bg-blue-500 py-20 px-6 text-center">
					<div className="max-w-4xl mx-auto">
						<h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
							Ready to Plan Your Event?
						</h2>
						<p className="text-blue-100 text-sm md:text-base mb-8">
							Join thousands of event organizers who trust Local Event Helper
						</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
							<Link
								to="/register"
								className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition"
							>
								Sign Up Now
							</Link>
							<Link
								to="/login"
								className="border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-blue-600 transition"
							>
								Login
							</Link>
						</div>
					</div>
				</div>
			</section>

			<footer className="bg-[#1F2937] text-center py-10 px-6">
				<p className="text-slate-400 text-xs mb-2">
					© 2026 Local Event Helper. All rights reserved.
				</p>
				<p className="text-slate-500 text-xs">
					Project by El Mehdi Cherkaoui | Supervised by Achraf Chaoub
				</p>
			</footer>
		</div>
	);
}