const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./config/db");
const authRoutes = require("./routes/index");
const businessRoutes = require("./routes/business");
const customerRoutes = require("./routes/customer");
const { initializeSocket } = require("./socket");


dotenv.config();
connect();

const app = express();
const PORT = 5000;


app.use(cors({
    origin: "https://bookingapp-client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.options("*", cors()); 

app.use(express.json());


app.use("/auth", authRoutes);
app.use("/business", businessRoutes);
app.use("/customer", customerRoutes);


app.get("/", (req, res) => {
    res.send("API is working!");
});


const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

initializeSocket(server);
