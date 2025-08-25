import { useEffect, useState } from 'react';
import { register } from "../api/Authentication/authentication";
import { fetchDepartmentData } from '../api/department';
import { motion } from 'framer-motion';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import { showToast } from '../utils/alertHelper';

export default function SignUp() {
    const inputClasses = "w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-black";
    const sectionClasses = "space-y-4 p-4 bg-[#3A5E74] rounded-xl text-left";

const containerVariants = {
  initial: { x: '0vw', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
        ease: "linear", 
      duration: 0.7,
      delay: 0 // no delay
    }
  }
};
  const secondVariants = {
    initial: { y: '-0.5vw', opacity: 0 }, 
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'tween', 
        ease: "linear", 
        duration: 0.35  
      }
    }
  };  

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
    <div className='flex flex-col justify-center items-center min-h-[85vh]   text-black '>
   
      <div className=" flex flex-col items-center justify-center p-4">
        <motion.h1 className="text-3xl font-bold text-gray-800 mb-2"
              initial="initial"
              animate="animate"
              variants={secondVariants}
        >Choose your role to register</motion.h1>
        <motion.p className="text-gray-600 mb-8"
            initial="initial"
              animate="animate"
              variants={containerVariants}
        >Select the role that best describes your position</motion.p>
        
        <motion.div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 s"
                    initial="initial"
                animate="animate"
                variants={secondVariants}
        >
        {/* Nurse Card */}
         <div class="relative p-[2px] rounded-xl bg-gradient-to-r from-[#E1BF36] to-[#336795] hover:shadow-xl duration-300 cursor-pointer hover:scale-105 ">
            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg  duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <img src="./images/nurse.png" alt=""
                className='p-3' />
              </div>
              <span className="font-semibold text-center text-xl text-gray-800">Nurse</span>
              <p className="text-gray-600 text-sm mt-2 text-center">Medical care and patient support</p>
            </div>
          </div>
     
        {/* Doctor Card */}
         <div class="relative p-[2px] rounded-xl bg-gradient-to-r from-[#E1BF36] to-[#336795] hover:shadow-xl duration-300 cursor-pointer hover:scale-105 ">
            <motion.div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg  duration-300 ">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m8-8v16m6-8a6 6 0 01-6 6 6 6 0 01-6-6" />
                </svg>
              </div>
              <span className="font-semibold text-center text-xl text-gray-800"> Doctor</span>
              <p className="text-gray-600 text-sm mt-2 text-center">Medical diagnosis and treatment</p>
            </motion.div>
          </div>
       
          {/* Staff Card */}
          <div class="relative p-[2px] rounded-xl bg-gradient-to-r from-[#E1BF36] to-[#336795] hover:shadow-xl duration-300 cursor-pointer hover:scale-105 ">
            <motion.div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg duration-300 ">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="font-semibold text-center text-xl text-gray-800">Staff</span>
              <p className="text-gray-600 text-sm mt-2 text-center">Administrative and support personnel</p>
            </motion.div>
          </div>
        

       
          {/* Receptionist Card */}
           <div class="relative p-[2px] rounded-xl bg-gradient-to-r from-[#E1BF36] to-[#336795] hover:shadow-xl duration-300 cursor-pointer hover:scale-105 ">
            <motion.div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg duration-300 ">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-semibold text-center text-xl text-gray-800">Receptionist</span>
              <p className="text-gray-600 text-sm mt-2 text-center">Front desk and appointment management</p>
            </motion.div>
           </div>
          
        </motion.div>

            <motion.div className="mt-12 text-center max-w-2xl"
                initial="initial"
              animate="animate"
              variants={containerVariants}
            >
              <p className="text-gray-600">Not sure which role to select? Contact your administrator for assistance.</p>
            </motion.div>
      </div>
      {/* <form
        onSubmit={handleSubmit}
      >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl'> */}
        {/* Personal Info Section */}
        {/* <div className={sectionClasses}>
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
        </div> */}

        {/* Contact & Auth Section */}
        {/* <div className={sectionClasses}>
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
        </div> */}
{/* 
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
      </div> */}

      {/* <button 
        className="bg-blue-500 hover:bg-blue-600 rounded-md px-6 py-2 cursor-pointer transition"
        type='submit'
        >
        Register
      </button>

      </form> */}

    </div>
  )
}
