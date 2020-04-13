import React from 'react'
import { utils, create } from 'dva-core'
import invariant from 'invariant'
import { Provider } from 'react-redux'
import {
  createBrowserHistory
  // createHashHistory
} from 'history'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import AsyncComponent from './AsyncComponent'
import createContext from './context'
import apiCreator from './apiCreator'
import AuthRoute, { getAuthorization, setAuthorization } from './AuthRoute'

const { isFunction } = utils

export let app = {}

export default function (opts = {}) {
  const { routerConfig, loadingComponent, apis } = opts
  const history = opts.history || createBrowserHistory()

  const loadPlugins = () => {
    app.use(createContext(app))
  }

  const dvaCoreOptions = {
    initialReducer: {
      router: connectRouter(history)
    },
    setupMiddlewares (middlewares) {
      return [routerMiddleware(history), ...middlewares]
    },
    setupApp (app) {
      app._history = patchHistory(history)
    }
  }

  app = create(opts, dvaCoreOptions)

  loadPlugins()

  const oldAppStart = app.start

  app.start = start
  app.apis = apiCreator.init(apis)
  app.loadingComponent = loadingComponent

  invariant(
    isFunction(routerConfig),
    `[app.router] router should be function, but got ${typeof router}`
  )

  app._router = routerConfig

  return app

  function start (container) {
    // 允许 container 是字符串，然后用 querySelector 找元素
    if (isString(container)) {
      container = document.querySelector(container)
      invariant(container, `[app.start] container ${container} not found`)
    }
    // 并且是 HTMLElement
    invariant(
      !container || isHTMLElement(container),
      `[app.start] container should be HTMLElement`
    )
    // 路由必须提前注册
    invariant(app._router, `[app.start] router must be registered before app.start()`)
    if (!app._store) {
      oldAppStart.call(app)
    }
    const store = app._store

    app.dispatch = store.dispatch

    // 将Provider挂载到Dom上
    if (container) {
      render(container, store, app, app._router, history)
      app._plugin.apply('onHmr')(render.bind(null, container, store, app))
    } else {
      return createProvider(store, this, this._router, history)
    }
  }
}
function isHTMLElement (node) {
  return typeof node === 'object' && node !== null && node.nodeType && node.nodeName
}

function isString (str) {
  return typeof str === 'string'
}

function createProvider (store, app, router, history) {
  const DvaRoot = extraProps => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {router({ app, history, ...extraProps })}
      </ConnectedRouter>
    </Provider>
  )
  return DvaRoot
}

function render (container, store, app, router, history) {
    const ReactDOM = require('react-dom'); // eslint-disable-line
  ReactDOM.render(React.createElement(createProvider(store, app, router, history)), container)
}

function patchHistory (history) {
  const oldListen = history.listen
  history.listen = callback => {
    callback(history.location, history.action)
    return oldListen.call(history, (...args) => {
      callback(...args)
    })
  }
  return history
}
export { AsyncComponent }
export { AuthRoute, getAuthorization, setAuthorization }
