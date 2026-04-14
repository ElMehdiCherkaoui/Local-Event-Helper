import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"organizer" | "provider">("organizer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!termsAccepted) {
      setError("Please accept the terms to continue.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const roleId = role === "provider" ? 3 : 2;

      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        business_name: businessName || null,
        password,
        password_confirmation: passwordConfirmation,
        role_id: roleId,
        phone: phone || null,
        date_of_birth: dateOfBirth || null,
        bio: bio || null,
        street_address: streetAddress || null,
        city: city || null,
        country: country || null,
        zip_code: zipCode || null,
      });

      const data = response.data;

      if (!data.token || !data.user) {
        setError(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const roleName = data.user.role.name;
      const savedRoleId = data.user.role_id;

      if (roleName === "admin" || savedRoleId === 1) {
        navigate("/admin/dashboard");
        return;
      }

      if (roleName === "provider" || savedRoleId === 3) {
        navigate("/provider/dashboard");
        return;
      }

      navigate("/organizer/dashboard");
    } catch (err: any) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#DBFFE7] flex flex-col">
      <main className="flex items-center justify-center px-4 py-8 ">
        <div className="w-full max-w-md text-center ">
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold text-green-500 ">LEH</h1>
            <p className="text-sm text-gray-500 mt-1">Local Event Helper</p>
          </div>
          <div className="bg-white rounded-lg shadow-md px-6 py-7 text-left">
            <h2 className="text-2xl font-bold text-center mb-6">
              Create Your Account
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <fieldset className="flex flex-col gap-2">
                <legend className="text-sm font-semibold text-gray-700 mb-1">
                  I want to join as:
                </legend>
                <label
                  htmlFor="role-organizer"
                  className="flex items-start gap-3 border border-gray-300 rounded-md px-4 py-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="role"
                    id="role-organizer"
                    value="organizer"
                    checked={role === "organizer"}
                    onChange={() => setRole("organizer")}
                    className="mt-1 text-blue-500 focus:ring-blue-400"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Event Organizer
                    </p>
                    <p className="text-xs text-gray-500">
                      Plan and manage events
                    </p>
                  </div>
                </label>
                <label
                  htmlFor="role-provider"
                  className="flex items-start gap-3 border border-gray-300 rounded-md px-4 py-3 cursor-pointer mt-2"
                >
                  <input
                    type="radio"
                    name="role"
                    id="role-provider"
                    value="provider"
                    checked={role === "provider"}
                    onChange={() => setRole("provider")}
                    className="mt-1 text-blue-500 focus:ring-blue-400"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Service Provider
                    </p>
                    <p className="text-xs text-gray-500">Offer your services</p>
                  </div>
                </label>
              </fieldset>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="business-name"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Business Name
                  </label>
                  <input
                    id="business-name"
                    type="text"
                    placeholder="Your business name"
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="date-of-birth"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="date-of-birth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(event) => setDateOfBirth(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    placeholder="Tell us about you"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Street Address
                  </label>
                  <input
                    id="street-address"
                    type="text"
                    placeholder="123 Main street"
                    value={streetAddress}
                    onChange={(event) => setStreetAddress(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="zip-code"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Zip Code
                  </label>
                  <input
                    id="zip-code"
                    type="text"
                    placeholder="Zip code"
                    value={zipCode}
                    onChange={(event) => setZipCode(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    At least 8 characters
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm password"
                    value={passwordConfirmation}
                    onChange={(event) =>
                      setPasswordConfirmation(event.target.value)
                    }
                    className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    required
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-400"
                />
                <label
                  htmlFor="terms"
                  className="text-xs text-gray-500 leading-5"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-green-600 font-medium hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-green-600 font-medium hover:underline"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {error ? <p className="text-sm text-red-500">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-green-600 py-2.5 text-white font-semibold hover:bg-green-700 transition"
              >
                {loading ? "Loading..." : "Create Account"}
              </button>

              <div className="flex items-center gap-3 pt-1">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-xs text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-green-600 font-medium hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </div>

              <div className="text-center pt-1">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
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
