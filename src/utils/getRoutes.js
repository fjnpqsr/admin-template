import React from 'react'

import { AuthRoute } from '../core'

const routerData = {}

const modelResolver = (model) => require(`../models/${model}`)

// 将context分发到实体组件

export const getRoutes = (routerConfigs = {}, app = {}) => {
  Object.keys(routerConfigs).forEach(routeKey => {
    const r = routerConfigs[routeKey]
    routerData[routeKey] = {
      ...r,
      path: routeKey,
      component: (props) => {
        return (
          <AuthRoute
            {...props}
            app={app}
            auth={r.auth}
            routerData={routerData}
            component={r.component}
            modelResolver={modelResolver}
            models={r.models}
          />
        )
      }
    }
  })
  return routerData
}
