import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


export default function LandingPage() {
  return (
    <div className='flex flex-col justify-center items-center bg-amber-100 h-[90vh]'>
      <h1>WELCOME TO MEDITRACK</h1>
      <button className="bg-blue-500 rounded-md p-1 pl-3 cursor-pointer">
          Get Started <FontAwesomeIcon icon={faChevronRight} /> 
      </button>
    </div>
  )
}
