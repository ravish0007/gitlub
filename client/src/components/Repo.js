import { useState, useEffect } from 'react'

import Tree from './Tree'
import Code from './Code'

import gitlubService from '../gitlubService'

function viewtree (user, tree, repo, appendPwd, backLevel) {
  return (
    <>
      <p className='p-4 rounded-md bg-gray-100 text-slate-500'>
        git clone {user}@192.168.0.110:{repo}
      </p>



      <div className='rounded-md border border-slate-300'>
        <div
          className='py-2 px-4 text-slate-500 text-2xl  hover:text-sky-600 w-full hover:bg-gray-100'
          onClick={backLevel}
        >
          ..
        </div>
        {Array.isArray(tree)
          ? (
            <Tree content={tree} addPath={appendPwd} />
            )
          : (
            <Code content={tree} />
            )}
      </div>
    </>
  )
}

export default function Repo ({ user, repo }) {
  const [show, setShow] = useState(false)
  const [tree, setTree] = useState([])
  const [pwd, setPwd] = useState('')

  function appendPwd (content) {
    setPwd(pwd === '' ? content : pwd + '/' + content)
  }

  function backLevel () {
    setPwd(pwd.substring(0, pwd.lastIndexOf('/')))
  }

  useEffect(() => {
    if(!show) return

    gitlubService
      .fetchTree(repo, pwd)
      .then((result) => {
        console.log(result.data)
        setTree(result.data.output)
      })
      .catch((err) => console.log(JSON.stringify(err)))
  }, [pwd, show])

  return (
    <div className='w-1/2 mx-auto mt-10 space-y-4'>
      <p
        className='font-bold pointer-cursor text-sky-600 text-2xl hover:underline'
        onClick={() => setShow(!show)}
      >
        {repo}
      </p>
      <div className='border boder-slate-500' />
      {show && viewtree(user, tree, repo, appendPwd, backLevel)}
    </div>
  )
}
