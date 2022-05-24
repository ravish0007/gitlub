import { useEffect, useState } from 'react'
import { useParam, useParams } from 'react-router-dom'

import gitlubService from '../gitlubService'

function Tree () {
  const { repo } = useParams()

  const [commits, setCommits] = useState([])

  useEffect(() => {
    gitlubService.fetchLog(repo).then(result => {
      if (!result.data.log) return

      const commits = result.data.log.split('\n').map(log => {
        const [user, message, time] = log.split('::')
        return [user, message, time]
      })
      setCommits(commits)
    })
  }, [])

  return (

    <div className='mt-20 mx-auto w-fit p-4 border-2 border-gray-500 rounded-md'>
      <table className='border-collapse'>
        <tr>
          <th className='border border-slate-300 p-2'>Author</th>
          <th className='border border-slate-300 p-2'>Commit message</th>
          <th className='border border-slate-300 p-2'>Time</th>
        </tr>
        {commits.map(commit => {
          const [user, message, time] = commit
          return (
            <tr className='border-2 border-slate-300 hover:bg-gray-100'>
              <td className='border border-slate-300 py-2 px-4 font-semibold'>{user}</td>
              <td className='border border-slate-300 p-2 px-4'>{message}</td>
              <td className='border border-slate-300 p-2 px-4 italic'>{time}</td>
            </tr>
          )
        })}
      </table>
    </div>

  )
}

export default Tree
