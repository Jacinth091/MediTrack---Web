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
import DoctorPanel from './pages/Roles/Doctor/DoctorPanel';
import NursePanel from './pages/Roles/Nurse/NursePanel';
import ReceptionistPanel from './pages/Roles/Receptionist/ReceptionistPanel';
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
              <div>Patients</div>
            </DoctorRoute>
          }/>
          <Route path="records" element={
            <DoctorRoute>
              <div>Records</div>
            </DoctorRoute>
          }/>
          <Route path="appointments" element={
            <DoctorRoute>
              <div>Appointments</div>
            </DoctorRoute>
          }/>
          <Route path="prescriptions" element={
            <DoctorRoute>
              <div>Prescriptions</div>
            </DoctorRoute>
          }/>
        </Route>
        
        <Route path='/nurse/' element={
          <ProtectedRoute>
            <PageLayout/>
          </ProtectedRoute>
        }>
          <Route path="dashboard" element = {
            <NurseRoute>
              <NursePanel/>
            </NurseRoute>
          }/>
          <Route path="patients" element={
            <NurseRoute>
              <div>Patients</div>
            </NurseRoute>
          }/>
          <Route path="records" element={
            <NurseRoute>
              <div>Records</div>
            </NurseRoute>
          }/>                
          <Route path="appointments" element={
            <NurseRoute>
              <div>Appointments</div>
            </NurseRoute>
          }/>
        </Route>
        
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
              <div>Patients</div>
            </StaffRoute>
          }/>
          <Route path="records" element={
            <StaffRoute>
              <div>Records</div>
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
          <Route path="patients/" element={
            <ReceptionistRoute>
              <div>Patients</div>
            </ReceptionistRoute>
          }/>
          <Route path="records/" element={
            <ReceptionistRoute>
              <div>Records</div>
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