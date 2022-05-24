import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ListRepos ({ repos, setRepos }) {
  const [filterInput, setFilterInput] = useState('')

  const filteredRepos = filterInput ? repos.filter(repo => repo.startsWith(filterInput)) : repos

  return (
    <div className='my-20 w-1/2 mx-auto'>

      <div className='space-x-2'>
        <input
          className='p-2 border-2 rounded-md border-slate-300 focus:outline-none focus:border-sky-600'
          type='text'
          placeholder='Filter repositories'
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />

        <Link to='/new'>
          <button
            type='submit'
            className='p-2 text-white rounded-md bg-green-600 hover:bg-green-700'
            value='Create new repository'
          >
            New
          </button>
        </Link>

      </div>

      {filteredRepos.map((repo) => {
        return (
          <Link
            className='block text-2xl font-semibold text-blue-600 my-6 p-4 border border-slate-300 rounded hover:underline hover:bg-gray-100'
            to={'/tree/' + repo}
          >
            {repo}
          </Link>
        )
      })}
    </div>
  )
}
