 import React from 'react'
 import { Link } from 'react-router-dom'
 
 export default function navbar() {
   return (
     <div className='min-h-[10vh] w-full bg-white text-black flex justify-between shadow-xl shadow-'>
      <div className='flex items-center ml-15'>
        <h1>MediTrack</h1>
      </div>
      <div className='flex gap-5 pr-10 items-center'>
        <Link to="/login">
            <button className='cursor-pointer'>Login</button>
        </Link>
         <Link to="/signup">
            <button className='cursor-pointer'>Sign Up</button>
        </Link>
      </div>
      
     </div>
   )
 }
 