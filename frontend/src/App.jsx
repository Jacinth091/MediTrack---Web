import '@fontsource/poppins/400.css'; // Normal weight
import '@fontsource/poppins/700.css'; // Bold weight
import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import './App.css'
import Layout from './components/layout'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
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
              
            </Routes>
          </Router>
          <ToastContainer position="top-right" autoClose={3000} />
      </div>
      
    </>
  )
}

export default App
