import React from 'react'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { getRoutes } from './utils'
import routerMaps from './routeMaps'
import NotAuthPage from './routes/Exception/403'
import NotFoundPage from './routes/Exception/404'

const routerConfig = ({ app, history, ...props }) => {
  // 从routerMap.js中获取路由相关的配置信息
  // modelResolver 用于动态加载model
  const routerData = getRoutes(routerMaps, app)

  const RootRouter = routerData['/dashboard'].component
  const LoginPage = routerData['/login'].component
  return (
    <Switch>
      <Redirect exact path={'/'} to={'/dashboard'} />
      <Redirect exact path={'/dashboard'} to={'/dashboard/preview'} />
      <Route
        exact={RootRouter.exact}
        path={'/dashboard'}
        component={(props) => <RootRouter {...props} redirectPath='/login' />}
      />

      <Route
        exact={LoginPage.exact}
        path={'/login'}
        component={(props) => <LoginPage {...props} />}
      />

      <Route
        exact={LoginPage.exact}
        path={'/exception/403'}
        component={NotAuthPage}
      />

      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default routerConfig
