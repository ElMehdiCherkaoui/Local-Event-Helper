import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echoClient: Echo<"reverb"> | undefined;

export function getEcho() {
  if (echoClient) return echoClient;

  const token = localStorage.getItem("token");

  echoClient = new Echo<"reverb">({
    broadcaster: "reverb",
    key: "hyahcbdev3kjtvugfjfc",
    wsHost: "127.0.0.1",
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
    enabledTransports: ["ws", "wss"], 
    Pusher,
    authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return echoClient;
}
