import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import SessionList from './SessionList';

export default function Timer() {
  const [sessionName, setSessionName] = useState('')
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const hoursDisplay = hours === 0 ? '00' : hours < 10 ? `${0}${hours}` : hours;
  const minutesDisplay = minutes === 0 ? '00' : minutes < 10 ? `${0}${minutes}` : minutes;
  const secondsDisplay = seconds === 0 ? '00' : seconds < 10 ? `${0}${seconds}` : seconds;

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 100)

      if (hours > 0 && minutes === 0 && seconds === 0) {
        setHours(hours - 1)
        setMinutes(59)
        setSeconds(59)
      } else if (hours === 0 && minutes > 0 && seconds === 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      } else if (hours === 0 && minutes === 0 && seconds === 0) {
        clearInterval(id)
      }

      return () => clearInterval(id)
    }
  }, [isRunning, hours, minutes, seconds])

  return (
    <div className='h-screen grid grid-rows-8 grid-cols-3'>
      <PieChart />
      <form className='row-start-3 row-span-1 col-start-1 col-span-3 text-4xl flex flex-wrap justify-evenly items-center divide-x-4 divide-pink-400'>
        <input 
          className='text-center' 
          type='text' value={sessionName} 
          placeholder='Enter Session Name' 
          onChange={e => setSessionName(e.target.value)} />
        <input 
          className='text-center' 
          type='number' 
          value={hours} 
          onChange={e => setHours(e.target.value)} />
        <input 
          className='text-center' 
          type='number' 
          value={minutes} 
          onChange={e => setMinutes(e.target.value)} />
        <input 
          className='text-center' 
          type='number' 
          value={seconds} 
          onChange={e => setSeconds(e.target.value)} />
        <button 
          className='text-center' 
          >Set</button>
      </form>
      <div className='row-start-4 row-span-1 col-start-1 col-span-3 m-auto flex flex-col'>
        <div className='text-6xl p-8 border-blue-400 border-4 rounded-full'>
          {hoursDisplay}:
          {minutesDisplay}:
          {secondsDisplay}
        </div>
        <div className='flex mt-16'>
          <button 
            className='text-4xl p-2 m-auto border-green-800 border-4 rounded-lg'
            onClick={() => setIsRunning(true)}>Start</button>
          <button 
            className='text-4xl p-2 m-auto border-red-400 border-4 rounded-lg'
            onClick={() => setIsRunning(false)}>Stop</button>
        </div>
      </div>
      <SessionList />
    </div>
  )
}