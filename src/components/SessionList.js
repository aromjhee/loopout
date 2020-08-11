import React, { useState, useEffect } from 'react';
import url from './url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

export default function PieChart() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    (async function fetchSessions() {
      const res = await fetch(url);
      const json = await res.json();
      setSessions(json.sessions);
    })();
  }, [])

  return (
    <div className='row-start-5 row-span-3 text-3xl col-start-1 col-span-3 flex flex-col justify-start'>
      <table className='border-4 border-purple-500 rounded-lg'>
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
            const hours = y[0] === 0 ? '00' : y[0] < 10 ? `${0}${y[0]}` : y[0];
            const minutes = y[1] === 0 ? '00' : y[1] < 10 ? `${0}${y[1]}` : y[1];
            const seconds = y[2] === 0 ? '00' : y[2] < 10 ? `${0}${y[2]}` : y[2];

            return (
              <tr key={i} className='text-center'>
                <td>{name}</td>
                <td>{`${hours}:${minutes}:${seconds}`}</td>
                <td>
                  <button>
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