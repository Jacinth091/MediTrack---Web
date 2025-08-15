import React from 'react'

export default function SignUp() {
  return (
    <div className='flex flex-col justify-center items-center bg-amber-100 h-[90vh]'>
      <div className='bg-[#3A5E74] w-200 h-100 rounded-xl'>
          <h1>Sign up</h1>
          <label htmlFor="">Username: </label>
            <input
                type="text"
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Type here..."
            />
            <br />
            <label htmlFor="">First Name:</label>
            <input
                type="text"
                className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="Type here..."
            />
      </div>
      <div>

      </div>
          <button className="bg-blue-500 rounded-md p-1 pl-3 cursor-pointer">
            Register
          </button>
    </div>
  )
}
