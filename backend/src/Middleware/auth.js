import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

const auth = async (req,res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];


  if(!token){
    return res.status(401).json({
      success:false,
      message: "Access Denied! No Token Provided!"})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const userInfo = await User.findById(decoded.id)
    .select("-password")

    if(!userInfo) return res.status(404).json({success: false, message: 'Error 404. User Not Found!'});
    req.user = {
      id: userInfo._id,
      firstName: userInfo.personalDetails.firstName,
      middleName: userInfo.personalDetails.middleName || '',
      lastName: userInfo.personalDetails.lastName,
      fullname: userInfo.fullName,
      age: userInfo.age,
      dateOfBirth: userInfo.personalDetails.dateOfBirth,
      formattedDOB: userInfo.formattedDOB,
      email: userInfo.email,
      role: userInfo.roleInfo.role,
      permission: userInfo.roleInfo.permission
    };
    console.log(req.user)
    next()


  } catch (error) {
    if(error.name === 'TokenExpiredError'){
      return res.status(401).json({
        success: false,
        message: "Session Expired! Please login again."
      })
    }
    
    if(error.name === 'JsonWebTokenError'){
      return res.status(403).json({
        success: false,
        message: "Invalid Token!"
      })
    }

    console.error('Authentication Middleware Error: ', error)
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error during authentication!'
    })
  }
}

export default auth;