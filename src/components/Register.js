import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  const register = () => {

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
            <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' id='inline-full-name' type='text' placeholder='email@email.com' />
          </div>
        </div>
        <div className='md:flex md:items-center mb-24'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-password'>
              Password
            </label>
          </div>
          <div className='md:w-2/3'>
            <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' id='inline-password' type='password' placeholder='*********' />
          </div>
        </div>
        <div className='md:flex md:items-center mb-32'>
          <div className='md:w-1/3'>
            <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4' htmlFor='inline-password'>
              Re-Enter Password
            </label>
          </div>
          <div className='md:w-2/3'>
            <input className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500' id='inline-password' type='password' placeholder='*********' />
          </div>
        </div>
        <div className='md:flex md:items-center flex-col'>
          <div className='md:w-2/3 text-red-300 mb-10 flex justify-center'></div>
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