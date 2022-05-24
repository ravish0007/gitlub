import { useState, useEffect } from 'react'

import {
  Routes, Route, Link
} from 'react-router-dom'

import Login from './components/Login'
import ListRepos from './components/ListRepos'
import NewRepo from './components/NewRepo'
import Repo from './components/Repo'
import Commits from './components/Commits'

import gitlubService from './gitlubService'

export default function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [repos, setRepos] = useState([])

  useEffect(() => {
    gitlubService.getUser().then((result) => {
      setUser(result.data.name)
    })
  }, [])

  useEffect(() => {
    gitlubService.getRepos().then((result) => {
      setRepos(result.data.repositories)
    })
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return <Login setLoginStatus={setIsLoggedIn} />
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<ListRepos repos={repos} setRepos={setRepos} />} />
        <Route path='/new' element={<NewRepo />} />
        <Route path='/tree/:repo' element={<Repo user={user} />} />
        <Route path='/commits/:repo/' element={<Commits />} />
      </Routes>
    </>
  )
}
