import React from 'react'
import SchedulingTable from './SchedulingTable'

const TestPage = (props) => {

  const data = [
    {
      "name": "小学一年级",
      "data": ["未", "已", "", "未"]
    },
    {
      "name": "小学二年级",
      "data": ["未", "已", "", "未"]
    }
  ]

  const formatData = data.map(item => ([item.name].concat(item.data)))

  return (
    <div>
      <SchedulingTable
        classLength={20}
        data={formatData}
      />
    </div>
  )
}

export default TestPage
