
import { useState, useEffect } from 'react'

import gitlubService from '../gitlubService'

export default function Login ({ setLoginStatus }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [sshKey, setSshKey] = useState('')

  const [signUp, setSignUp] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => { setSuccess(''); setError('') }, [username, password, sshKey])

  async function handleSubmit (e) {
    e.preventDefault()

    if (signUp) {
      try {
        const result = await gitlubService.registerUser({ username, password, sshKey })
        if (result) {
          setSuccess('Registered!')
          setSignUp(false)
        }
      } catch (error) {
        setError(error.toString())
      }
      return
    }

    try {
      const result = await gitlubService.verifyUser({ username, password })
      if (result) {
        setLoginStatus(true)
        setSuccess('success')
      } else {
        setError('Authentication failed')
      }
    } catch (error) {
      setError(error.toString())
    }
  }

  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto mt-6 sm:px-6 lg:px-8'>
      <div className='max-w-lg mx-auto space-y-4'>

        <svg className='mx-auto' height='70' viewBox='0 0 16 16' version='1.1' width='70' data-view-component='true'>
          <path fillRule='evenodd' d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
        </svg>

        <p className='max-w-md mx-auto mt-4 text-3xl text-center text-gray-900'>{signUp ? 'Welcome to GitLub' : 'Sign in to GitLub'}</p>

        <form className='p-8 mt-6 mb-0 space-y-4 rounded-lg bg-gray-50 border border-gray-200' onSubmit={handleSubmit}>

          <p className='text-center text-red-900'> {error} </p>
          <p className='text-center text-green-500'> {success} </p>
          <div className='space-y-3'>
            <label htmlFor='username' className='text-lg font-medium text-slate-800'>Username or email address</label>
            <input
              type='text'
              id='username'
              className='w-full py-2 px-4 text-lg border border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none'
              autoComplete='off'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='space-y-3'>
            <label htmlFor='password' className='text-lg font-medium text-slate-800'>Password</label>

            <input
              type='password'
              id='password'
              className='w-full py-2 px-4 text-lg border border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {signUp &&
            <div className='space-y-3'>
              <label htmlFor='key' className='text-lg font-medium text-slate-800'>SSH public key</label>

              <textarea
                type='text'
                id='key'
                className='w-full py-2 px-4 text-lg border border-gray-200 rounded-lg focus:border-sky-600 focus:outline-none'
                value={sshKey}
                onChange={(e) => setSshKey(e.target.value)}
              />
            </div>}

          <button type='submit' className='block mt-14 w-full px-5 py-3 text-lg font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg'>
            {signUp ? 'Register' : 'Sign in'}
          </button>
        </form>

        <div className='p-3 border border-gray-200 rounded-lg'>
          <p className='text-center'>
            {signUp ? '' : 'New to GitLub?'}
            <span
              className='hover:underline cursor-pointer text-sky-700'
              onClick={() => setSignUp(!signUp)}
            > {signUp ? 'Log in into existing account' : 'Create a account'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
