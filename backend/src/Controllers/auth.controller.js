import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
    // Check if fields are null or empty
    if(!username?.trim() || !password?.trim() || !email?.trim() || !role?.trim()){
      return res.status(400).json({message: "Required fields are missing! "});
    }
    if(!firstName?.trim() || !lastName?.trim() ){
      return res.status(400).json({message: "Name Fields are empty"})
    }
    
    if(!department?.trim()){
      return res.status(400).json({message: "Department Field is missing!"})
    }

    // Checks the license number if it is null if the role is doctor or nurse
    if((role ==="doctor" || role === "nurse") && !licenseNo?.trim()){
      return res.status(400).json({message: "License No Field is Missing!"});
    }
    
    if(!licenseNo){
      // licenseNo = null
    }

    // Regex check for names for invalid characters
    const nameRegex = /^[A-Za-z\s'-]+$/;
    if(!nameRegex.test(firstName) || (middleName && !nameRegex.test(middleName)) || !nameRegex.test(lastName)){
      return res.status(400).json({message: "Name Fields contains invalid characters!"})
    }

    // Validate the date of birth of the user
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let initialAge = today.getFullYear() - birthDate.getFullYear();

    if(today.getMonth() < birthDate.getMonth()){
      initialAge--;
    }
    else if(today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()){
      initialAge--;
    }
    
    if(initialAge <= 0)
    {
      return res.status(400).json({message: "Date of birth cannot be today or in the future."})
    }
    else if(initialAge < 18){
      return res.status(400).json({message: "Registration requires a minimum age of 18 years for hospital staff!"})
    }

    //Validates the license number from the client and to the database
    const existingLicenseNo = await User.findOne({
        "roleInfo.role": { $in: ["doctor", "nurse"] },
        "roleInfo.licenseNo": licenseNo
      });

      if (existingLicenseNo) {
        return res.status(409).json({ message: "License number already in use!" });
      }

    // Validates the existing User
    const existingUser = await User.findOne({
      $or: [{username}, {email}]
    }) ;
    if(existingUser) return res.status(409).json({message: "Username or Email already in use!"})
    
    // Validates the email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({message: "Invalid Email Address!"})
    }

    // Find the department in the department schema
    const departmentDoc = await Department.findOne({
      name: {$regex: `${department}$`, $options: "i"}
    });

    if(!departmentDoc){
      return res.status(400).json({message: "Department not found"})
    }
    //Hashes the password using bcrypt
    const hashedPassword = await bcrypt.hash(password,10);

    // Creates new user 
    const user = new User({
      username,
      password : hashedPassword,
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

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
    res.cookie('token', token,{
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none': 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    return res.status(201).json({"message": "Account created successfully!"});
  } catch (error) {
    console.error("Error: ", error);
    if(error.name === "ValidationError"){
      return res.status(400).json({message: error.message})
    }
    return res.status(500).json({message: "Internal Server Error!"});
  }

};

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
      const token = jwt.sign({
        id: user._id,
        role: user.roleInfo.role,
        permission: user.roleInfo.permission
      }, process.env.JWT_SECRET,
        {expiresIn: user.roleInfo.role === "admin" ? '3h' :
        user.roleInfo.role === "doctor" ? '20h' :
        user.roleInfo.role === "nurse" || user.roleInfo.role === "receptionist"  ? '15h' :
        '1h'}
      );


      // console.log("HErrrrreee!");
      // console.log("Token: ", token);

      // res.cookie('token', token , {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      //   maxAge: user.roleInfo.role === "admin" ? 18_000_000 :
      //   user.roleInfo.role === "doctor" ? 72_000_000 :
      //   user.roleInfo.role === "nurse" || user.roleInfo.role === "receptionist"  ? 54_000_000 :
      //   3_600_000
      // });

      return res.status(200).json({
        message: "Success!",
        permission: user.roleInfo.permission,
        role: user.roleInfo.role,
        token: token
      })
    }
  } catch (error) {
    console.log("Error in Auth (Login): ", error);
    return res.status(500).json({message: "Internal Server Error!"});
  }
  
};


export const logoutUser = async (req,res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    
    return res.status(200).json({success: true,message: "User succesfully logged out!"});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message})    
  }
}