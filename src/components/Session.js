import React, { useState } from 'react';
import url from './url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlusCircle, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function Session({ sessions, setSessions, loadTimer }) {

  const [sessionName, setSessionName] = useState('')
  const [newHours, setNewHours] = useState(0)
  const [newMinutes, setNewMinutes] = useState(0)
  const [newSeconds, setNewSeconds] = useState(0)

  async function fetchSessionsList() {
    const res = await fetch(url)
    const json = await res.json()
    setSessions(json.sessions)
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
        setSessionName('')
        setNewHours('')
        setNewMinutes('')
        setNewSeconds('')
        fetchSessionsList()
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function deleteSession(id) {
    try {
      const res = await fetch(`${url}${id}/delete`, {
        method: 'DELETE'
      })
      if (res.ok) {
        const sessionClone = sessions.filter(x => x.id !== id)
        setSessions(sessionClone)
        loadTimer(sessionClone)
      }
    } catch(e) {
      console.log(e)
    }
  }


  return (     
    <div className='flex flex-col'>
      <div className='row-start-4 row-span-1 text-3xl col-start-1 col-span-3 flex flex-col items-center'>
        <div className='mb-5'>
          <input
            className='w-custom h-20 text-center bg-custom border border-indigo-400 placeholder-indigo-400 rounded-lg'
            type='text' 
            value={sessionName}
            placeholder='Enter Session Name'
            onChange={e => setSessionName(e.target.value)} />
        </div>
        <div className='flex flex-no-wrap'>
          <div className='flex flex-col'>
            <div className='text-indigo-300 flex justify-center items-end'>Hours</div>
            <div className='flex items-center justify-around h-20 w-64 text-center mx-2 bg-custom border border-indigo-400 rounded-full'>
              <button 
                onClick={() => {
                  if (newHours <= 0) {
                    setNewHours(0)
                  } else {
                    setNewHours(newHours => newHours - 1)
                  }
                }}>
                <FontAwesomeIcon icon={faAngleLeft} size='lg' color='#a3bffa' />
              </button>
              <div className='text-white'>{newHours}</div>
              <button
                onClick={() => {
                  if (newHours >= 24) {
                    setNewHours(24)
                  } else {
                    setNewHours(newHours => newHours + 1)
                  }
                }}>
                <FontAwesomeIcon icon={faAngleRight} size='lg' color='#a3bffa' />
              </button>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='text-indigo-300 flex justify-center items-end'>Minutes</div>
            <div className='flex items-center justify-around h-20 w-64 text-center mx-2 bg-custom border border-indigo-400 rounded-full'>
              <button
                onClick={() => {
                  if (newMinutes <= 0) {
                    setNewMinutes(0)
                  } else {
                    setNewMinutes(newMinutes => newMinutes - 1)
                  }
                }}>
                <FontAwesomeIcon icon={faAngleLeft} size='lg' color='#a3bffa' />
              </button>
              <div className='text-white'>{newMinutes}</div>
              <button
                onClick={() => {
                  if (newMinutes === 59) {
                    setNewHours(newHours => newHours + 1)
                    setNewMinutes(0)
                  } else {
                    setNewMinutes(newMinutes => newMinutes + 1)
                  }
                }}>
                <FontAwesomeIcon icon={faAngleRight} size='lg' color='#a3bffa' />
              </button>
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='text-indigo-300 flex justify-center items-end'>Seconds</div>
            <div className='flex items-center justify-around h-20 w-64 text-center mx-2 bg-custom border border-indigo-400 rounded-full'>
              <button
                onClick={() => {
                  if (newSeconds <= 0) {
                    setNewSeconds(0)
                  } else {
                    setNewSeconds(newSeconds => newSeconds - 1)
                  }
                }}>
                <FontAwesomeIcon icon={faAngleLeft} size='lg' color='#a3bffa' />
              </button>
              <div className='text-white'>{newSeconds}</div>
              <button
                onClick={() => {
                  if (newSeconds === 59) {
                    setNewMinutes(newMinutes => newMinutes + 1)
                    setNewSeconds(0)
                  } else {
                    setNewSeconds(newSeconds => newSeconds + 1)
                  }
                }}>
                <FontAwesomeIcon icon={faAngleRight} size='lg' color='#a3bffa' />
              </button>
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => setNewMinutes(parseInt(newMinutes === '' ? 0 : newMinutes, 10) + 1)}>
            +1m</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => setNewMinutes(parseInt(newMinutes === '' ? 0 : newMinutes, 10) + 3)}>
            +3m</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => setNewMinutes(parseInt(newMinutes === '' ? 0 : newMinutes, 10) + 5)}>
            +5m</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => setNewMinutes(parseInt(newMinutes === '' ? 0 : newMinutes, 10) + 10)}>
            +10m</button>
        </div>
        <div className='mt-10'>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => setNewSeconds(parseInt(newSeconds === '' ? 0 : newSeconds, 10) + 1)}>
            +1s</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => setNewSeconds(parseInt(newSeconds === '' ? 0 : newSeconds, 10) + 5)}>
            +5s</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => setNewSeconds(parseInt(newSeconds === '' ? 0 : newSeconds, 10) + 10)}>
            +10s</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => setNewSeconds(parseInt(newSeconds === '' ? 0 : newSeconds, 10) + 15)}>
            +15s</button>
        </div>
        <div className='my-16'>
          <button
            className='text-center'
            onClick={addSession}>
            <FontAwesomeIcon icon={faPlusCircle} size='2x' color='#4fd1c5' /></button>
        </div>
      </div>
      <table className='row-start-5 row-span-3 text-3xl col-start-1 col-span-3 border-4 border-purple-500 rounded-lg w-screen'>
        <thead className='border-b-4 border-purple-500 text-gray-500'>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sessions.length === 0 ? 
            (
              <tr>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
            ) : 
            (
              sessions.map((x, i) => {
                const y = x.duration.split(':')
                let [a, b, c] = y
                const name = x.name
                const hours = (a === 0 || a === '') ? '00' : a < 10 ? 
                              `${0}${a}` : a;
                const minutes = (b === 0 || b === '') ? '00' : b < 10 ? 
                              `${0}${b}` : b;
                const seconds = (c === 0 || c === '') ? '00' : c < 10 ? 
                              `${0}${c}` : c;

                return (
                  <tr key={i} className='text-center'>
                    <td>{name}</td>
                    <td>{`${hours}:${minutes}:${seconds}`}</td>
                    <td>
                      <button onClick={() => {deleteSession(x.id)}}>
                        <FontAwesomeIcon icon={faMinusSquare} size='2x' color='#fc8181' /></button>
                    </td>
                  </tr>
                )
              })
            )
          }
        </tbody>
      </table>
    </div>
  )
}