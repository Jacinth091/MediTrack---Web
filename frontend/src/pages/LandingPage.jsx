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
    <div className="min-h-[85vh] overflow-hidden">
    <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 min-h-[85vh] mx-auto">
      {/* Text Content Section */}
      <motion.div
        className="flex w-full md:w-1/2 flex-col justify-center p-6 sm:p-10 md:p-12 text-left space-y-6 md:ml-16"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        {/* Badge */}
        <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <i className="fas fa-brain mr-2"></i>
          AI-Powered Healthcare
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Welcome to <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">MediTrack</span>
        </h1>
    
        <p className='text-xl font-light text-gray-700 leading-relaxed'>
          An <span className="font-medium text-blue-600">AI-powered</span>, patient-centric platform that transforms your
          entire medical journey. Our intelligent system provides personalized insights,
          early warning detection, and treatment recommendations – all while maintaining
          the highest standards of privacy and security for your health data.
        </p>
    
        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-robot text-blue-600 text-sm"></i>
            </div>
            <span className="text-gray-700">AI Health Assistant</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-chart-line text-teal-600 text-sm"></i>
            </div>
            <span className="text-gray-700">Predictive Analytics</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-stethoscope text-blue-600 text-sm"></i>
            </div>
            <span className="text-gray-700">Diagnostic Support</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-pills text-teal-600 text-sm"></i>
            </div>
            <span className="text-gray-700">Smart Medication Tracking</span>
          </div>
        </div>
  
        {/* Tagline */}
        <div className="flex items-center mt-2">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-teal-500 rounded-full mr-3"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Intelligent healthcare, personalized for you
          </h2>
        </div>
    
        {/* CTA Button */}
        <Link to="/login" className="self-start mt-6">
          <button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium rounded-xl px-8 py-4 transition-all duration-200 flex items-center gap-3 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
        </Link>
      </motion.div>
    
      {/* Visual Element Section */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center items-center py-10 md:py-0 relative"
        initial="initial"
        animate="animate"
        variants={secondVariants}
      >
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
        
        {/* AI + Heartbeat Visualization */}
        <div className="relative z-10 w-full max-w-md flex items-center justify-center p-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-100">
              {/* AI elements floating around the heartbeat */}
         
              
              {/* HeartBeat Component as the central focus */}
              <div className="relative z-10 w-full ">
                <HeartBeat className="h-40 sm:h-52 md:h-64 lg:h-80 xl:h-96" />
              </div>
   
         
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 hidden lg:block">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center shadow-lg rotate-12">
            <i className="fas fa-microscope text-blue-600 text-2xl"></i>
          </div>
        </div>
        <div className="absolute bottom-20 left-20 hidden lg:block">
          <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center shadow-lg -rotate-12">
            <i className="fas fa-heartbeat text-teal-600 text-2xl"></i>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
  )
}
