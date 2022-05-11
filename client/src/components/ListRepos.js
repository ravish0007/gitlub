import { useState } from 'react'

import Repo from './Repo'

export default function ListRepos ({ repos }) {
  return (
    <div>
      {repos.map(repo => {
        return <Repo repo={repo} />
      })}
    </div>
  )
}
