import React from 'react'
import AsyncComponent from './AsyncComponent'
import { utils } from 'dva-core'
import invariant from 'invariant'

import { Redirect } from 'react-router-dom'

const { isFunction } = utils

const AUTH_LOCAL_STORAGE_KEY = '@@auth'
const GUEST_AUTH = 'guest'
function isString (str) {
  return typeof str === 'string'
}

const AuthRoute = (props) => {
  const { auth = [], redirectPath, render, ...passToChild } = props
  // 获取当前的登录的权限
  const currentAuth = getAuthorization() || []
  // 判断当前权限是否满足guest以外的权限
  const hasFullAuth = auth.every(a => currentAuth.includes(a))
  // 返回组件或者重定向至redirectTarget
  const redirectTarget = redirectPath || '/login'
  return hasFullAuth
    ? <AsyncComponent {...passToChild} auth={auth} />
    : <Redirect to={redirectTarget} />
}

export default AuthRoute
export const getAuthorization = (authKey) => {
  const currentAuth = window.localStorage.getItem(AUTH_LOCAL_STORAGE_KEY) || `"[${GUEST_AUTH}]"`
  return JSON.parse(decodeURIComponent(currentAuth))
}
export const setAuthorization = (auth) => {
  let AUTH = [GUEST_AUTH]
  if (!auth) {

  } else if (isFunction(auth)) {
    AUTH = [auth() || '']
  } else if (isString(auth)) {
    AUTH = [auth]
  } else {
    AUTH = auth
  }
  invariant(Array.isArray(AUTH), `[AUTH] should be an Array, please check AUTH type`)
  window.localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(encodeURIComponent(AUTH)))
}
