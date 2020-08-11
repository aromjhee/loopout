import React, { useState } from 'react';

export default function Timer() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  return (
    <div className='h-screen grid grid-rows-8 grid-cols-3'>
      <div className='row-end-3 row-span-3 m-auto text-6xl col-start-1 col-span-3'>Pie Chart Here</div>
      <div className='row-start-3 row-span-2 col-start-1 col-span-1 m-auto text-4xl'>
        Minutes: {minutes === 0 ? '00' : minutes < 10 ? `${0}${minutes}` : minutes}
      </div>
      <div className='row-start-3 row-span-2 col-start-2 col-span-1 m-auto text-4xl'>
        Seconds: {seconds === 0 ? '00' : seconds < 10 ? `${0}${seconds}` : seconds}
      </div>
      <button className='row-start-3 row-span-2 col-start-3 col-span-1 m-auto text-4xl'>Set</button>
      <div className='row-start-5 row-span-3 m-auto text-6xl col-start-1 col-span-3'>List of Sessions</div>
    </div>
  )
}