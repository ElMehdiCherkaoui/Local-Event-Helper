import { Link } from "react-router-dom";

export default function Register() {
	return (
		<div className="min-h-screen bg-[#DBFFE7] flex flex-col">
			<main className="flex items-center justify-center px-4 py-8">
				<div className="w-full max-w-md text-center">
					<div className="mb-6">
						<h1 className="text-4xl font-extrabold text-green-500 ">LEH</h1>
						<p className="text-sm text-gray-500 mt-1">Local Event Helper</p>
					</div>
					<div className="bg-white rounded-lg shadow-md px-6 py-7 text-left">
						<h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
						<form className="space-y-4">
							<fieldset className="flex flex-col gap-2">
								<legend className="text-sm font-semibold text-gray-700 mb-1">
									I want to join as:
								</legend>
								<label htmlFor="role-organizer" className="flex items-start gap-3 border border-gray-300 rounded-md px-4 py-3 cursor-pointer">
									<input
										type="radio"
										name="role"
										id="role-organizer"
										value="organizer"
										defaultChecked
										className="mt-1 text-blue-500 focus:ring-blue-400"
									/>
									<div>
										<p className="text-sm font-semibold text-gray-800">Event Organizer</p>
										<p className="text-xs text-gray-500">Plan and manage events</p>
									</div>
								</label>
								<label htmlFor="role-provider" className="flex items-start gap-3 border border-gray-300 rounded-md px-4 py-3 cursor-pointer mt-2">
									<input
										type="radio"
										name="role"
										id="role-provider"
										value="provider"
										className="mt-1 text-blue-500 focus:ring-blue-400"
									/>
									<div>
										<p className="text-sm font-semibold text-gray-800">Service Provider</p>
										<p className="text-xs text-gray-500">Offer your services</p>
									</div>
								</label>
							</fieldset>
							<div>
								<label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
									Full Name
								</label>
								<input
									id="name"
									type="text"
									placeholder="Your full name"
									className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
								/>
							</div>

							<div>
								<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
									Email Address
								</label>
								<input
									id="email"
									type="email"
									placeholder="your@email.com"
									className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
								/>
							</div>


							<div>
								<label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
									Phone Number
								</label>
								<input
									id="phone"
									type="text"
									placeholder="+1 (555) 000-0000"
									className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
								/>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
									Password
								</label>
								<input
									id="password"
									type="password"
									placeholder="Create a password"
									className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
								/>
								<p className="text-xs text-gray-400 mt-1">At least 8 characters</p>
							</div>


							<div>
								<label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-1">
									Confirm Password
								</label>
								<input
									id="confirm-password"
									type="password"
									placeholder="Confirm password"
									className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
								/>
							</div>


							<div className="flex items-start gap-2">
								<input
									id="terms"
									type="checkbox"
									className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-400"
								/>
								<label htmlFor="terms" className="text-xs text-gray-500 leading-5">
									I agree to the {" "}
									<a href="#" className="text-green-600 font-medium hover:underline">Terms of Service</a>
									 {" "} and {" "}
									<a href="#" className="text-green-600 font-medium hover:underline">Privacy Policy</a>
								</label>
							</div>
							<button
								type="submit"
								className="w-full rounded-md bg-green-600 py-2.5 text-white font-semibold hover:bg-green-700 transition"
							>
								Create Account
							</button>

							<div className="flex items-center gap-3 pt-1">
								<div className="h-px flex-1 bg-gray-200"></div>
								<span className="text-xs text-gray-400">OR</span>
								<div className="h-px flex-1 bg-gray-200"></div>
							</div>

							<div className="text-center text-sm text-gray-500">
								<p>
									Already have an account? {" "}
									<Link to="/login" className="text-green-600 font-medium hover:underline">Login here</Link>
								</p>
							</div>

							
							<div className="text-center pt-1">
								<Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
									← Back to Home
								</Link>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}