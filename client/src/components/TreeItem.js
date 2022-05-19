import { AiFillFolder, AiOutlineFile } from 'react-icons/ai'
function TreeItem ({ content, addPath }) {
  const blob = content.endsWith('/')
    ? content.substring(0, content.lastIndexOf('/'))
    : content

  return (
    <div className='p-2 text-xl space-x-2 hover:bg-gray-100'>
      <span>
        {content.endsWith('/')
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
    </div>
  )
}

export default TreeItem
