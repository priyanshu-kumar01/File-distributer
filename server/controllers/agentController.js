import Agent from "../models/Agent.js";

export const addAgent = async (req, res)=>{
    const {name, email, password, mobile} = req.body;
    try {

        const existing = await Agent.findOne({email});
        if(existing){
            return res.json({success: false, message: "Agent exist"});
        }

        const agent = await Agent.create({name, email, password, mobile})
        
        res.json({
        success: true, 
        message: "Agent created",
        agent: {
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
      }})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}
export const listAgents = async (req, res) => {
  try {
    // find all agents but don’t include password
    const agents = await Agent.find().select("-password"); 
    res.status(200).json({ success: true, agents });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
