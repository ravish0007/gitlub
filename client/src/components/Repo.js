
import { useState, useEffect } from 'react'

import axios from 'axios'

function gitlog (data, repo) {
  return (
    <>
      <p className='clone'>git clone git@192.168.0.110:{repo}</p>
      <pre className='logs'>
        {data}
      </pre>
    </>
  )
}

export default function Repo ({ repo }) {
  const [show, setShow] = useState(false)
  const [data, setData] = useState(false)

  useEffect(() => {
    axios.get(`http://192.168.0.110:5000/log/${repo}`).then(result => {
      console.log(result)
      setData(result.data.log)
    }).catch(err => console.log(JSON.stringify(err)))
  }, [show])

  return (
    <div>
      <p
        className='repolink'
        onClick={() => setShow(!show)}
      > {repo}
      </p>
      {show && gitlog(data, repo)}
    </div>

  )
}
