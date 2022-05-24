import { useState, useEffect } from 'react'

import ReactMarkdown from 'react-markdown'

import Tree from './Tree'
import Code from './Code'

import ViewTree from './ViewTree'

import gitlubService from '../gitlubService'
import { useParams, Link } from 'react-router-dom'

export default function Repo ({ user }) {
  const { repo } = useParams()

  const [commits, setCommits] = useState([])
  const [readme, setReadme] = useState('')
  const [tree, setTree] = useState([])
  const [pwd, setPwd] = useState('')

  function appendPwd (content) {
    console.log(pwd === '' ? content : pwd + '/' + content)
    setPwd(pwd === '' ? content : pwd + '/' + content)
  }

  function backLevel () {
    setPwd(pwd.substring(0, pwd.lastIndexOf('/')))
  }

  useEffect(() => {
    gitlubService.fetchLog(repo).then(result => {
      if (!result.data.log) return

      const commits = result.data.log.split('\n').map(log => {
        const [user, message, time] = log.split('::')
        return { user, message, time }
      })
      setCommits(commits)
    })
  }, [])

  useEffect(() => {
    gitlubService
      .fetchTree(repo, pwd)
      .then((result) => {
        console.log(result.data)
        if (result.data.output.includes('README.md')) {
          const README = (pwd ? pwd + '/' : '') + 'README.md'
          gitlubService
            .fetchTree(repo, README)
            .then((result) => {
              console.log(README)
              setReadme(result.data.output)
            })
            .catch((err) => console.log(JSON.stringify(err)))
        } else {
          setReadme('')
        }
        setTree(result.data.output)
      })
      .catch((err) => console.log(JSON.stringify(err)))
  }, [pwd])

  return (
    <div className='my-10 space-y-4 mx-auto w-2/3'>

      <div className='flex flex-row justify-between'>
        <span
          className='font-bold pointer-cursor text-sky-600 text-2xl'
        >
          {repo}
        </span>

        <Link to={'/commits/' + repo}>
          <span className='p-2 border rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100'>
            {commits.length} commits
          </span>
        </Link>
      </div>

      <div className='border boder-slate-500' />
      <ViewTree
        user={user}
        tree={tree}
        repo={repo}
        appendPwd={appendPwd}
        backLevel={backLevel}
      />
      {readme &&
        <ReactMarkdown children={readme} className='border rounded-md border-sky-600 p-4' />}
    </div>
  )
}
