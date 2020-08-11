import React, { useState, useEffect } from 'react';
import PieChart from './PieChart';
import SessionList from './SessionList';
import url from './url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default function Timer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const [sessionName, setSessionName] = useState('')
  const [newHours, setNewHours] = useState(0)
  const [newMinutes, setNewMinutes] = useState(0)
  const [newSeconds, setNewSeconds] = useState(0)
  // const [sessions, setSessions] = useState([])

  function timeDisplay(s) {
    return s === 0 ? '00' : s < 10 ? `${0}${s}` : s;
  }

  async function addSession() {
    try {
      const res = await fetch(`${url}add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': sessionName,
          'duration': `${newHours}:${newMinutes}:${newSeconds}`
        })
      })
      if (res.ok) {
        window.location.reload(false)
      }
    } catch(e) {
      console.log(e)
    }
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
        console.log('*******************')
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
      setHours(hours)
      setMinutes(minutes)
      setSeconds(seconds)
    })();
  }, [])

  return (
    <div className='h-screen grid grid-rows-8 grid-cols-3'>
      <PieChart />
      <div className='row-start-3 row-span-1 col-start-1 col-span-3 text-4xl flex flex-col justify-evenly align-center items-center'>
        <div className=''>
          <input 
            className='text-center' 
            type='text' value={sessionName} 
            placeholder='Enter Session Name' 
            onChange={e => setSessionName(e.target.value)} />
        </div>
        <div className='flex justify-evenly'>
          <input 
            className='text-center' 
            type='number' 
            value={newHours} 
            onChange={e => setNewHours(e.target.value)} />
          <input 
            className='text-center' 
            type='number' 
            value={newMinutes} 
            onChange={e => setNewMinutes(e.target.value)} />
          <input 
            className='text-center' 
            type='number' 
            value={newSeconds} 
            onChange={e => setNewSeconds(e.target.value)} />
        </div>
        <div>
          <button 
            className='text-center'
            onClick={addSession}>
              <FontAwesomeIcon icon={faPlusCircle} size='2x' color='gray' /></button>
        </div>
      </div>
      <div className='row-start-4 row-span-1 col-start-1 col-span-3 m-auto flex flex-col'>
        <div className='text-6xl p-8 border-blue-400 border-8 rounded-full'>
          {timeDisplay(hours)}:
          {timeDisplay(minutes)}:
          {timeDisplay(seconds)}
        </div>
        <div className='flex mt-16'>
          <button 
            className='text-4xl px-5 py-2 m-auto border-green-800 border-8 rounded-lg'
            onClick={() => setIsRunning(true)}>Start</button>
          <button 
            className='text-4xl px-5 py-2 m-auto border-red-400 border-8 rounded-lg'
            onClick={() => setIsRunning(false)}>Stop</button>
        </div>
      </div>
      <SessionList />
    </div>
  )
}