import { useEffect, useState } from 'react';
import { register } from "../api/Authentication/authentication";
import { fetchDepartmentData } from '../api/department';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Stepper, { Step } from '../components/Stepper';
import { showToast } from '../utils/alertHelper';
import Role from './Role';
import HeartBeat from '../components/HeartBeat';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const inputClasses = "w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-black";
    const sectionClasses = "space-y-4 p-4 bg-[#3A5E74] rounded-xl text-left";
    const [name, setName] = useState();
    const [choose, setChoose] = useState(false);

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
    initial: { y: '0vw', opacity: 0 }, 
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'tween', 
        ease: "linear", 
        duration: 0.75  
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
  const [parsedData, setParsedData] = useState({})
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
      console.log(selectedRole)
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
      const parsedGender = formData.gender.toLowerCase();
      const parsedRole = formData.role.toLowerCase();

      setParsedData({
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstName : formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName || '' ,
        dateOfBirth: formData.dateOfBirth,
        gender: parsedGender,
        contactNumber: formData.contactNumber,
        licenseNo: formData.licenseNo,
        department: formData.department,
        role: parsedRole,
      })

      console.log("Parsed Form Data: ", parsedData)
      const data = await register(parsedData);
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
      console.log(allDepts)
    } catch (error) {
      console.error("Error in fetching Department Data: ", error);
    }
  }

  const handleRoleOptions = (username) => {
    let roleOptions = ["doctor", "nurse", "receptionist", "staff"];
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
     <div className="w-full flex flex-col lg:flex-row justify-center items-center min-h-[85vh] px-4 py-8 ">
         {/* Left Section - Welcome Content */}
         <motion.div 
           className="w-1/2 lg:w-1/2 flex flex-col justify-center items-center mb-10 lg:mb-0 lg:pr-10"
           initial="initial"
           animate="animate"
           variants={secondVariants}
         > 
           <div className="w-full justify-center flex flex-col items-center">
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-lobster bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent text-center leading-tight mb-6">
               Welcome Back to MediTrack 
             </h1>
             <p className="text-lg text-center text-gray-700 max-w-md mb-6">
               Your personal health companion for tracking medications and wellness.
             </p>
             <div className="w-full flex items-center justify-center p-4 rounded-xl">
               <HeartBeat />
             </div>
             
             <div className="mt-8 grid grid-cols-2 gap-3 w-full">
               <div className="flex items-center bg-blue-100 p-3 rounded-lg">
                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                 </div>
                 <span className="text-sm text-blue-700">Medication Reminders</span>
               </div>
               
               <div className="flex items-center bg-teal-100 p-3 rounded-lg">
                 <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center mr-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                   </svg>
                 </div>
                 <span className="text-sm text-teal-700">Health Tracking</span>
               </div>
               
               <div className="flex items-center bg-purple-100 p-3 rounded-lg">
                 <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                   </svg>
                 </div>
                 <span className="text-sm text-purple-700">Appointment Logs</span>
               </div>
               
               <div className="flex items-center bg-rose-100 p-3 rounded-lg">
                 <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center mr-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                   </svg>
                 </div>
                 <span className="text-sm text-rose-700">Health Reports</span>
               </div>
             </div>
           </div>
         </motion.div>
   
   
         {/* Mobile Divider */}
         <div className="w-4/5 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent my-8 lg:hidden"></div>
   

      {/* Right Section - Login Form */}
   
   <div className='w-1/2'>
      {!choose &&(
            <button
            onClick={() => setChoose(true)}
            >
              <Role/>
            </button>
        )}
        {choose &&(
          
          <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
        >
      
          <Step>
            <div>
              <InputField 
                label="Last Name" 
                type="text" 
                className={inputClasses}
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <InputField
                label="First Name" 
                type="text" 
                className={inputClasses}
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
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
          </Step>
          
          <Step>
            <div>
              <InputField 
                label="Date of Birth" 
                type="date" 
                className={inputClasses}
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
              <SelectField 
                label="Gender" 
                options={["Male", "Female"]} 
                className={inputClasses}
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
              <SelectField 
                label="Position/Role" 
                options={handleRoleOptions(formData.username)} 
                className={inputClasses}
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                required
              />
            </div>
          </Step>
          
          <Step>
            <div>
              <InputField 
                label="Contact Number" 
                type="tel" 
                className={inputClasses} 
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
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
          </Step>
          
          <Step>
            <div>
              <SelectField 
                label="Department" 
                options={[...departmentOptions.map(d => d.name)]} 
                className={inputClasses}
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
          </Step>
            <form onSubmit={handleSubmit}>

          <Step>
            <div>
              <InputField 
                label="Username" 
                type="text" 
                className={inputClasses} 
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <InputField 
                label="Email" 
                type="email" 
                className={inputClasses}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <InputField 
                label="Password" 
                type="password" 
                className={inputClasses} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <InputField 
                label="Confirm Password" 
                type="password" 
                className={inputClasses} 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              
              {/* Register button inside the final step */}
              <div className="mt-6 flex justify-center">
                <button 
                  className="bg-blue-500 hover:bg-blue-600 rounded-md px-6 py-2 cursor-pointer transition text-white"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </div>
          </Step>
          </form>
        </Stepper>

        )
        
        }
        </div>
    </div>
      


  )
}
