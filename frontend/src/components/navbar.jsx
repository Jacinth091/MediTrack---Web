import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
  initial: { y: '-1vw', opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
        ease: "linear", 
      duration: 0.5,
      delay: 0 // no delay
    }
  }
};

  return (
    <motion.nav 
  className="min-h-[12vh] w-full  bg-gradient-to-r from-blue-50 to-teal-50 text-black flex justify-between items-center shadow-sm px-10 md:px-8 lg:px-21 py-4 border-b border-blue-100"
  initial="initial"
  animate="animate"
  variants={containerVariants}
>
  {/* Logo */}
  <div className="flex items-center">
    <Link to="/" className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
        <i className="fas fa-heartbeat text-white text-xl"></i>
      </div>
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">MediTrack</h1>
        <p className="text-xs text-gray-500 -mt-1 hidden sm:block">Health & Wellness</p>
      </div>
    </Link>
  </div>

  {/* Desktop Navigation */}
  <div className="hidden md:flex items-center gap-1">
    <Link 
      to="/" 
      className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 transition-colors font-medium group relative"
    >
      Home
      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-3/4"></span>
    </Link>
    <Link 
      to="/about" 
      className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 transition-colors font-medium group relative"
    >
      About
      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-3/4"></span>
    </Link>
    <Link 
      to="/services" 
      className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 transition-colors font-medium group relative"
    >
      Services
      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-3/4"></span>
    </Link>
    <Link 
      to="/contact" 
      className="px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 transition-colors font-medium group relative"
    >
      Contact
      <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-3/4"></span>
    </Link>
    
    <div className="flex gap-2 ml-4 pl-4 border-l border-gray-200">
      <Link to="/login">
        <button className="px-4 py-2 rounded-lg text-blue-600 font-medium hover:bg-white transition-all cursor-pointer border border-blue-100 hover:shadow-sm">
          Login
        </button>
      </Link>
      <Link to="/signup">
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium hover:from-blue-700 hover:to-teal-700 transition-all cursor-pointer shadow-md hover:shadow-lg">
          Sign Up
        </button>
      </Link>
    </div>
  </div>

  {/* Mobile menu button */}
  <div className="md:hidden flex items-center">
    <button 
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:text-blue-600 focus:outline-none shadow-sm border border-gray-100"
      aria-label="Toggle menu"
    >
      {isMenuOpen ? (
        <i className="fas fa-times text-lg"></i>
      ) : (
        <i className="fas fa-bars text-lg"></i>
      )}
    </button>
  </div>

  {/* Mobile Navigation */}
  <motion.div 
    className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-white to-blue-50 shadow-lg py-5 px-6 z-50 border-t border-blue-100"
    initial={{ opacity: 0, y: -10 }}
    animate={{ 
      opacity: isMenuOpen ? 1 : 0, 
      y: isMenuOpen ? 0 : -10,
      display: isMenuOpen ? "block" : "none"
    }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex flex-col space-y-1">
      <Link 
        to="/" 
        className="px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium flex items-center"
        onClick={() => setIsMenuOpen(false)}
      >
        <i className="fas fa-home mr-3 text-blue-400 w-5"></i>
        Home
      </Link>
      <Link 
        to="/about" 
        className="px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium flex items-center"
        onClick={() => setIsMenuOpen(false)}
      >
        <i className="fas fa-info-circle mr-3 text-blue-400 w-5"></i>
        About
      </Link>
      <Link 
        to="/services" 
        className="px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium flex items-center"
        onClick={() => setIsMenuOpen(false)}
      >
        <i className="fas fa-concierge-bell mr-3 text-blue-400 w-5"></i>
        Services
      </Link>
      <Link 
        to="/contact" 
        className="px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium flex items-center"
        onClick={() => setIsMenuOpen(false)}
      >
        <i className="fas fa-envelope mr-3 text-blue-400 w-5"></i>
        Contact
      </Link>
      
      <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-100">
        <Link 
          to="/login" 
          onClick={() => setIsMenuOpen(false)}
        >
          <button className="w-full py-3 rounded-lg text-blue-600 font-medium hover:bg-white transition-colors border border-blue-100 flex items-center justify-center">
            <i className="fas fa-sign-in-alt mr-2"></i>
            Login
          </button>
        </Link>
        <Link 
          to="/signup" 
          onClick={() => setIsMenuOpen(false)}
        >
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium hover:from-blue-700 hover:to-teal-700 transition-colors shadow-md flex items-center justify-center">
            <i className="fas fa-user-plus mr-2"></i>
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  </motion.div>
</motion.nav>
  );
} 