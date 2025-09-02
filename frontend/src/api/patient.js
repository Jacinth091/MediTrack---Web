import axios from 'axios';
import { showToast } from '../utils/alertHelper.js';
import backendConnection from './backend.js';

const token = sessionStorage.getItem("token") || sessionStorage.getItem("Token")
export const addPatient = async(formData) => {
  try {
    const response = await axios.post(
      `${backendConnection()}/api/patient/add-patient`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`
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


export const getAllPatients = async () =>{
  try {
    const response = await axios.get(`${backendConnection()}/api/patients`, {},
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
  )
    if(response.status = 200 && response.data.success){
      showToast('success', response.data.message)
    }else{
      console.log("Error in getting patients!")
      showToast('error', response.data.message)
    }

  } catch (error) {
    console.error("Error Occurred in Getting Patients: ", error.response.data.message)
    showToast('error', error.response.data.messa)
  }
}