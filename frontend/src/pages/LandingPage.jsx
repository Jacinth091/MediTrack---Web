import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import HeartBeat from '../components/HeartBeat';
import { motion } from 'framer-motion';
import Stepper,{Step} from '../components/Stepper';
import DarkVeil from '../components/DarkVeil';

export default function LandingPage() {
const containerVariants = {
  initial: { x: '-10vw', opacity: 0 }, 
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'tween', 
      ease: [0.25, 0.1, 0.25, 1], 
      duration: 0.8  
    }
  }
};
const secondVariants = {
  initial: { x: '0', opacity: 0 }, 
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'tween', 
      ease: [0.25, 0.1, 0.25, 1], 
      duration: 2  
    }
  }
};  
const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 3,
        ease: "easeOut"
      }
    }
  };
  return (
   <div className='flex justify-evenly items-center  min-h-[85vh] '>
      {/* <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <DarkVeil />
      </div> */}
    <motion.div className='flex w-1/2 flex-col justify-center p-12 text-left space-y-6  ml-24'
     initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <h1 className='text-5xl font-bold font-lobster text-gray-900 leading-tight'>
        Welcome to MediTrack
      </h1>
      
      <p className='text-xl font-light text-gray-600 leading-relaxed'>
        The First Blockchain-Encrypted, patient-centric platform that unifies your entire medical journey – across hospitals, labs, and pharmacies – in one click. Unlike traditional EHRs, MediTrack gives you zero-trust encrypted control over who accesses your records – with military-grade security and private keys you hold.
      </p>
      <h1 className=' font-info font-bold text-blue-800'>Your health, our priority</h1>

      {/* <h1 className="font-bold bg-gradient-to-r from-[#144D94] to-yellow-500 text-transparent bg-clip-text">
  Your health, our priority
</h1> */}
      <Link to="/login" className='self-start mt-4'>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-3 transition-all duration-200 flex items-center gap-2 cursor-pointer">
          Get Started <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </button>
      </Link>
    </motion.div>

    <motion.div className='w-1/2 flex justify-center items-center ml-10'
     initial="initial"
      animate="animate"
      variants={secondVariants}
    > 
      <div className='w-full flex items-center justify-center '>
        <HeartBeat />
      </div>
    
    </motion.div>
  </div>
  )
}
