import axios from 'axios';
import { showToast } from '../utils/alertHelper.js';
import backendConnection from './backend.js';

export const addPatient = async(formData) => {
  try {
    const response = await axios.post(
      `${backendConnection()}/api/patient/add-patient`,
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    ); 
    if(response.status === 201){
      showToast("success", response.data.message)
      return true;
    }
    else {
      console.log("Error in creating patient data!", response.data.message);
      showToast("error", response.data.message)
    }
  } catch (error) {
    console.error("Error Occurred: ", error.response.data.message);
    showToast("error", error.response.data.message)
    return null;
  }
} 