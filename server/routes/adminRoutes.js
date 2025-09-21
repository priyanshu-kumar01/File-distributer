import express from "express";
import {loginAdmin, getUser, registerdAdmin } from "../controllers/adminControllers.js";
import { protect } from "../middlewares/auth.js";



const adminRoutes = express.Router();

adminRoutes.post("/register", registerdAdmin);
adminRoutes.post("/login", loginAdmin);
adminRoutes.get("/data",protect ,getUser)

export default adminRoutes;
