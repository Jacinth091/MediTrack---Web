import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../api/Authentication/authentication";
import InputField from "../components/InputField";


export default function Login() {
  const inputClasses = "w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-black";
  const sectionClasses = "space-y-4 p-4 bg-[#3A5E74] rounded-xl text-left";

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
        toast.error("Unsuccessful Login");
      }
      else{
        // proceed to another page or navigate chuchu
        // or make the client save the data to use it for later

      }
    } catch (error) {
      console.error("Error in logging in!, ", error);
    }
  }
  return (
    <div className='flex flex-col justify-center items-center bg-amber-100 h-[90vh]'>
      <form onSubmit={handleSubmit}>
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
              label="Password" 
              type="password" 
              className={inputClasses} 
              name="password"
              value={formData.password}
              onChange={handleChange}
              />
        </div>
        <div className="flex justify-center items-center p-2">
          <button className="px-10 py-3 bg-[#3A5E74] rounded-lg border ring-blue-10"
            type="submit"
            >
            <span className="text-white">
              Login
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
