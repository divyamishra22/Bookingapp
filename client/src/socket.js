import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], // Ensure WebSocket connection
  withCredentials: true, // Allow credentials (cookies, auth tokens)
});

socket.on("connect", () => {
    console.log("Connected to WebSocket:", socket.id);
});

socket.on("connect_error", (err) => {
    console.error("WebSocket Connection Error:", err);
});

export default socket;
