import React from 'react'
import SelectField from '../components/SelectField';
import InputField from '../components/InputField';

export default function SignUp() {
  const inputClasses = "w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-black";
  const sectionClasses = "space-y-4 p-4 bg-[#3A5E74] rounded-xl text-left";

  return (
    <div className='flex flex-col items-center bg-black min-h-screen text-white p-4 space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl'>
        {/* Personal Info Section */}
        <div className={sectionClasses}>
          <InputField label="Last Name" type="text" className={inputClasses} />
          <InputField label="First Name" type="text" className={inputClasses} />
          <InputField label="Middle Name" type="text" className={inputClasses} />
        </div>

        <div className={sectionClasses}>
          <InputField label="Date of Birth" type="date" className={inputClasses} />
          <SelectField label="Gender" options={["Male", "Female"]} className={inputClasses} />
          <SelectField 
            label="Position/Role" 
            options={["Doctor", "Nurse", "Administrator", "Other"]} 
            className={inputClasses} 
          />
        </div>

        {/* Contact & Auth Section */}
        <div className={sectionClasses}>
          <InputField label="Email" type="email" className={inputClasses} />
          <InputField label="Contact Number" type="tel" className={inputClasses} />
          <InputField label="Medical License No." type="text" className={inputClasses} />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl'>
        <div className={sectionClasses}>
          <SelectField 
            label="Specialization" 
            options={["Cardiology", "Neurology", "Pediatrics", "General"]} 
            className={inputClasses} 
          />
        </div>

        <div className={sectionClasses}>
          <InputField label="Password" type="password" className={inputClasses} />
          <InputField label="Confirm Password" type="password" className={inputClasses} />
        </div>
      </div>

      <button className="bg-blue-500 hover:bg-blue-600 rounded-md px-6 py-2 cursor-pointer transition">
        Register
      </button>
    </div>
  )
}
