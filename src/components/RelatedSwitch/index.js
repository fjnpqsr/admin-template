import React from 'react'
import { getRoutes } from '../../utils'
import {
  Route,
  Switch
} from 'react-router-dom'

// 校验路由匹配到的地址和目标地址做匹配

const getMatched = (mathPath, path) => {
  if (mathPath === path) {
    // console.warn('Two path are equal!')
    return 0
  }
  const arr1 = mathPath.split('/')
  const arr2 = path.split('/')
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2
  }
  return 3
}

const getRelatedRoutes = (match, history) => {
  const routesData = getRoutes()
  let relateRoutes = []
  Object.keys(routesData).forEach(item => {
    if (getMatched(match.path, item) === 2 && getMatched(match.path, item)) {
      relateRoutes.push(routesData[item])
    }
  })
  return relateRoutes
}

const RelatedSwitch = (props) => {
  const { children, match, redirectPath } = props
  const relatedRoutes = getRelatedRoutes(match)
  return (
    <Switch>
      {relatedRoutes.map(r => {
        const Component = r.component
        const routeProps = { ...r, component: (props) => <Component {...props} redirectPath={redirectPath} /> }
        return (
          <Route
            {...routeProps}
            key={r.path}
          />
        )
      })}
      {children}
    </Switch>
  )
}

export default RelatedSwitch
