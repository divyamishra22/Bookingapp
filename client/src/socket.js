import { io } from "socket.io-client";

const socket = io("https://bookingapp-server-henna.vercel.app", {
  transports: ["websocket"], // Ensure WebSocket connection
  withCredentials: true, // Allow credentials (cookies, auth tokens)
});

export default socket;
