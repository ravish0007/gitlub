import { useState, useEffect } from 'react'

import Login from './components/Login'

export default function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])

  if (!isLoggedIn) {
    return (
      <Login
        setLoginStatus={setIsLoggedIn}
      />
    )
  }

  return (
    <h1> logged in </h1>
  )
}
