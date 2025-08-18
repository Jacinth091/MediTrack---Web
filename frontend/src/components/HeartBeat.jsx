import React from 'react'
import { motion } from 'framer-motion';

export default function HeartBeat() {
    const ecgPath = "M3 12H5L6 8L8 16L10 6L12 18L14 10L16 14L18 8L19 12H21";
  const baselinePath = "M3 12H21";
  return (
    <div>
      <div className="md:w-20 md:h-20 lg:w-xl lg:h-96 relative ">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Static baseline */}
        <path
          d={baselinePath}
          className="stroke-gray-400 stroke-1"
          strokeLinecap="round"
        />
        
        {/* Animated ECG line */}
        <motion.path
          d={ecgPath}
          className="stroke-[#01A79D] stroke-1"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Pulsing dot at the end */}
        <motion.circle
          cx="21"
          cy="12"
          r="2"
          className="fill-[#01A79D]"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        />
      </svg>
      
      {/* Heartbeat effect on the whole container */}
      <motion.div
        className=" absolute inset-0 border-2 border-blue-400 opacity-0 rounded-lg"
        animate={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />
    </div>
    </div>
  )
}
