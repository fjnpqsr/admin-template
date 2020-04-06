import React from 'react'
import './index.scss'
// import * as serviceWorker from './serviceWorker'
import createApp from './core'
import createEffectLocation from './plugins/withHistory'
import Router from './router'
import { Spin } from 'antd'

const LoadingComponent = () => (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <Spin />
  </div>
)

const app = createApp({
  routerConfig: Router,
  loadingComponent: LoadingComponent
})

app.use(createEffectLocation())

// 方便查看app实例
window.app = app

// 加载全局model配置, 用于缓存登录信息, 上下文内容
// exp: app.model(require('./models/global').default)

app.start('#root')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
