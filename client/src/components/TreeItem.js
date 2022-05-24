import { AiFillFolder, AiOutlineFile } from 'react-icons/ai'
function TreeItem ({ content, addPath }) {
  const [file, commitDate, commitMessage] = content.split('::')

  const blob = file.endsWith('/')
    ? file.substring(0, file.lastIndexOf('/'))
    : file

  return (
    <div className='flex flex-row justify-between hover:bg-gray-100'>
      <span className='basis-2/6 p-2 text-xl space-x-2 cursor-pointer'>
        <span>
          {file.endsWith('/')
            ? (
              <AiFillFolder className='folder' />
              )
            : (
              <AiOutlineFile className='file' />
              )}
        </span>
        <p
          className='inline text-slate-500 hover:underline hover:text-sky-600'
          onClick={() => addPath(blob)}
        >
          {blob}
        </p>
      </span>

      <p className='inline p-2 basis-4/6 text-left text-slate-500'>
        {commitMessage}
      </p>

      <p className='inline p-2 basis-1/6 ml-auto text-slate-500 text-right'>
        {commitDate}
      </p>
    </div>
  )
}

export default TreeItem
