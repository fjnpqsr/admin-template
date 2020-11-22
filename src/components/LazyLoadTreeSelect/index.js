import React from 'react'
import { TreeSelect, Spin } from 'antd'

const spinner = (
  <div style={{ display: 'flex', alignItems: 'center' }}><Spin /></div>
)

const formatTree = (data, formatFunc) => {
  return data.map(item => {
    const regularItem = formatFunc(item)
    if (item.children && item.children.length > 0) {
      regularItem.children = formatTree(item.children, formatFunc)
    }
    return regularItem
  })
}

const LazyLoad = (props) => {
  const {
    style = {},
    placeholder = 'Please Select',
    treeData = [],
    loading = false,
    format,
    onSearch
  } = props

  const innerTreeData = formatTree(treeData, format)

  const handleSearchNode = (type, { treeNode, keyword }) => {
    if (type === 'load') {
      return new Promise(resolve => {
        const { key } = treeNode
        setTimeout(() => {
          onSearch({ type, params: { key, treeNode } })
          resolve()
        }, 0)
      })
    } else if (type === 'search') {
      onSearch({ type, params: { keyword } })
    }
  }

  return (
    <TreeSelect
      treeData={innerTreeData}
      style={style}
      placeholder={placeholder}
      showSearch
      filterTreeNode={false}
      dropdownRender={(originNode) => {
        return loading ? spinner : originNode
      }}
      loadData={(treeNode) => {
        return handleSearchNode('load', { treeNode })
      }}
      onSearch={(keyword) => {
        handleSearchNode('search', { keyword })
      }}
    />
  )
}

export default LazyLoad
