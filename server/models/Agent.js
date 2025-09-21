import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    name : {type: String, required : true},
    email : {type: String, required : true, unique: true},
    password : {type: String, required : true},
    mobile : {type : Number, required: true},
})

const Agent =  mongoose.model("Agent", agentSchema);

export default Agent;