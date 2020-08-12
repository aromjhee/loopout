import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import SessionList from './SessionList';
import url from './url';

export default function Timer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  function timeDisplay(s) {
    return s === 0 ? '00' : s < 10 ? `${0}${s}` : s;
  }

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

  useEffect(() => {
    (async function fetchSessions() {
      const res = await fetch(url);
      const json = await res.json();
      const { duration } = json.sessions[0]
      const [ hours, minutes, seconds ] = duration.split(':')
      setHours(parseInt(hours, 10))
      setMinutes(parseInt(minutes, 10))
      setSeconds(parseInt(seconds, 10))
    })();
  }, [])

  return (
    <div className='h-screen grid grid-rows-8 grid-cols-3'>
      <PieChart />
      <div className='row-start-3 row-span-1 col-start-1 col-span-3 text-4xl flex flex-col justify-evenly align-center items-center'>
        <div className='text-6xl w-335px p-8 border-blue-400 border-8 rounded-full'>
          {timeDisplay(hours)}:
          {timeDisplay(minutes)}:
          {timeDisplay(seconds)}
        </div>
        <div className='flex m-16'>
          <button
            className='text-4xl mx-16 px-5 py-2 border-green-800 border-8 rounded-lg'
            onClick={() => setIsRunning(true)}>Start</button>
          <button
            className='text-4xl mx-16 px-5 py-2 border-red-400 border-8 rounded-lg'
            onClick={() => setIsRunning(false)}>Stop</button>
        </div>
      </div>
      <div className='row-start-4 row-span-4 col-start-1 col-span-3'>
        <SessionList />
      </div>
    </div>
  )
}