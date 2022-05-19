import TreeItem from './TreeItem'

function Tree ({ content, addPath }) {
  return content.map((item) => <TreeItem addPath={addPath} content={item} />)
}

export default Tree
