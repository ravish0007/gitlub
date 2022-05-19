import { useState } from 'react'

import gitlubService from '../gitlubService'

export default function NewRepo ({ setRepos }) {
  const [newRepo, setNewRepo] = useState('')

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
    <div className='mt-10'>
      <form
        onSubmit={(e) => {
          handleClick(e)
        }}
        className='space-x-4 w-1/2 mx-auto'
      >
        <input
          className='p-2 border-2 rounded-md border-slate-300 focus:outline-none focus:border-sky-600'
          type='text'
          placeholder='Repository name'
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
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
