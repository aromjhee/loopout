import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import url from './url';

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
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
        const { access_token } = await res.json()
        localStorage.setItem('LOOPOUT_TOKEN', access_token)
        res.redirect('/home')
      }
    } catch(e) {
      console.log(e)
    }
  }

  const demoLogin = () => {
    setEmail('test@test.com')
    setPassword('asdf')
    login()
  }

  return (
    <div className='bg-custom font-color-custom font-customs h-screen flex justify-center items-center'>
      <form className='w-5/6 text-4xl mr-16'>
        <div className='md:flex md:items-center mb-16'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-full-name'>
              E-mail
            </label>
          </div>
          <div className='md:w-2/3'>
            <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' id='inline-full-name' type='text' placeholder='email@email.com' onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className='md:flex md:items-center mb-24'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-password'>
              Password
            </label>
          </div>
          <div className='md:w-2/3'>
            <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' id='inline-password' type='password' placeholder='*********' autoComplete='on' onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className='md:flex md:items-center mb-32 justify-center'>
          <div className='md:w-1/3'></div>
          <div className='md:w-2/3 flex justify-between'>
            <button className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-full' type='button' onClick={() => login()}>
              Login
            </button>
            <button className='shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-full' type='button'
            onClick={() => demoLogin()}>
              Demo Log-in
            </button>
          </div>
        </div>
        <div className='md:flex md:items-center flex-col'>
          <div className='md:w-2/3 text-red-300 mb-10 flex justify-center'>Don't have an account?</div>
          <div className='md:w-2/3 flex justify-center'>
            <Link to='/register'>
              <button className='shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded-full' type='button'>
                Register
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}