import axios from 'axios';
import { showToast } from '../../utils/alertHelper.js';
import backendConnection from '../backend.js';

export const register = async(formData) => {
  try {
    const response = await axios.post(
      `${backendConnection()}/api/auth/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        },
      }
    ); 
    if(response.status === 201){
      showToast("success", response.data.message);
      return true;
    }
    else {
      console.log("Error in getting data from Client: ", response.data.message);
      showToast("error", response.data.message);

    }
  } catch (error) {
    console.error("Error: ", error.response.data.message);
    showToast("error", error.response.data.message)
    return null;
  }
} 


export const login = async (formData)=>{
  try {
    console.log("Here: ", formData);
    const response = await axios.post(
      `${backendConnection()}/api/auth/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if(response.status === 200){
      sessionStorage.setItem("Token", response.data.token)
      // showToast("success", response.data.message);
      // console.log("session storage token: ", sessionStorage.getItem("Token"))
      return (
        (sessionStorage.getItem("Token") !== "" || sessionStorage.getItem("Token")) !== null && {
          role: response.data.role,
          permission: response.data.permission,
          token: response.data.token,
          message: response.data.message
        }
      );
    }else{
      showToast("error",response.data.message);
      console.log("Error in getting data from the client! ", response.data.message);
      return false;
    }

  } catch (error) {
    showToast("error",error.response.data.message)
    console.error("Error: ", error.response.data.message);
    return null;
  }
}

export const logoutUser = async () =>{
  try {
    const token = sessionStorage.getItem("token") ||sessionStorage.getItem("Token")
    const response = await axios.post(`${backendConnection()}/api/auth/logout`, {}, {
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'applicaiton/json'
      }
    })    

    if(response.status === 200){
      showToast("success", response.data.message)
      return response.data
    }
    else{
      showToast('error', response.data.message)
    }
  } catch (error) {
    console.error("Error: ", error.response.data.message)
    showToast('error', error.reponse.data.message)
  }
}