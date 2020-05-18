import React from 'react'
import { List } from 'antd'

const dataSource = [
  {
    title: 'test',
    createdTime: new Date().valueOf(),
    finished: false
  },
  {
    title: 'test',
    createdTime: new Date().valueOf(),
    finished: true
  }
]

const Todos = (props) => {
  return (
    <List
      bordered={false}
      dataSource={dataSource}
    >
        123
    </List>
  )
}

export default Todos
