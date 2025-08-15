import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Layout from './components/layout'
import SignUp from './pages/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import '@fontsource/poppins/400.css'; // Normal weight
import '@fontsource/poppins/700.css'; // Bold weight
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
      </div>
      
    </>
  )
}

export default App
