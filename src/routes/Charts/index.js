import React, { useState } from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'

import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/chart/bar'

const ChartsPage = () => {
  const [chartData, setChartData] = useState([])

  const splitNumber = 7
  const _data = [
    { value: [new Date(2020, 12, 1), 102] },
    { value: [new Date(2020, 12, 2), 300] },
    { value: [new Date(2020, 12, 3), 256] },
    { value: [new Date(2020, 12, 4), 12] },
    { value: [new Date(2020, 12, 5), 101] },
    { value: [new Date(2020, 12, 6), 10] },
    { value: [new Date(2020, 12, 7), 88] },
    { value: [new Date(2020, 12, 8), 100] },
    { value: [new Date(2020, 12, 9), 275] },
    { value: [new Date(2020, 12, 10), 0] },
    { value: [new Date(2020, 12, 11), 275] },
    { value: [new Date(2020, 12, 12), 444] },
    { value: [new Date(2020, 12, 13), 100] },
    { value: [new Date(2020, 12, 14), 134] },
    { value: [new Date(2020, 12, 15), 123] },
    { value: [new Date(2020, 12, 16), 266] },
    { value: [new Date(2020, 12, 17), 355] },
    { value: [new Date(2020, 12, 18), 144] },
    { value: [new Date(2020, 12, 19), 333] },
    { value: [new Date(2020, 12, 20), 222] },
    { value: [new Date(2020, 12, 21), 100] },
    { value: [new Date(2020, 12, 22)] },
    { value: [new Date(2020, 12, 23)] },
    { value: [new Date(2020, 12, 24)] },
    { value: [new Date(2020, 12, 25)] },
    { value: [new Date(2020, 12, 26)] },
    { value: [new Date(2020, 12, 27)] },
    { value: [new Date(2020, 12, 28)] },
    { value: [new Date(2020, 12, 29)] },
    { value: [new Date(2020, 12, 30)] }
  ]
  const hasDataDay = _data.filter(d => d.value[1]).length
  const endValue = _data[hasDataDay + 1].value[0]
  const startValue = _data[hasDataDay - splitNumber].value[0]
  const option = {
    title: {
      text: '动态数据 + 时间坐标轴'
    },
    xAxis: {
      type: 'time',
      splitNumber: splitNumber,
      axisLine: {
        symbol: 'none',
        show: true,
        onZero: true,
        lineStyle: {
          width: 1,
          color: '#aaa',
          type: 'solid',
          opacity: 1
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: '{dd}'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        onZero: true,
        lineStyle: {
          width: 1,
          color: '#aaa',
          type: 'solid',
          opacity: 1
        }
      }
    },
    dataZoom: {
      realTime: true,
      filterMode: 'filter',
      zoomLock: true,
      brushSelect: false,
      minSpanValue: 3600 * 24 * 1000,
      rangeMode: true,
      startValue: startValue,
      endValue: endValue
    },
    series: [{
      name: '模拟数据',
      type: 'line',
      showSymbol: false,
      hoverAnimation: false,
      data: _data
    }]
  }

  return (
    <div>
    123
      <div style={{ width: '480px', height: '200px' }}>
        <ReactEchartsCore
          echarts={echarts}
          option={option}
        />
      </div>

    </div>
  )
}

export default ChartsPage
