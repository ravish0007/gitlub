import Tree from './Tree'
import Code from './Code'

export default function ViewTree ({ user, tree, repo, appendPwd, backLevel }) {
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
