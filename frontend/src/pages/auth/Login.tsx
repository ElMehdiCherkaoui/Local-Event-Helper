import { Link } from "react-router-dom";

export default function Login() {
	return (
		<div className="min-h-screen bg-[#eef2ff] flex flex-col">
			<main className="flex-1 flex items-center justify-center px-4 py-8">
				<div className="w-full max-w-md text-center">
					<div className="mb-6">
						<h1 className="text-4xl font-extrabold text-blue-500">LEH</h1>
						<p className="text-sm text-gray-500 mt-1">Local Event Helper</p>
					</div>

					<div className="bg-white rounded-lg shadow-md px-6 py-7 text-left">
						<h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
							Login to Your Account
						</h2>

						<form className="space-y-4">
							<div>
								<label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
									Email Address
								</label>
								<input
									id="email"
									type="email"
									placeholder="your@email.com"
									className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
								/>
							</div>

							<div>
								<label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
									Password
								</label>
								<input
									id="password"
									type="password"
									placeholder="Your password"
									className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
								/>
							</div>

							<div className="flex items-center gap-2">
								<input
									id="remember"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
								/>
								<label htmlFor="remember" className="text-sm text-gray-500">
									Remember me
								</label>
							</div>

							<button
								type="submit"
								className="w-full rounded-md bg-blue-500 py-2.5 text-white font-semibold hover:bg-blue-600 transition"
							>
								Login
							</button>

							<div className="flex items-center gap-3 pt-1">
								<div className="h-px flex-1 bg-gray-200" />
								<span className="text-xs text-gray-400">OR</span>
								<div className="h-px flex-1 bg-gray-200" />
							</div>

							<div className="text-center text-sm text-gray-500 space-y-1">
								<p>
									Don’t have an account?{" "}
									<Link to="/register" className="text-blue-500 font-medium hover:underline">
										Sign up here
									</Link>
								</p>
								<p>
									<a href="#" className="text-blue-500 hover:underline">
										Forgot your password?
									</a>
								</p>
							</div>

							<div className="text-center pt-2">
								<Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
									← Back to Home
								</Link>
							</div>
						</form>
					</div>
				</div>
			</main>

			<footer className="pb-4 text-center text-xs text-gray-500">
				© 2026 Local Event Helper. All rights reserved.
			</footer>
		</div>
	);
}