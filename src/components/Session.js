import React, { useState, useEffect } from 'react';
import url from './url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faAngleLeft, faAngleRight, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';

export default function Session({ sessions, setSessions, loadTimer, userId, isLoading }) {
  const [totalTimeInSec, setTotalTimeInSec] = useState(0)
  const [sessionName, setSessionName] = useState('')
  const [newHours, setNewHours] = useState(0)
  const [newMinutes, setNewMinutes] = useState(0)
  const [newSeconds, setNewSeconds] = useState(0)

  async function fetchSessionsList() {
    const res = await fetch(`${url}${userId}`)
    const json = await res.json()
    setSessions(json.sessions)
  }

  async function addSession() {
    try {
      const res = await fetch(`${url}${userId}/add`, {
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
        setNewHours(0)
        setNewMinutes(0)
        setNewSeconds(0)
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

  useEffect(() => {
    if (sessions.length !== 0) {
      const timeInSecArr = sessions.map((x) => {
        const y = x.duration.split(':')
        const [a, b, c] = y
        const hoursToSec = parseInt(a === '' ? 0 : a, 10) * 60 * 60
        const minutesToSec = parseInt(b === '' ? 0 : b, 10) * 60
        return hoursToSec + minutesToSec + parseInt(c === '' ? 0 : c, 10)
      })
      setTotalTimeInSec(timeInSecArr.reduce((acc, curr) => acc + curr))
    }
  }, [sessions])

  const h = Math.floor(totalTimeInSec / 3600)
  const m = Math.floor((totalTimeInSec - h * 60 * 60) / 60)
  const s = totalTimeInSec - h * 60 * 60 - m * 60
  const hToStr = ('0' + h).slice(-2)
  const mToStr = ('0' + m).slice(-2)
  const sToStr = ('0' + s).slice(-2)

  return (     
    <div className='flex flex-col lg:max-w-lg lg:m-auto'>
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
            <button
              className='text-gray-500 text-center px-2 self-center mt-10 border border-indigo-400 rounded-lg'
              onClick={() => setNewHours(0)}>
              Clear Hrs</button>
          </div>
          <div className='flex flex-col'>
            <div className='text-indigo-300 flex justify-center items-end'>Minutes</div>
            <div className='flex items-center justify-around h-20 w-64 text-center mx-2 bg-custom border border-indigo-400 rounded-full'>
              <button
                onClick={() => {
                  if (newMinutes <= 0) {
                    setNewMinutes(0)
                  } else if (newMinutes === 60) {
                    setNewHours(newHours => newHours + 1)
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
            <button
              className='text-gray-500 text-center px-2 self-center mt-10 border border-indigo-400 rounded-lg'
              onClick={() => setNewMinutes(0)}>
              Clear Mins</button>
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
            <button
              className='text-gray-500 text-center px-2 self-center mt-10 border border-indigo-400 rounded-lg'
              onClick={() => setNewSeconds(0)}>
              Clear Secs</button>
          </div>
        </div>
        <div className='mt-10'>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => {
              if (newMinutes >= 59) {
                setNewHours(newHours => newHours + 1)
                setNewMinutes(0)
              } else {
                setNewMinutes(parseInt(newMinutes === '' ? 0 : newMinutes, 10) + 1)
              }
            }}>
            +1m</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => {
              if (newMinutes >= 57) {
                setNewHours(newHours => newHours + 1)
                setNewMinutes(0)
              } else {
                setNewMinutes(parseInt(newMinutes === '' ? 0 : newMinutes, 10) + 3)
              }
            }}>
            +3m</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => {
              if (newMinutes >= 55) {
                setNewHours(newHours => newHours + 1)
                setNewMinutes(0)
              } else {
                setNewMinutes(parseInt(newMinutes === '' ? 0 : newMinutes, 10) + 5)
              }
            }}>
            +5m</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => {
              if (newMinutes >= 50) {
                setNewHours(newHours => newHours + 1)
                setNewMinutes(0)
              } else {
                setNewMinutes(parseInt(newMinutes === '' ? 0 : newMinutes, 10) + 10)
              }
            }}>
            +10m</button>
        </div>
        <div className='mt-10'>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => {
              if (newSeconds >= 59) {
                setNewMinutes(newMinutes => newMinutes + 1)
                setNewSeconds(0)
              } else {
                setNewSeconds(parseInt(newSeconds === '' ? 0 : newSeconds, 10) + 1)
              }
            }}>
            +1s</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => {
              if (newSeconds >= 55) {
                setNewMinutes(newMinutes => newMinutes + 1)
                setNewSeconds(0)
              } else {
                setNewSeconds(parseInt(newSeconds === '' ? 0 : newSeconds, 10) + 5)
              }
            }}>
            +5s</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => {
              if (newSeconds >= 50) {
                setNewMinutes(newMinutes => newMinutes + 1)
                setNewSeconds(0)
              } else {
                setNewSeconds(parseInt(newSeconds === '' ? 0 : newSeconds, 10) + 10)
              }
            }}>
            +10s</button>
          <button
            className='text-gray-500 text-center px-2 mx-5 border border-indigo-400 rounded-lg'
            onClick={() => {
              if (newSeconds >= 45) {
                setNewMinutes(newMinutes => newMinutes + 1)
                setNewSeconds(0)
              } else {
                setNewSeconds(parseInt(newSeconds === '' ? 0 : newSeconds, 10) + 15)
              }
            }}>
            +15s</button>
        </div>
        <div className='my-16'>
          <button
            className='text-center'
            onClick={addSession}>
            <FontAwesomeIcon icon={faPlusSquare} size='3x' color='#4fd1c5' /></button>
        </div>
      </div>
      <div className='row-start-5 row-span-3 text-3xl col-start-1 col-span-3 flex flex-col items-center'>
        <p className='text-4xl text-orange-500 mb-5'>
          {isLoading ? 'Loading...' : sessions.length === 0 ? 
            'Please Add New Session' : 
            `${hToStr}:${mToStr}:${sToStr}`
          }
        </p>
        <table className='border-4 border-purple-500 rounded-lg w-screen'>
          <thead className='border-b-4 border-purple-500 text-gray-500'>
            <tr>
              <th className='w-1/2'>Name</th>
              <th className='w-1/4'>Duration</th>
              <th className='w-1/4'></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? 
              (
                <tr>
                  <td>Loading...</td>
                  <td>Loading...</td>
                </tr>
              ) : sessions.length === 0 ? (
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              ) :
              (
                sessions.map((x, i) => {
                  const y = x.duration.split(':')
                  const [a, b, c] = y
                  const name = x.name
                  const hoursToSec = parseInt(a === '' ? 0 : a, 10) * 60 * 60
                  const minutesToSec = parseInt(b === '' ? 0 : b, 10) * 60
                  const timeInSec = hoursToSec + minutesToSec + parseInt(c === '' ? 0 : c, 10)

                  return (
                    <tr key={i} className='text-center'>
                      <td>{name}</td>
                      <td>
                        <CountUp
                          start={0}
                          end={timeInSec}
                          duration={2.5}
                          formattingFn={num => {
                            const hours = Math.floor(num / 3600)
                            const minutes = Math.floor((num - hours * 60 * 60) / 60)
                            const seconds = num - hours * 60 * 60 - minutes * 60
                            const hoursToStr = ('0' + hours).slice(-2)
                            const minutesToStr = ('0' + minutes).slice(-2)
                            const secondsToStr = ('0' + seconds).slice(-2)
                            return `${hoursToStr}:${minutesToStr}:${secondsToStr}`
                          }} />
                      </td>
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
    </div>
  )
}