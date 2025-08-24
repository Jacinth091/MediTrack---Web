import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="min-h-[10vh] w-full bg-white text-black flex justify-between items-center shadow-md px-4 md:px-8 py-3">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <i className="fas fa-heartbeat text-white text-xl"></i>
          </div>
          <h1 className="text-2xl font-bold text-blue-800">MediTrack</h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-5 items-center">
        <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
          Home
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
          About
        </Link>
        <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
          Services
        </Link>
        <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
          Contact
        </Link>
        
        <div className="flex gap-3 ml-4">
          <Link to="/login">
            <button className="px-4 py-2 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 hover:text-blue-600 focus:outline-none"
        >
          {isMenuOpen ? (
            <i className="fas fa-times text-xl"></i>
          ) : (
            <i className="fas fa-bars text-xl"></i>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
              >
                <button className="w-full py-2 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                  Login
                </button>
              </Link>
              <Link 
                to="/signup" 
                onClick={() => setIsMenuOpen(false)}
              >
                <button className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 