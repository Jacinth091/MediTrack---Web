export const admin_model =(admin)=> {
  return {
    id: admin._id,
    username: admin.username,
    name: admin.personalDetails.firstName + " " + admin.personalDetails.middleName+ " " + admin.personalDetails.lastName,
    email: admin.email,
    role: admin.roleInfo.role,
    permission: admin.roleInfo.permission,
  };
}

export const doctor_model =(doctor)=> {
  return {
    id: doctor._id,
    name: doctor.personalDetails.firstName + " " + doctor.personalDetails.middleName+ " " + doctor.personalDetails.lastName,
    username: doctor.username,
    email: doctor.email,
    department: doctor.roleInfo.department,
    licenseNo: doctor.roleInfo.licenseNo,
    role: doctor.roleInfo.role,
    permission: doctor.roleInfo.permission,
  };
}

export const nurse_model =(nurse)=> {
  return {
    id: nurse._id,
    name: nurse.personalDetails.firstName + " " + nurse.personalDetails.middleName+ " " + nurse.personalDetails.lastName,
    username: nurse.username,
    email: nurse.email,
    department: nurse.roleInfo.department,
    licenseNo: nurse.roleInfo.licenseNo,
    role: nurse.roleInfo.role,
    permission: nurse.roleInfo.permission,
  };
}

export const receptionist_model =(receptionist)=> {
  return {
    id: receptionist._id,
    name: receptionist.personalDetails.firstName + " " + receptionist.personalDetails.middleName+ " " + receptionist.personalDetails.lastName,
    username: receptionist.username,
    email: receptionist.email,
    department: receptionist.roleInfo.department,
    role: receptionist.roleInfo.role,
    permission: receptionist.roleInfo.permission,
  };
}

export const staff_model =(staff)=> {
  return {
    id: staff._id,
    name: staff.personalDetails.firstName + " " + staff.personalDetails.middleName+ " " + staff.personalDetails.lastName,
    username: staff.username,
    email: staff.email,
    department: staff.roleInfo.department,
    role: staff.roleInfo.role,
    permission: staff.roleInfo.permission,
  };
}