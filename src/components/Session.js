import React, { useState } from 'react';
import url from './url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Picker from 'react-mobile-picker';

export default function Session({ sessions, setSessions, loadTimer }) {

  const [sessionName, setSessionName] = useState('')
  const [newHours, setNewHours] = useState('')
  const [newMinutes, setNewMinutes] = useState('')
  const [newSeconds, setNewSeconds] = useState('')
  const [valueGroups, setValueGroups] = useState({
    title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.']
  })
  const [optionGroups, setOptionGroups] = useState({
    title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
  })

  // let hoursPickerOptions = {
  //   '1': 1,
  //   '2': 2,
  //   '3': 3,
  //   '4': 4,
  //   '5': 5,
  //   '6': 6,
  //   '7': 7,
  //   '8': 8,
  //   '9': 9,
  //   '10': 10,
  //   '11': 11,
  //   '12': 12,
  //   '13': 13,
  //   '14': 14,
  //   '15': 15,
  //   '16': 16,
  //   '17': 17,
  //   '18': 18,
  //   '19': 19,
  //   '20': 20,
  //   '21': 21,
  //   '22': 22,
  //   '23': 23,
  //   '24': 24
  // }
  // const hoursPickerOptions = {hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
  // for (let i = 1; i < 25; i++) {
  //   hoursPickerOptions[i] = i
  // }
  // let minAndSecPickerOptions = {}
  // for (let i = 1; i < 61; i++) {
  //   minAndSecPickerOptions[i] = i
  // }

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
        <div className='my-16'>
          <input
            className='w-custom h-20 text-center bg-custom border border-indigo-400 placeholder-indigo-400 rounded-lg'
            type='text' 
            value={sessionName}
            placeholder='Enter Session Name'
            onChange={e => setSessionName(e.target.value)} />
        </div>
        <div className='flex flex-no-wrap'>
          <div className='h-20 text-center mx-2 bg-custom border border-indigo-400 placeholder-indigo-400 rounded-lg'>
            <Picker optionGroups={optionGroups}
              valueGroups={valueGroups} />
          </div>
          {/* <input
            className='h-20 text-center mx-2 bg-custom border border-indigo-400 placeholder-indigo-400 rounded-lg'
            type='number'
            value={newHours}
            placeholder='Hours'
            onChange={e => 
              setNewHours(parseInt(e.target.value === '' ? 0 : e.target.value, 10))} /> */}
          <input
            className='h-20 text-center mx-2 bg-custom border border-indigo-400 placeholder-indigo-400 rounded-lg'
            type='number'
            value={newMinutes}
            placeholder='Minutes'
            onChange={e => 
              setNewMinutes(parseInt(e.target.value === '' ? 0 : e.target.value, 10))} />
          <input
            className='h-20 text-center mx-2 bg-custom border border-indigo-400 placeholder-indigo-400 rounded-lg'
            type='number'
            value={newSeconds}
            placeholder='Seconds'
            onChange={e => 
              setNewSeconds(parseInt(e.target.value === '' ? 0 : e.target.value, 10))} />
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