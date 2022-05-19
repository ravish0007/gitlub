import hljs from 'highlight.js'
import 'highlight.js/styles/stackoverflow-light.css'

hljs.configure({ useBR: true })

function Code ({ content }) {
  const highlighted = hljs.highlightAuto(content)

  return (
    <pre className='my-4 p-4 overflow-x-auto'>
      <div dangerouslySetInnerHTML={{ __html: highlighted.value }} />
    </pre>
  )
}

export default Code
