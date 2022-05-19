import { useState, useEffect } from 'react'

import Login from './components/Login'
import ListRepos from './components/ListRepos'

import gitlubService from './gitlubService'

export default function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])

  useEffect(() => {
    gitlubService.getRepos().then((result) => {
      setRepos(result.data.repositories)
    })
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return <Login setLoginStatus={setIsLoggedIn} />
  }

  return <ListRepos repos={repos} setRepos={setRepos} />
}
