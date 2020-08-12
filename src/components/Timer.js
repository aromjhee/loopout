import React, { useState, useEffect, useCallback } from 'react';
import PieChart from './PieChart';
import Session from './Session';
import url from './url';

export default function Timer() {
  const [sessions, setSessions] = useState([])
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  function timeDisplay(s) {
    return s === 0 ? '00' : s < 10 ? `${0}${s}` : s;
  }

  function toNum(n) {
    return parseInt(n === '' ? 0 : n, 10)
  }

  const loadTimer = useCallback(
    (sessions) => {
      const { duration } = sessions[0]
      const [hours, minutes, seconds] = duration.split(':');

      setHours(toNum(hours))
      setMinutes(toNum(minutes))
      setSeconds(toNum(seconds))
    }, []
  )

  useEffect(() => {
    (async function fetchSessions() {
      const res = await fetch(url);
      const json = await res.json();
      setSessions(json.sessions)
      loadTimer(json.sessions)
    })();
  }, [loadTimer])


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
        if (sessions.length > 0) {
          sessions.shift()
          if (sessions.length === 0) {
            setIsRunning(false)
            clearInterval(id)
          } else {
            loadTimer(sessions)
          }
        }
      }

      return () => clearInterval(id)
    }
  }, [isRunning, hours, minutes, seconds, sessions, loadTimer])

  // useEffect(() => {
  //   if (sessions.length > 0 && sessions[0].duration !== `${hours}:${minutes}:${seconds}`) {
  //     loadTimer(sessions)
  //   }
  // },[sessions, hours, minutes, seconds])

  return (
    <div className='h-screen grid grid-rows-8 grid-cols-3'>
      <PieChart />
      <div className='row-start-3 row-span-1 col-start-1 col-span-3 text-4xl flex flex-col justify-evenly align-center items-center'>
        <div className='custom-animation'>
          <div className='time'>
            {timeDisplay(hours)}:
            {timeDisplay(minutes)}:
            {timeDisplay(seconds)}
          </div>
        </div>
        <div className='flex m-16'>
          <button
            className='text-4xl mx-16 px-5 py-2 border-green-800 border-8 radius-custom'
            onClick={() => setIsRunning(true)}>Start</button>
          <button
            className='text-4xl mx-16 px-5 py-2 border-red-400 border-8 radius-custom'
            onClick={() => setIsRunning(false)}>Stop</button>
        </div>
      </div>
      <div className='row-start-4 row-span-4 col-start-1 col-span-3'>
        <Session sessions={sessions}/>
      </div>
    </div>
  )
}