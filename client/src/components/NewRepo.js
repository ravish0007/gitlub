import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import gitlubService from '../gitlubService'

export default function NewRepo ({ setRepos }) {
  const [newRepo, setNewRepo] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    gitlubService
      .newRepo(newRepo.trim())
      .then((x) => {
        setRepos((repos) => [...repos, newRepo].sort())
      })
      .catch((err) => console.log(JSON.stringify(err)))
  }

  return (
    <div className='mt-10 mx-auto w-1/2'>

      <form
        onSubmit={(e) => {
          handleClick(e)
        }}
      >
        <div className='space-y-6 mb-10'>
          <h1 className='text-4xl font-medium text-gray-700'>Create a new repository</h1>
          <p className='text-gray-500'>A repository contains all project files,
            including the revision history.
            <span className='block cursor-pointer text-sky-700 hover:underline'>Import a repository</span>
          </p>
          <div className='border border-solid border-gray-300' />
        </div>

        <div className='space-y-6 mb-10'>
          <div className='space-y-2'>
            <h3 className='text-xl font-semibold text-gray-700'>Repository template</h3>
            <p className='text-gray-500'>Start your repository with a template repository's contents.</p>

            {/* replace with radio */}
            <select className='p-2 rounded-md text-gray-700 bg-gray-100 border-2 border-gray-200'>
              <option value=''>No Template</option>
            </select>
          </div>
          <div className='border border-solid border-gray-300' />
        </div>

        <div className='space-y-6 mb-10'>
          <div className='space-y-3'>
            <div className='space-y-2'>
              <label
                className='text-xl font-semibold text-gray-700'
                htmlFor='repo-name'
              >Repository name <span className='text-red-600'>*</span>
              </label>
              <input
                className='block bg-gray-50 p-2 border-2 rounded-md border-slate-300 focus:outline-none focus:border-sky-600'
                id='repo-name'
                type='text'
                value={newRepo}
                onChange={(e) => setNewRepo(e.target.value)}
              />
              <p className='text-gray-700'>Great repository names are short and memorable.</p>
            </div>

            <div className='space-y-2'>
              <label
                className='text-xl font-semibold text-gray-700'
                htmlFor='description'
              >Description<span className='p-3 text-lg text-gray-500'>(optional)</span>
              </label>
              <input
                className='block w-3/4 p-2 bg-gray-50 border-2 rounded-md border-slate-300 focus:outline-none focus:border-sky-600'
                id='description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className='border border-solid border-gray-300' />
        </div>

        <button
          type='submit'
          className='p-2 text-white rounded-md bg-green-600 hover:bg-green-700'
          value='Create new repository'
        >
          Create new repository
        </button>
      </form>
    </div>
  )
}
