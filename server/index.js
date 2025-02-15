const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const connect = require("./config/db");

dotenv.config();
connect();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", ()=>{
    console.log("Hi")
})


const PORT = 5000;
app.listen(5000, ()=>{
    console.log(`server running on ${PORT}`)
})