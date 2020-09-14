import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import url from './url';

export default function LogIn() {
  const history = useHistory()
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  const [error, setError] = useState([])

  const login = async (isDemo=false) => {
    if (isDemo) {
      email = 'test@test.com'
      password = 'asdf'
    }

    try {
      const res = await fetch(`${url}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      })
      if (res.ok) {
        const { access_token, userId } = await res.json()
        localStorage.setItem('LOOPOUT_TOKEN', access_token)
        localStorage.setItem('LOOPOUT_USER_ID', userId)
        history.push('/loopout')
      } else {
        const error = await res.json() 
        setError(Object.values(error))
      }
    } catch(e) {
      console.log(e)
    }
  }

  const userLogin = () => {
    login(false)
  }

  const demoLogin = () => {
    login(true)
  }

  return (
    <div className='bg-custom font-color-custom font-customs h-screen flex flex-col justify-center items-center'>
      {
        error ? (
          error.map((message, i) => (
            <div key={i} className="w-1/2 mb-10 text-3xl bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-4 rounded-lg flex justify-center" role="alert">
              <p className="font-bold">{message}</p>
            </div>
          ))
        ) : null
      }
      <div className='w-5/6 flex justify-center'>
        <form className='w-5/6 text-4xl'>
          <div className='md:flex md:items-center mb-16'>
            <div className='md:w-1/3'>
              <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='email'>
                E-mail
              </label>
            </div>
            <div className='md:w-2/3'>
              <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' id='email' type='email' placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className='md:flex md:items-center mb-24'>
            <div className='md:w-1/3'>
              <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='password'>
                Password
              </label>
            </div>
            <div className='md:w-2/3'>
              <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' id='password' type='password' placeholder='*********' autoComplete='on' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <div className='md:flex md:items-center mb-32 justify-center'>
            <div className='md:w-2/3 flex flex-col justify-center'>
              <button className='shadow bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-full mb-16' type='button' onClick={userLogin}>
                Log-in
              </button>
              <button className='shadow bg-teal-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-full' type='button'
              onClick={demoLogin}>
                Demo Log-in
              </button>
            </div>
          </div>
          <div className='md:flex md:items-center flex-col'>
            <div className='md:w-2/3 text-red-300 mb-10 flex justify-center'>Don't have an account?</div>
            <div className='md:w-2/3 flex justify-center'>
              <Link to='/register'>
                <button className='shadow bg-orange-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-full' type='button'>
                  Register
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}