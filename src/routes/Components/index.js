import React, { useState, useEffect } from 'react'
import LazyLoadTreeSelect from '../../components/LazyLoadTreeSelect'
import { generateRandomStr } from '../../utils/index'

const initTree = [
  { id: '-1', name: 'root', nodeType: '0', deviceId: 'A0000001' }
]

const genAsyncTreeNode = (nodeType) => {
  const random = generateRandomStr(8)
  return {
    id: random,
    name: random,
    nodeType: nodeType
  }
}
const mergeChildNodes = (treeData, nodeKey, children) => {
  return treeData.map(node => {
    if (node.id === nodeKey) {
      return { ...node, children }
    } else if (node.children && node.children.length > 0) {
      return { ...node, children: mergeChildNodes(node.children, nodeKey, children) }
    }
    return node
  })
}
const ComponentsPage = () => {
  const [treeData, setTreeData] = useState([])
  const [loading, setLoading] = useState(false)

  const resetTreeData = () => {
    setLoading(true)
    setTimeout(() => {
      setTreeData(initTree)
      setLoading(false)
    }, 2000)
  }

  useEffect(() => {
    resetTreeData()
  }, [])

  const formatNode = (node) => {
    return {
      ...node,
      key: node.id,
      label: node.name,
      children: node.dataList || []
    }
  }

  const handleSearch = ({ type, params }) => {
    if (type === 'load') {
      setTimeout(() => {
        const childNodes = [
          genAsyncTreeNode(1)
        ]
        const newTree = mergeChildNodes(treeData, params.key, childNodes)
        setTreeData(newTree)
      }, 2000)
    } else if (type === 'search') {

    }
  }
  return (
    <h1>
      <LazyLoadTreeSelect
        style={{ width: 300 }}
        loading={loading}
        treeData={treeData}
        format={formatNode}
        onSearch={handleSearch}
        onchange={() => {

        }}
      />
    </h1>
  )
}

export default ComponentsPage
