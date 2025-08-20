import '@fontsource/poppins/400.css'; // Normal weight
import '@fontsource/poppins/700.css'; // Bold weight
import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Layout from './components/layout';
import LandingPage from './pages/LandingPage';
import PageLayout from './pages/Layout/PageLayout';
import Login from './pages/Login';
import Admin_Dashboard from './pages/Roles/Admin/AdminPanel';
import Doctor_Dashboard from './pages/Roles/Doctor/DoctorPanel';
import Nurse_Dashboard from './pages/Roles/Nurse/NursePanel';
import Receptionist_Dashboard from './pages/Roles/Receptionist/ReceptionistPanel';
import Staff_Dashboard from './pages/Roles/Staff/StaffPanel';
import SignUp from './pages/SignUp';
// Add other weights (300, 500, etc.) as needed

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div> 
          <Router>
            <Routes>
              <Route element = {<Layout/>}>
                <Route path="/" element = {<LandingPage/>}></Route>
                <Route path="/login" element = {<Login/>}></Route>
                <Route path="/signup" element = {<SignUp/>}></Route>
              </Route>
              
              <Route path='/admin/'  element= {<PageLayout/>}>
                <Route path="dashboard" element = {<Admin_Dashboard/>}/>
                <Route path="patients"></Route>
              </Route>
              <Route path='/doctor/' element= {<PageLayout/>}>
                <Route path="dashboard" element = {<Doctor_Dashboard/>}/>                
              </Route>
              <Route path='/nurse/'>
                <Route path="dashboard" element = {<Nurse_Dashboard/>}/>                
              </Route>
              <Route path='/staff/'>
                <Route path="dashboard" element = {<Staff_Dashboard/>}/>                
              </Route>
              <Route path='/receptionist/'>
                <Route path="dashboard" element = {<Receptionist_Dashboard/>}/>
              </Route>
            </Routes>

          </Router>
          <ToastContainer position="top-right" autoClose={3000} />
      </div>
      
    </>
  )
}

export default App
