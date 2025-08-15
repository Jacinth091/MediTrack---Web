import React from 'react'

export default function InputField({ label, type = "text", ...props }) {
  return (
    <div>
       <div className="space-y-1">
      <label>{label}:</label>
      <input type={type} placeholder="Type here..." {...props} />
    </div>
    </div>
  )
}
