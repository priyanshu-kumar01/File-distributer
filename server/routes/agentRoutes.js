import express from "express";
import { addAgent, listAgents } from "../controllers/agentController.js";
import { protect } from "../middlewares/auth.js";

const agentRoute = express.Router();

agentRoute.post("/add", addAgent);
agentRoute.get("/list", listAgents);


export default agentRoute;
