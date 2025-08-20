import { useEffect, useState } from 'react';
import { register } from "../api/Authentication/authentication";
import { fetchDepartmentData } from '../api/department';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import { showToast } from '../utils/alertHelper';

export default function SignUp() {
    const inputClasses = "w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-black";
    const sectionClasses = "space-y-4 p-4 bg-[#3A5E74] rounded-xl text-left";
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName : "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    licenseNo: "",
    department: "",
    role: "",

  })
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = async(e) => {
    const selectedRole = e.target.value;
    setFormData({...formData, role: selectedRole})
    if(!selectedRole) return;
    try {
      const filtered = allDepartments
      .filter(d=> d.allowedRoles.includes(selectedRole) )
      .map(d=> ({id: d._id, name: d.name}))
      console.log("Filtered Departments: ", filtered)
      const capitalized = filtered.map(dept => ({
        id: dept.id,
        value: dept.name, 
        name: dept.name.charAt(0).toUpperCase() + dept.name.slice(1) 
      }));
      setDepartmentOptions(capitalized);
    } catch (error) {
      console.error("Error in mapping department!");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh
    try {
      console.log("Formdata", formData)
      const data = await register(formData);
      if(!data)showToast("error", "An error occurred");
    } catch (error) {
      showToast("error", error);
      console.error("Error submitting form:", error);
    }
  };

  const fetchData = async() =>{
    try {
      const allDepts = await fetchDepartmentData();
      setAllDepartments(allDepts)
    } catch (error) {
      console.error("Error in fetching Department Data: ", error);
    }
  }

  const handleRoleOptions = (username) => {
    let roleOptions = ["Doctor", "Nurse", "Receptionist", "Staff"];
    const isAdmin = /^[A-Za-z0-9]+-admin$/;
    try {
      if(isAdmin.test(username)){
        roleOptions = ["Admin"];
      }
    } catch (error) {
      console.error("Error in getting roles: ", error)
    }
    return roleOptions;
    
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='flex flex-col items-center bg-black min-h-screen text-white p-4 space-y-6'>
      <form
        onSubmit={handleSubmit}
      >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl'>
        {/* Personal Info Section */}
        <div className={sectionClasses}>
          <InputField 
            label="Last Name" 
            type="text" 
            className={inputClasses}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
             />
          <InputField
            label="First Name" 
            type="text" 
            className={inputClasses}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            />
          <InputField 
            label="Middle Name"
            type="text"
            className={inputClasses} 
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            />
        </div>

        <div className={sectionClasses}>
          <InputField 
            label="Date of Birth" 
            type="date" 
            className={inputClasses}
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            />
          <SelectField 
            label="Gender" 
            options={["Male", "Female"]} 
            className={inputClasses}
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            />
          <SelectField 
            label="Position/Role" 
            options={handleRoleOptions(formData.username)} 
            className={inputClasses}
            name="role"
            value={formData.role}
            onChange={handleRoleChange} 
          />
        </div>

        {/* Contact & Auth Section */}
        <div className={sectionClasses}>
          <InputField 
            label="Contact Number" 
            type="tel" 
            className={inputClasses} 
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            />
          <InputField 
            label="Medical License No." 
            type="text" 
            className={inputClasses} 
            name="licenseNo"
            value={formData.licenseNo}
            onChange={handleChange}
            />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl'>
        <div className={sectionClasses}>
          <SelectField 
            label="Department" 
            options={departmentOptions.map(d=> d.name)} 
            className={inputClasses}
            name="department"
            value={formData.department}
            onChange={handleChange} 
          />
        </div>

        <div className={sectionClasses}>
          <InputField 
            label="Username" 
            type="username" 
            className={inputClasses} 
            name="username"
            value={formData.username}
            onChange={handleChange}
            />
          <InputField 
            label="Email" 
            type="email" 
            className={inputClasses}
            name="email"
            value={formData.email}
            onChange={handleChange}
             />
          <InputField 
            label="Password" 
            type="password" 
            className={inputClasses} 
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
          <InputField 
            label="Confirm Password" 
            type="password" 
            className={inputClasses} 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            />
        </div>
      </div>

      <button 
        className="bg-blue-500 hover:bg-blue-600 rounded-md px-6 py-2 cursor-pointer transition"
        type='submit'
        >
        Register
      </button>

      </form>

    </div>
  )
}
