import React from 'react'
import style from './SchedulingTable.module.scss'

const SchedulingTable = (props) => {
  const {classLength, data} = props
  const columns = Array.from(new Array(classLength)).map((v,i) => ({
    title: `${i+1}班`
  }))

  return (
    <table className={style.table} cellPadding={0} cellSpacing={0}>
      <tr>
        <th className={style.tagCol}>
          <div>
            <span>班级</span>
            <span>年级</span>
          </div>
        </th>
        {columns.map((col) => (
          <th>{col.title}</th>
        ))}
      </tr>
      {data.map((row) => {
        let _rows = row
        if (row.length <= classLength) {
          // +1 是因为计算了年级, 需要多加一列
          const addRows = new Array(classLength - row.length + 1).fill('')
          _rows = row.concat(addRows)
        }
        return (
          <tr>
            {_rows.map(cell => (
              <td>{cell}</td>
            ))}
          </tr>
        )
      })}
    </table>
  )
}


SchedulingTable.defaultProps = {
  classLength: 20,
  data: []
}

export default SchedulingTable
