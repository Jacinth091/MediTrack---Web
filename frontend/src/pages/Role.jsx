import React from 'react'
import { motion } from 'framer-motion'

export default function Role({nurse, doctor, staff, receptionist}) {

    
const containerVariants = {
  initial: { x: '0vw', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
        ease: "linear", 
      duration: 0.7,
      delay: 0 // no delay
    }
  }
};
  const secondVariants = {
    initial: { y: '0vw', opacity: 0 }, 
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'tween', 
        ease: "linear", 
        duration: 0.75  
      }
    }
  };  

  const roles = [
  {
    title: "Nurse",
    description: "Medical care and patient support",
    img: "./images/nurse.png",
    bg: "bg-blue-100",
    icon: null,
  },
  {
    title: "Doctor",
    description: "Medical diagnosis and treatment",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m8-8v16m6-8a6 6 0 01-6 6 6 6 0 01-6-6" />
      </svg>
    ),
    bg: "bg-purple-100",
  },
  {
    title: "Staff",
    description: "Administrative and support personnel",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    bg: "bg-amber-100",
  },
  {
    title: "Receptionist",
    description: "Front desk and appointment management",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    bg: "bg-green-100",
    },
  ];

  const RoleCard = ({ title, description, img, icon, bg }) => (
    <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-[#E1BF36] to-[#336795] hover:shadow-xl duration-300 cursor-pointer hover:scale-105">
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg duration-300">
        <div className={`w-16 h-16 rounded-full ${bg} flex items-center justify-center mb-4`}>
          {img ? <img src={img} alt={title} className="p-3" /> : icon}
        </div>
        <span className="font-semibold text-center text-xl text-gray-800">{title}</span>
        <p className="text-gray-600 text-sm mt-2 text-center">{description}</p>
      </div>
    </div>
  );

  return (
    <div>
       <div className="flex flex-col items-center justify-center p-4">
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-2"
        initial="initial"
        animate="animate"
        variants={secondVariants}
      >
        Choose your role to register
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-8"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        Select the role that best describes your position
      </motion.p>

      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="initial"
        animate="animate"
        variants={secondVariants}
      >
        {roles.map((role, index) => (
          <RoleCard key={index} {...role} />
        ))}
      </motion.div>

      <motion.div
        className="mt-12 text-center max-w-2xl"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        <p className="text-gray-600">
          Not sure which role to select? Contact your administrator for assistance.
        </p>
      </motion.div>
    </div>
    </div>
  )
}
