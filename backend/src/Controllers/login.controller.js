import bcrypt from 'bcrypt';
import User from "../Models/User.js";
export const loginUser = async (req, res) => {

  const {username, password} = req.body;
  try {
    if(!username || !password){
      return res.status(400).json({message: "Required Fields are missing!"})
    }
    const user = await User.findOne({username})
    if(!user) return res.status(400).json({message:"Account not Found!"})
    
    const auth = await bcrypt.compare(password, user.password)
    if(!auth){
      return res.status(401).json({message: "Invalid Credentials"})
    }
    else{
      return res.status(200).json({
        message: "Success!",
        user: user
      })
    }
  } catch (error) {
    return res.status(500).json({message: "Internal Server Error!"});
  }
  
};