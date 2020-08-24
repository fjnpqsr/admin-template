import React from 'react'
import SchedulingTable from './SchedulingTable'

const TestPage = (props) => {




  const data = [
    ['小学一年级', '已', '未', '已', '未', '已', '未', '已', '未','已', '未','已', '未','已', '未','已', '未','已', '未','已', '已'],
    ['小学二年级', '已', '未', '已', '未', '已', '未', '已', '未','已', '未','已', '未','已', '未','已', '未','已', '未','已', '已'],
    ['小学三年级', '已', '未', '已', '未', '已', '未', '已', '未','已'],
    ['小学四年级', '已', '未', '已', '未', '已', '未', '已', '未','已', '未','已', '未','已', '未','已', '未','已', '未','已', '已']
  ]


  return (
    <div>
      <SchedulingTable
        classLength={20}
        data={data}
      />
    </div>
  )
}

export default TestPage
