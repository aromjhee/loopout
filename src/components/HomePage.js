import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import image from '../image/home.jpg';

export default function HomePage() {
  const [showGetStarted, setShowGetStarted] = useState(false)

  useEffect(() => {
    
  })

  return (
    <div className='custom-background-image h-screen'>
      <button className='text-6xl text-red-100'>
        <Link to='/loopout'>Get Started</Link>
      </button>
    </div>
  )
}