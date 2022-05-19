import { useState, useEffect } from 'react'

import Repo from './Repo'
import NewRepo from './NewRepo.js'

import gitlubService from '../gitlubService'

export default function ListRepos ({ repos, setRepos }) {
  const [showRepos, setShowRepos] = useState(true)
  const [user, setUser] = useState('')

  useEffect(() => {
    gitlubService
      .getUser()
      .then((result) => {
        setUser(result.data.name)
      })
      .catch((err) => console.log(JSON.stringify(err)))
  }, [])

  if (!showRepos) {
    return (
      <>
        <NewRepo />
      </>
    )
  }

  return (
    <div className='my-20'>
      <div className='mx-auto'>
        <NewRepo setRepos={setRepos} />
      </div>
      {repos.map((repo) => {
        return <Repo repo={repo} user={user} />
      })}
    </div>
  )
}
