import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

export default function PieChart({ sessions }) {
  const [colors, setColors] = useState([])

  const randomColor = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    return `rgb(${r}, ${g}, ${b})`
  }

  useEffect(() => {
    const colorArr = []
    for (let i = 0; i < sessions.length; i++) {
      colorArr.push(randomColor())
    }
    setColors(colorArr)
  }, [sessions.length])

  const data = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: colors,
    }]
  }

  for (let i = 0; i < sessions.length; i++) {
    let s = sessions[i]
    
    let y = s.duration.split(':')
    let [a, b, c] = y
    let hoursToSec = parseInt(a === '' ? 0 : a, 10) * 60 * 60
    let minutesToSec = parseInt(b === '' ? 0 : b, 10) * 60
    let timeInSec = hoursToSec + minutesToSec + parseInt(c === '' ? 0 : c, 10)
    
    data.labels.push(s.name)
    data.datasets[0].data.push(timeInSec)
    data.datasets[0].backgroundColor.push(randomColor())
  }
  

  return (
    <div className='h-700px flex items-center row-end-3 row-span-3 col-start-1 col-span-3'>
      <Pie 
        data={data}
        options={{ 
          legend: { display: false },
        }} />
    </div>
  )
}