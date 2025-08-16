import Department from "../Models/Department.js";
import User from "../Models/User.js";

// Register User Account
export const registerUser = async(req, res) => {
  
  const  
  {
    username,
    password, 
    email,
    firstName,
    lastName,
    middleName,
    dateOfBirth,
    gender,
    contactNumber,
    licenseNo,
    position,
    department,
    role,
  } = req.body;
  try {
    if(!username || !password || !email || !role){
      return res.status(400).json({message: "Required fields are missing! "});
    }
    const departmentDoc = await Department.findOne({
      name: {$regex: `${department}$`, $options: "i"}
    });

    if(!departmentDoc){
      return res.status(400).json({message: "Department not found"})
    }

    const user = new User({
      username,
      password,
      email,
      personalDetails: {
        firstName,
        lastName,
        middleName,
        dateOfBirth,
        gender,
        contactNumber,
      },
      roleInfo:{
        licenseNo,
        position,
        department: departmentDoc._id,
        role,
      },
    });

    await user.save();
    return res.status(201).json({"message": "Account created successfully!"});
  } catch (error) {
    console.error({message: "Error in creating account!", error});
    if(error.name === "ValidationError"){
      return res.status(400).json({message: error.message})
    }
    return res.status(500).json({message: "Internal Server Error!"});
  }

};


