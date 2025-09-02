import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Layout from './components/layout';
import { AuthProvider } from './Context/AuthProvider';
import {
  AdminRoute,
  DoctorRoute,
  NurseRoute,
  ProtectedRoute,
  ReceptionistRoute,
  StaffRoute
} from './Context/ProtectedRoute';
import AddPatient from './pages/AddPatient';
import LandingPage from './pages/LandingPage';
import PageLayout from './pages/Layout/PageLayout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/Roles/Admin/AdminPanel';
import AppointmentsPanel from './pages/Roles/AppointmentsPanel';
import DoctorPanel from './pages/Roles/Doctor/DoctorPanel';
import NurseDashboard from './pages/Roles/Nurse/NursePanel';
import Patients from './pages/Roles/Patients';
import PatientsPanel from './pages/Roles/PatientsPanel';
import ReceptionistPanel from './pages/Roles/Receptionist/ReceptionistPanel';
import RecordsPanel from './pages/Roles/RecordsPanel';
import StaffDashboard from './pages/Roles/Staff/StaffPanel';
import SignUp from './pages/SignUp';
import Unauthorized from './pages/Unauthorized';

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
        
        {/* ADMIN ROUTES */}
        <Route path='/admin/' element={
          <ProtectedRoute>
            <PageLayout/>
          </ProtectedRoute>
        }>
          <Route path="dashboard" element = {
            <AdminRoute>
              <AdminPanel/>
            </AdminRoute>
          }/>
          <Route path="user-management" element ={
            <AdminRoute>
              <div>Users</div>
            </AdminRoute>
          }></Route>
          <Route path="role-management" element={
            <AdminRoute>
              <div>Role Management</div>
            </AdminRoute>
          }></Route>
          <Route path="logs" element={
            <AdminRoute>
              <div>Logs</div>
            </AdminRoute>
          }></Route>
          <Route path="reports-analytics" element={
            <AdminRoute>
              <div>Reports & Analytics</div>
            </AdminRoute>
          }></Route>
          <Route path="settings" element={
            <AdminRoute>
              <div>Settings</div>
            </AdminRoute>
          }></Route>
        </Route>


        {/* DOCTOR ROUTES */}
        <Route path='/doctor/' element={
          <ProtectedRoute>
            <PageLayout/>
          </ProtectedRoute>
        }>
          <Route path="dashboard" element = {
            <DoctorRoute>
              <DoctorPanel/>
            </DoctorRoute>
          }/>
          <Route path="patients" element={
            <DoctorRoute>
              <PatientsPanel/>
            </DoctorRoute>
          }/>
          <Route path="records" element={
            <DoctorRoute>
              <RecordsPanel/>
            </DoctorRoute>
          }/>
          <Route path="appointments" element={
            <DoctorRoute>
              <AppointmentsPanel/>
            </DoctorRoute>
          }/>
          <Route path="prescriptions" element={
            <DoctorRoute>
              <div>Prescriptions</div>
            </DoctorRoute>
          }/>
        </Route>
        
        {/* NURSE ROUTES */}
        <Route path='/nurse/' element={
          <ProtectedRoute>
            <PageLayout/>
          </ProtectedRoute>
        }>
          <Route path="dashboard" element = {
            <NurseRoute>
              <NurseDashboard/>
            </NurseRoute>
          }/>                
          <Route path="appointments" element={
            <NurseRoute>
              <AppointmentsPanel/>
            </NurseRoute>
          }/>
          <Route path="patients" element={
            <NurseRoute>
              {/* <PatientsPanel/> */}
              <Patients/>
            </NurseRoute>
          }/>
          <Route path="records" element={
            <NurseRoute>
              <RecordsPanel/>
            </NurseRoute>
          }/>
        </Route>
        
        {/* STAFF ROUTES */}
        <Route path='/staff/' element={
          <ProtectedRoute>
            <PageLayout/>
          </ProtectedRoute>
        }>
          <Route path="dashboard" element = {
            <StaffRoute>
              <StaffDashboard/>
            </StaffRoute>
          }/>                
          <Route path="patients/" element={
            <StaffRoute>
              <PatientsPanel/>
            </StaffRoute>
          }/>
          <Route path="records" element={
            <StaffRoute>
              <RecordsPanel/>
            </StaffRoute>
          }/>                 
          <Route path="inventory" element={
            <StaffRoute>
              <div>Inventory</div>
            </StaffRoute>
          }/>                 
        </Route>
        
        <Route path='/receptionist/' element={
          <ProtectedRoute>
            <PageLayout/>
          </ProtectedRoute>
        }>
          <Route path="dashboard" element = {
            <ReceptionistRoute>
              <ReceptionistPanel/>
            </ReceptionistRoute>
          }/>
          <Route path="appointments/" element = {
            <ReceptionistRoute>
              <AppointmentsPanel/>
            </ReceptionistRoute>
          }/>
          <Route path="patients/" element={
            <ReceptionistRoute>
              <PatientsPanel/>
            </ReceptionistRoute>
          }/>
          <Route path="records/" element={
            <ReceptionistRoute>
              <RecordsPanel/>
            </ReceptionistRoute>
          }/>
          <Route path="add-patient" element ={
            <ReceptionistRoute>
              <AddPatient/>
            </ReceptionistRoute>
          }/>   
        </Route>

        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>  
  </AuthProvider>
  )
}

export default App;