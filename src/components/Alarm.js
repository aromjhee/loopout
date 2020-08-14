import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function Alarm({ setShowAlarm }) {

  return (
    <div className='modal bg-black z-10 absolute inset-0 flex justify-center items-center'>
      <div className='bg-gray-900 radius-custom'>
        <button
          className='alarm-bell m-16 p-10 text-6xl '
          onClick={() => setShowAlarm(false)}>
          <FontAwesomeIcon icon={faBell} size='5x' color='orange' />
        </button>
      </div>
    </div>
  )
}