import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'

export default function layout() {
  return (
<div className='w-full'> 
    <Navbar/>
        <main className='w-full'> 
            <Outlet/>
        </main>
    </div>
  )
}
