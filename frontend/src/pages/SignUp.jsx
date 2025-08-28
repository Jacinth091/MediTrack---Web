import { useEffect, useState } from 'react';
import { register } from "../api/Authentication/authentication";
import { fetchDepartmentData } from '../api/department';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Stepper, { Step } from '../components/Stepper';
import { showToast } from '../utils/alertHelper';

export default function SignUp() {
    const inputClasses = "w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-black";
    const sectionClasses = "space-y-4 p-4 bg-[#3A5E74] rounded-xl text-left";
    const [name, setName] = useState();

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
        licenseNo: formData.licenseNo | '',
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
  <div className='flex flex-col justify-center items-center min-h-[85vh] text-black'>
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
            <h2>Welcome to the registration!</h2>
            <p>Please fill out the following information to create your account.</p>
          </Step>
          
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
    </div>
  )
}
