
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js";

export const protect = async (req, res, next)=>{
    let token = req.headers.authorization; 

    try {
        const decorded = jwt.verify(token, process.env.JWT_SECRET);

        const adminId = decorded.id;

        const admin = await Admin.findById(adminId);

        if(!user){
            return res.json({success: false, message: "Not authorized cannot found the jwt token"});
        }

        req.admin = admin;
        next();
    } catch (error) {
        res.status(401).json({success: false, message: "token failed"});
    }
}