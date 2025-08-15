import React from 'react'

export default function Login() {
  return (
    <div className='flex flex-col justify-center items-center bg-amber-100 h-[90vh]'>
      <div className='bg-[#3A5E74] w-100 h-100 rounded-xl'>
          <h1>Login</h1>
          <label htmlFor="">Username: </label>
<input
  type="text"
  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
  placeholder="Type here..."
/>      </div>
      <div>

      </div>
          <h1>Login</h1>
          <button className="bg-blue-500 rounded-md p-1 pl-3 cursor-pointer">
            Login
          </button>
    </div>
  )
}
