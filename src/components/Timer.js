import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PieChart from './PieChart';
import Session from './Session';
import Alarm from './Alarm';
import url from './url';
// import ps1 from '../sound/ps1.mp3';
import silk from '../sound/iphone_alarm_silk.mp3';
import { Howl } from 'howler';

export default function Timer() {
  const history = useHistory()
  const [sessions, setSessions] = useState([])
  const [restart, setRestart] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [showAlarm, setShowAlarm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const userId = localStorage.getItem('LOOPOUT_USER_ID')

  // ps1.mp3 lasts 15 sec total
  // const sound = new Howl({ 
  //   src: [ps1],
  //   sprite: {
  //     short: [0, 10000]
  //   } 
  // })

  // iphone alarm sound 'silk' 22 sec total
  const sound1 = new Howl({
    src: [silk],
    sprite: {
      short: [0, 5000]
    },
    volume: 0.7
  })

  function timeDisplay(s) {
    return s === 0 ? '00' : s < 10 ? `${0}${s}` : s;
  }

  function toNum(n) {
    return parseInt(n === '' ? 0 : n, 10)
  }

  function playSound(sound) {
    sound.play('short')
  }

  function toggleAnimation() {
    const animationDiv = document.getElementById('animation-div')
    animationDiv.classList.toggle('custom-animation')
    animationDiv.classList.toggle('custom-no-animation')
  }

  function logOut() {
    localStorage.removeItem('LOOPOUT_USER_ID')
    localStorage.removeItem('LOOPOUT_TOKEN')
    history.push('/login')
  }

  const loadTimer = useCallback(
    (sessions) => {
      if (sessions.length === 0) {
        return
      }
      // loads timer for first session
      const { duration } = sessions[0]
      const [hours, minutes, seconds] = duration.split(':');

      setHours(toNum(hours))
      setMinutes(toNum(minutes))
      setSeconds(toNum(seconds))
    }, []
  )

  useEffect(() => {
    if (!userId) {
      history.push('/login')
    } else {
      (async function fetchSessions() {
        const res = await fetch(`${url}${userId}`)
        const json = await res.json()
        setSessions(json.sessions)
        loadTimer(json.sessions)
        setIsLoading(false)
      })();
    }
  }, [loadTimer, userId, history])


  useEffect(() => {
    if (isRunning && !showAlarm) {
      const intervalId = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 25)

      if (hours > 0 && minutes === 0 && seconds === 0) {
        setHours(hours - 1)
        setMinutes(59)
        setSeconds(59)
      } else if (hours === 0 && minutes > 0 && seconds === 0) {
        setMinutes(minutes - 1)
        setSeconds(59)
      } else if (hours === 0 && minutes === 0 && seconds === 0) {
        setShowAlarm(true)
        playSound(sound1)
        const newSessions = sessions.filter((session, i) => i !== 0)
        setSessions(newSessions)
        if (newSessions.length > 0) {
          loadTimer(newSessions)
        } else {
          clearInterval(intervalId)
          setIsRunning(false)
          setRestart(!restart)
        }
      }

      return () => clearInterval(intervalId)
    }
  }, [isRunning, hours, minutes, seconds, sessions, loadTimer, showAlarm, restart, sound1])

    // Alarm Modal with Stop Button
    // < div className = 'modal bg-black z-10 absolute inset-0 flex justify-center items-center' >
    //   <div className='bg-gray-900 radius-custom'>
    //     <div className='m-16 flex flex-col justify-center'>
    //       <h4 className='text-6xl mb-12 p-16'>
    //         <div className='alarm-bell'>
    //           <FontAwesomeIcon icon={faBell} size='5x' color='orange' />
    //         </div>
    //       </h4>
    //       <button
    //         className='mx-16 px-5 py-10'
    //         onClick={() => setShowAlarm(false)}>
    //         <FontAwesomeIcon icon={faStopCircle} size='5x' color='red' />
    //       </button>
    //     </div>
    //   </div>
    // </div >

  return (
    <>
      {
        showAlarm ? (
          <Alarm setShowAlarm={setShowAlarm} />
        ) : null
      }
      <div className='w-screen flex justify-end px-6'>
        <button className='text-yellow-500 text-bold text-3xl mt-12 text-right border border-yellow-200 px-3 rounded-lg' onClick={logOut}>
          Log Out
        </button>
      </div>
      <div className='h-full grid grid-rows-8 grid-cols-3'>
        <PieChart sessions={sessions} />
        <div className='row-start-3 row-span-1 col-start-1 col-span-3 text-4xl flex flex-col justify-evenly align-center items-center'>
          <div className="relative inline-block w-12 align-middle mb-4 select-none transition duration-200 ease-in">
            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-600 border-4 appearance-none cursor-pointer" onClick={toggleAnimation} />
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
          </div>
          <label htmlFor="toggle" className="text-2xl text-white mb-6">Animation</label>
          <div id='animation-div' className='custom-animation'>
            <div className='time'>
              {timeDisplay(hours)}:
              {timeDisplay(minutes)}:
              {timeDisplay(seconds)}
            </div>
          </div>
          <div className='flex mt-16 mb-10'>
            <button
              className='text-4xl mx-16 px-5 py-2 border-green-500 border-8 radius-custom'
              onClick={() => setIsRunning(true)}>Start</button>
            <button
              className='text-4xl mx-16 px-5 py-2 border-red-400 border-8 radius-custom'
              onClick={() => setIsRunning(false)}>Stop</button>
          </div>
        </div>
        <div className='row-start-4 row-span-4 col-start-1 col-span-3'>
          <Session 
            sessions={sessions} 
            setSessions={setSessions} 
            loadTimer={loadTimer}
            userId={userId}
            isLoading={isLoading} />
        </div>
      </div>
    </>
  )
}