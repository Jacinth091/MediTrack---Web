import { useState } from "react";
import { login } from "../api/Authentication/authentication";
import InputField from "../components/InputField";
import { showToast } from "../utils/alertHelper";
import { motion } from "framer-motion";
import HeartBeat from "../components/HeartBeat";
import { Link } from 'react-router-dom';


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
      duration: 0.4,
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
      <motion.div 
        className="w-full lg:w-2/5 flex justify-center items-center"
        initial="initial"
        animate="animate"
        variants={containerVariants}  
      >
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl w-full max-w-md p-6 md:p-8 border border-blue-100 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-200/30"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-teal-200/30"></div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Login to Your Account
            </h1>
            <p className="text-sm text-gray-600 text-center mb-6">
              Enter your credentials to access your health dashboard
            </p>
            
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2">
                Username
              </label>
              <InputField 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <InputField 
                type="password" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center relative overflow-hidden group"
            >
              <span className="relative z-10">Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button
              type="button"
              className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center mb-6 hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
            
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
