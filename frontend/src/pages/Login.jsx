import { useState } from "react";
import { login } from "../api/Authentication/authentication";
import InputField from "../components/InputField";
import { showToast } from "../utils/alertHelper";
import { motion } from "framer-motion";
import HeartBeat from "../components/HeartBeat";


export default function Login() {
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
    initial: { x: '0', opacity: 0 }, 
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: 'tween', 
        ease: [0.25, 0.1, 0.25, 1], 
        duration: 2  
      }
    }
  };  

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.name] : e.target.value});
  }

  const handleSubmit =  async (e) =>{
    e.preventDefault();
    
    try {
      const res = await login(formData);
      if(!res){
        showToast('error', res.message)
      }
      else{
        showToast("success", res.message)
        console.log("Response: ", res)
        if(res.permission === "basic"){
          window.location.href = `/${res.role.toLowerCase()}/dashboard`
          console.log(`/${res.role.toLowerCase()}/dashboard`)
          // navigate(`/${res.role.toLowerCase()}/dashboard`);
        }
        else if(res.role === "admin" && res.permission === "admin"){
          window.location.href = `/${res.role.toLowerCase()}/dashboard`
          console.log(`/${res.role.toLowerCase()}/dashboard`)

        }
        // proceed to another page or navigate chuchu
        // or make the client save the data to use it for later

      }
    } catch (error) {
      console.error("Error in logging in!, ", error);
    }
  }
  return (
    <div className='flex justify-center items-center font-sans min-h-[85vh]'>
       {/* <motion.div className='w-1/2 flex justify-start items-center  '
             initial="initial"
              animate="animate"
              variants={secondVariants}
            > 
              <div className='w-full flex items-center justify-center'>
                <HeartBeat />
              </div>
            
          </motion.div> */}
      <motion.div className= "w-1/2  flex justify-center items-center text-left space-y-6 "
        
           initial="initial"
           animate="animate"
           variants={containerVariants}  
        >
      <form
       onSubmit={handleSubmit}
       className="bg-white shadow-xl rounded-2xl w-1/2 mt-5 p-8"
      >
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Login
              </h1>
        <div className="mb-4">
           <label className="block text-gray-600 font-medium mb-2">
                  Username
                </label>
            <InputField 
              type="username" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              />
    
        </div>
        <div className="mb-6">
            <label className="block text-gray-600 font-medium mb-2">
                  Password
                </label>
           <InputField 
              type="password" 
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"

              />
          </div>
          <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                Login
              </button>
           
        {/* <div className="flex justify-center items-center p-2">
          <button className="px-10 py-3 bg-[#3A5E74] rounded-lg border ring-blue-10"
            type="submit"
            >
            <span className="text-white">
              Login
            </span>
          </button>
        </div> */}
         <p className="text-sm text-gray-500 text-center mt-4">
                Don’t have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
        </form>
      </motion.div>
       
    </div>
  )
}
