import React from 'react';
import { Link } from 'react-router-dom';

export default function PopUp({ setShowInfo }) {

  return (
    <div className='h-screen grid grid-rows-6'>
      <div className='bg-black z-10 absolute inset-0 flex flex-col justify-center items-center'>
        <p className='text-center text-6xl '>
          Please Change Your Screen to Mobile
        </p>
        <div className='bg-blue-700 radius-custom mt-10'>
          <Link to='/home'>
            <button className='m-4 py-4 px-10 text-5xl'>
              Click when done
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}