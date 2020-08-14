import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function Alarm() {
  function toggleModal() {
    const modal = document.getElementById('modal')
    modal.classList.toggle('flex')
    modal.classList.toggle('hidden')
  }
  
  return (
    <div className="modal bg-black z-10 absolute inset-0 flex justify-center items-center">
      <div className="bg-gray-900 radius-custom">
        <div className="m-16 flex flex-col justify-center">
          <h4 className="text-6xl mb-12 p-16">
            <FontAwesomeIcon icon={faBell} size='5x' color='orange' />
          </h4>
          <button
            className='text-6xl mx-16 px-5 py-10 border-orange-900 border-8 radius-custom'
            onClick={toggleModal}>STOP</button>
        </div>
      </div>
    </div>
  )
}