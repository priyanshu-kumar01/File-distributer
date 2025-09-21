import express from "express"
// import dotenv from "dotenv"
import "dotenv/config"
import cors from "cors"
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import agentRoute from "./routes/agentRoutes.js";


// dotenv.config();

const app =  express();
connectDB();

// Middlewares
app.use(cors({
  origin: "https://file-distribute.onrender.com",
  credentials: true,
}));
app.use(express.json())


// Dash route

app.get("/",(req,res)=>{res.send("WORKING Fine ")})
app.use("/api/admin", adminRoutes)
app.use("/api/agent", agentRoute);



const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("Server is running on port ", PORT);
})