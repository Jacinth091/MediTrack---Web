import axios from 'axios';
import backendConnection from './backend';

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
      console.log("Success! : ", response.data.message)
      return true;
    }
    else {
      console.log("Error in getting data from Client: ", response.data.message);
    }
  } catch (error) {
    console.error("Error: ", error.response.data.message);
    return null;
  }
} 