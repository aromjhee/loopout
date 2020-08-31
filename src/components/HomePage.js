import React from 'react';
import { Link } from 'react-router-dom';

// import image from '../image/home.jpg';

export default function HomePage() {
  // const [showGetStarted, setShowGetStarted] = useState(false)

  // useEffect(() => {

  // })

  return (
    <div className='custom-background-image blur-loading h-screen grid grid-rows-6'>
      <div className='flex justify-center items-end text-5xl row-span-1 font-sans font-bold'>Welcome.</div>
      {/* <div className='flex justify-center items-center text-4xl row-span-1 font-sans font-light letter-spacing'>Give Away Control.</div> */}
      <div className='row-span-1'></div>
      <div className='flex justify-center items-baseline text-5xl row-span-1 font-sans font-thin italic letter-spacing'>
        Create Your 
        <span className='text-5xl glitch-1'>Loop.</span>
      </div>
      <div className='flex justify-center items-center row-span-1'>
        <button className='flex justify-center items-center home-button-style font-mono font-extrabold animate-pulse start-text'>
          <Link to='/loopout'>Start</Link>
        </button>
      </div>
      <div className='row-span-1'></div>
      <div className='row-span-1'></div>
    </div>
  )
}