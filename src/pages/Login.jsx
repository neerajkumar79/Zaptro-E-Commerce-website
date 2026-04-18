import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      setSuccess('')
      return
    }

    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userEmail', email)
    onLogin?.(email)
    setError('')
    setSuccess('You are logged in successfully.')
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16'>
      <div className='w-full max-w-md rounded-3xl bg-white p-8 shadow-lg'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500'
              placeholder='you@example.com'
              autoComplete='email'
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full rounded-2xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500'
              placeholder='Enter password'
              autoComplete='current-password'
            />
          </div>

          {error && <p className='text-sm text-red-600'>{error}</p>}
          {success && <p className='text-sm text-green-600'>{success}</p>}

          <button
            type='submit'
            className='w-full rounded-2xl bg-red-500 px-4 py-3 text-white font-semibold transition hover:bg-red-600'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
