import { useState, useEffect } from 'react'

import axios from 'axios'

import NewRepo from './components/NewRepo'
import ListRepos from './components/ListRepos'

export default function App () {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    axios.get('http://192.168.0.110:5000/repos').then(result => {
      setRepos(result.data.message)
    }).catch(err => console.log(JSON.stringify(err)))
  }, [])

  return (
    <h1 className='text-3xl font-bold underline'>
      <NewRepo setRepos={setRepos} />
      <ListRepos repos={repos} />

    </h1>
  )
}
