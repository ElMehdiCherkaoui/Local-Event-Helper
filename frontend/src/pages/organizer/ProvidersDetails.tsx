import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import OrganizerLayout from "../../layouts/OrganizerLayout";

type ApiServiceItem = {
  id: number;
  provider_id?: number | null;
  title?: string | null;
  description?: string | null;
  price_min?: string | number | null;
  price_max?: string | number | null;
  price_unit?: string | null;
  bookings_count?: number | null;
  provider?: {
    id?: number | null;
    name?: string | null;
    business_name?: string | null;
    city?: string | null;
    bio?: string | null;
  } | null;
};

type Service = {
  name: string;
  price: string;
  details: string;
};



export default function ProvidersDetails() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [providerName, setProviderName] = useState("Provider");
  const [providerCity, setProviderCity] = useState("City not available");
  const [providerBio, setProviderBio] = useState(
    "Professional provider ready to help with your events.",
  );
  const [providerUserId, setProviderUserId] = useState<number | null>(null);
  const [completedEvents, setCompletedEvents] = useState(0);
  const [uiServices, setUiServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProviderData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/search/services",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const allServices = (response.data?.services ?? []) as ApiServiceItem[];
        const selectedService =
          allServices.find((item) => String(item.id) === String(providerId)) ||
          null;

        const selectedProviderId =
          selectedService?.provider?.id || selectedService?.provider_id;

        setProviderUserId(selectedProviderId ? Number(selectedProviderId) : null);

        const providerServices = allServices.filter((item) => {
          if (!selectedProviderId) {
            return item.id === selectedService?.id;
          }

          const itemProviderId = item.provider?.id || item.provider_id;
          return itemProviderId === selectedProviderId;
        });

        setProviderName(selectedService?.provider?.name || "Provider");
        setProviderCity(
          selectedService?.provider?.city || "City not available",
        );
        setProviderBio(
          selectedService?.description ||
            "Professional provider ready to help with your events.",
        );
        setCompletedEvents(selectedService?.bookings_count ?? 0);

        const mappedServices = providerServices.map((item, index) => ({
          name: item.title || `Service ${index + 1}`,
          price: item.price_min ?? "Price on request" + (item.price_unit ? ` / ${item.price_unit}` : ""),
          details: item.description || "No details yet",
        }));

        setUiServices(mappedServices);
      } catch (err: any) {
        setError("Failed to load provider details.");
      } finally {
        setLoading(false);
      }
    };

    loadProviderData();
  }, [providerId]);

  const startConversation = async () => {
    const token = localStorage.getItem("token");

    if (!token || !providerUserId) {
      setError("Unable to open conversation.");
      return;
    }

    let organizerId: number | null = null;

    try {
      const userText = localStorage.getItem("user");
      if (userText) {
        const parsed = JSON.parse(userText);
        const parsedId = Number(parsed?.id);
        organizerId = Number.isNaN(parsedId) ? null : parsedId;
      }
    } catch {
      organizerId = null;
    }


    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/conversations",
        {
          organizer_id: organizerId,
          provider_id: providerUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const conversationId = Number(response.data?.conversation?.id);
      if (!Number.isNaN(conversationId) && conversationId > 0) {
        navigate(`/organizer/messages?conversationId=${conversationId}`);
        return;
      }

      navigate("/organizer/messages");
    } catch {
      setError("Failed to open conversation.");
    }
  };

  return (
    <OrganizerLayout
      title="Provider Profile"
      subtitle={`View provider details and work history`}
    >
      <div className="space-y-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-3">
            <Link
              to="/organizer/providers"
              className="rounded-md px-2 py-1 text-slate-500 transition hover:bg-slate-100"
            >
              ←
            </Link>
            <p className="text-sm text-slate-500">Back to providers</p>
          </div>

          {loading ? (
            <p className="mt-4 text-sm text-slate-500">Loading provider...</p>
          ) : null}
          {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="h-24 w-24 rounded-xl bg-blue-600" />
            <div className="flex-1">
              <h3 className="text-4xl font-semibold text-slate-900">
                {providerName}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                <span className="text-amber-500"></span> 4.8/5 (45 reviews)
                &nbsp; {completedEvents}+ completed events
              </p>
              <p className="mt-2 text-sm text-slate-500"> {providerCity}</p>
              <p className="mt-3 text-sm text-slate-600">{providerBio}</p>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={startConversation}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <h4 className="text-2xl font-semibold text-slate-900">
            Services & Pricing
          </h4>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {(uiServices.length > 0
              ? uiServices
              : [
                  {
                    name: "Service",
                    price: "Price on request",
                    details: "No details yet",
                  },
                ]
            ).map((service) => (
              <div
                key={service.name}
                className="rounded-xl border border-slate-200 p-3"
              >
                <p className="text-sm font-semibold text-slate-800">
                  {service.name}
                </p>
                <p className="mt-1 text-2xl font-bold text-blue-600">
                  {service.price}
                </p>
                <p className="mt-1 text-xs text-slate-500">{service.details}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </OrganizerLayout>
  );
}
