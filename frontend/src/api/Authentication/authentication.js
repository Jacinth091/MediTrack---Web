import axios from 'axios';
import { toast } from 'react-toastify';
import { showToast } from '../../utils/alertHelper.js';
import backendConnection from '../backend.js';

export const register = async(formData) => {
  try {
    const response = await axios.post(
      `${backendConnection()}/api/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    ); 
    if(response.status === 201){
      toast.success(response.data.message)
      return true;
    }
    else {
      console.log("Error in getting data from Client: ", response.data.message);
      toast.error(response.data.message)
    }
  } catch (error) {
    console.error("Error: ", error.response.data.message);
    toast.error(error.response.data.message)
    return null;
  }
} 


export const login = async (formData)=>{
  try {
    const response = await axios.post(
      `${backendConnection()}/api/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if(response.status === 200){
      showToast("success", response.data.message);
      return response.data;
    }else{
      toast.error(response.data.message);
      console.log("Error in getting data from the client! ", response.data.message);
      return false;
    }

  } catch (error) {
    toast.error(error.response.data.message)
    console.error("Error: ", error.response.data.message);
    return null;
  }
}