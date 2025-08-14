import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Layout from './components/layout'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

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
              </Route>
            </Routes>
          </Router>
      </div>
      
    </>
  )
}

export default App
