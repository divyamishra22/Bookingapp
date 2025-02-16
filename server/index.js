const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const connect = require("./config/db");
const authRoutes = require("./routes/index")
const businesRoutes = require("./routes/business")
const customerRoutes = require("./routes/customer")
const { Server } = require("socket.io");



dotenv.config();
connect();

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(cors({
    origin: "https://bookingapp-client.vercel.app", // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
}));

app.use("/auth", authRoutes);
app.use("/business",businesRoutes )

app.use("/customer",customerRoutes )

app.get("/", ()=>{
    console.log("Hi")
})

const io = new Server(4000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
  });

  let connectedUsers = new Set();

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
  
  


app.listen(5000, ()=>{
    console.log(`server running on ${PORT}`)
})