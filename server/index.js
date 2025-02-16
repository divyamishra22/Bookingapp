const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./config/db");
const authRoutes = require("./routes/index");
const businessRoutes = require("./routes/business");
const customerRoutes = require("./routes/customer");
const { Server } = require("socket.io");

dotenv.config();
connect();

const app = express();
const PORT = 5000;

// ✅ Fix CORS
app.use(cors({
    origin: "https://bookingapp-client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.options("*", cors()); 

app.use(express.json());

// ✅ Apply CORS to Routes
app.use("/auth", authRoutes);
app.use("/business", businessRoutes);
app.use("/customer", customerRoutes);

// ✅ Test API
app.get("/", (req, res) => {
    res.send("API is working!");
});

// ✅ Start server
const server = app.listen(PORT, () => {
    console.log(`webServer running on port ${PORT}`);
});

// ✅ Attach WebSocket to same server
const io = new Server(server, {
    cors: {
        origin: "https://bookingapp-client.vercel.app",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
