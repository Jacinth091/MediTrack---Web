import axios from 'axios';
import backendConnection from './backend.js';

export const fetchDepartmentData = async()=> {
  try {
    const response = await axios.get(
      `${backendConnection()}/api/departments`
    )
    console.log("Data: ",response.data)
    if(response.status === 200)
      return response.data
    else
      console.log("Error in getting data from the Client: ", response.data?.message)
      return [];
  } catch (error) {
    console.error("Error in department route: ", error.response.message);
    return [];
  }
}