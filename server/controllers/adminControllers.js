import bcrypt from "bcryptjs"
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken"

// jWt token

const genToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : "30d"
    })
};




export const registerdAdmin = async (req, res)=>{
    const {name, email, password} = req.body;
    try {

        const existing = await Admin.findOne({email});
        if(existing){
            return res.json({success: false, message: "Admin exist"});
        }

        const admin = await Admin.create({name, email, password})

        const token = genToken(admin._id)
        
        res.json({success: true, token})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export  const loginAdmin = async (req,res)=>{
    const {email, password} = req.body;
    try {

        const admin = await Admin.findOne({email});
        if(admin){
            const isMatch = await bcrypt.compare(password, admin.password);

            if(isMatch){
                const token = genToken(admin._id);
                return res.json({success: true, token});
            }
        }

        return res.json({success: false, message: "Invalid email or  password"})


    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const getUser = async (req,res)=>{
    try {
        const admin = req.admin;
        return  res.json({success:true, admin})
    } catch (error) {
        return res.json({success: false, message:error.message})
    }
}