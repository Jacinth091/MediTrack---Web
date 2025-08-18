import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'

export default function layout() {
  return (
    <div className='w-full max-h-min'> 
        <Navbar/>
          {/* <div 
      className="fixed inset-0 -z-10 bg-[url('/images/background.jpg')] bg-cover bg-center"
    ></div>  */}
            <main className='w-full'> 
                <Outlet/>
            </main>
    </div>
  )
}
