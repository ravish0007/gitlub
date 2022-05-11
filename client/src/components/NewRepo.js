import { useState } from 'react'
import axios from 'axios'

export default function NewRepo ({ setRepos }) {
  const [newRepo, setNewRepo] = useState('')

  // const handleClick = () => {
  //   fetch('http://192.168.0.110:5000/new', {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'POST',
  //     body: JSON.stringify({ repository: newRepo.trim() })
  //   }).then(response => {
  //     console.log(response)
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // }

  const handleClick = (e) => {
    e.preventDefault()
    axios.post('http://192.168.0.110:5000/new', { repository: newRepo.trim() }).then(x => {
      setRepos(repos => [...repos, newRepo].sort())
    }).catch(err => console.log(JSON.stringify(err)))
  }

  return (
    <form onSubmit={(e) => { handleClick(e) }}>
      <input
        className=''
        value={newRepo}
        onChange={(e) => setNewRepo(e.target.value)}
      />
      <button
        type='submit'
        value='Create new repository'
      >Create new repository
      </button>
    </form>

  )
}
