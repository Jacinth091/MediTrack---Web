import Department from "../Models/Department.js";

export const fetchDepartmentByRole = async  (req,res) =>{
  try {
    const roleParam = req.params.role.toLowerCase();
    let role;
    switch(roleParam){
      case "doctor": role = "Doctor"; break;
      case "nurse": role = "Nurse"; break;
      case "receptionist": role = "Receptionist"; break;
      case "staff": role = "Staff"; break;
      case "admin": role = "Admin"; break;
      default:
        res.status(400).json({message: "Invalid role!"})
    }
    const departments = await Department.find({allowedRoles: role});

    if(!departments.length) return res.status(404).json({message: "No departments found!"})
    
    return res.status(200).json(departments) 
  } catch (error) {
    console.error("Error in fetching departments: ", error);
    return res.status(500).json({message: "Error fectching departments! ", error});
  }
}

export const getAllDepartment = async  (req,res) =>{
  try {

    const departments = await Department.find();
    if(!departments.length) return res.status(404).json({message: "No departments found!"})
    
    return res.status(200).json(departments) 
  } catch (error) {
    console.error("Error in fetching departments: ", error);
    return res.status(500).json({message: "Error fectching departments! ", error});
  }
}