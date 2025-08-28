import '@fontsource/poppins/400.css'; // Normal weight
import '@fontsource/poppins/700.css'; // Bold weight
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Layout from './components/layout';
import { AuthProvider } from './Context/AuthProvider';
import AddPatient from './pages/AddPatient';
import LandingPage from './pages/LandingPage';
import PageLayout from './pages/Layout/PageLayout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/Roles/Admin/AdminPanel';
import DoctorPanel from './pages/Roles/Doctor/DoctorPanel';
import NursePanel from './pages/Roles/Nurse/NursePanel';
import ReceptionistPanel from './pages/Roles/Receptionist/ReceptionistPanel';
import StaffDashboard from './pages/Roles/Staff/StaffPanel';
import SignUp from './pages/SignUp';
import Unauthorized from './pages/Unauthorized';
// Add other weights (300, 500, etc.) as needed

function App() {
  const [count, setCount] = useState(0)
  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route element = {<Layout/>}>
          <Route path="/" element = {<LandingPage/>}></Route>
          <Route path="/login" element = {<Login/>}></Route>
          <Route path="/signup" element = {<SignUp/>}></Route>
        </Route>
        
        <Route path='/admin/'  element= {<PageLayout/>}>
          <Route path="dashboard" element = {<AdminPanel/>}/>
          <Route path="user-management" element ={<LandingPage/>}></Route>
          <Route path="role-management"></Route>
          <Route path="logs"></Route>
          <Route path="reports-analytics"></Route>
          <Route path="settings"></Route>
        </Route>


        <Route path='/doctor/' element= {<PageLayout/>}>
          <Route path="dashboard" element = {<DoctorPanel/>}/>
          <Route path="patients"/>
          <Route path="records"/>
          <Route path="appointments"/>
          <Route path="prescriptions"/>
        </Route>
        <Route path='/nurse/'>
          <Route path="dashboard" element = {<NursePanel/>}/>
          <Route path="patients"/>
          <Route path="records"/>                
          <Route path="appointments"/>
        </Route>
        <Route path='/staff/'>
          <Route path="dashboard" element = {<StaffDashboard/>}/>                
          <Route path="patients/"/>
          <Route path="records"/>                 
          <Route path="inventory"/>                
        </Route>
        <Route path='/receptionist/'>
          <Route path="dashboard" element = {<ReceptionistPanel/>}/>
          <Route path="patients/" />
          <Route path="records/"/>
          <Route path="add-patient" element ={<AddPatient/>}/>"   
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>  
  </AuthProvider>
  )
}

export default App
