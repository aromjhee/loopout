import React, { useState, useEffect } from 'react';
import url from './url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

export default function PieChart() {
  const [sessions, setSessions] = useState([])

  const [sessionName, setSessionName] = useState('')
  const [newHours, setNewHours] = useState('')
  const [newMinutes, setNewMinutes] = useState('')
  const [newSeconds, setNewSeconds] = useState('')

  async function fetchSessions() {
    const res = await fetch(url);
    const json = await res.json();
    setSessions(json.sessions);
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
        fetchSessions()
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
      }
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  return (     
    <div className='flex flex-col'>
      <div className='row-start-4 row-span-1 text-3xl col-start-1 col-span-3 flex flex-col items-center'>
        <div className='my-16'>
          <input
            className='text-center bg-custom border border-gray-100 rounded-lg'
            type='text' 
            value={sessionName}
            placeholder='Enter Session Name'
            onChange={e => setSessionName(e.target.value)} />
        </div>
        <div className='flex flex-no-wrap'>
          <input
            className='text-center mx-2 bg-custom border border-gray-100 rounded-lg'
            type='number'
            value={newHours}
            placeholder='Hours'
            onChange={e => setNewHours(parseInt(e.target.value, 10))} />
          <input
            className='text-center mx-2 bg-custom border border-gray-100 rounded-lg'
            type='number'
            value={newMinutes}
            placeholder='Minutes'
            onChange={e => setNewMinutes(parseInt(e.target.value, 10))} />
          <input
            className='text-center mx-2 bg-custom border border-gray-100 rounded-lg'
            type='number'
            value={newSeconds}
            placeholder='Seconds'
            onChange={e => setNewSeconds(parseInt(e.target.value, 10))} />
        </div>
        <div className='my-16'>
          <button
            className='text-center'
            onClick={addSession}>
            <FontAwesomeIcon icon={faPlusCircle} size='2x' color='gray' /></button>
        </div>
      </div>
      <table className='row-start-5 row-span-3 text-3xl col-start-1 col-span-3 border-4 border-purple-500 rounded-lg'>
        <thead className='border-b-4 border-purple-500'>
          <tr>
            <th>Name</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((x, i) => {
            const y = x.duration.split(':')
            const name = x.name
            const hours = (y[0] === 0 || y[0] === '') ? '00' : y[0] < 10 ? 
                          `${0}${y[0]}` : y[0];
            const minutes = (y[1] === 0 || y[1] === '') ? '00' : y[1] < 10 ? 
                          `${0}${y[1]}` : y[1];
            const seconds = (y[2] === 0 || y[2] === '') ? '00' : y[2] < 10 ? 
                          `${0}${y[2]}` : y[2];

            return (
              <tr key={i} className='text-center'>
                <td>{name}</td>
                <td>{`${hours}:${minutes}:${seconds}`}</td>
                <td>
                  <button onClick={() => {deleteSession(x.id)}}>
                    <FontAwesomeIcon icon={faMinusSquare} size='2x' color='red' /></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}