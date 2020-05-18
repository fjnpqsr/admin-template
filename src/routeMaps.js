import { lazy } from 'react'

export default {
  '/dashboard': {
    auth: ['member'],
    models: ['home', 'login'],
    component: lazy(() => import('./layouts/DashboardLayout'))
  },
  '/dashboard/preview': {
    exact: true,
    models: ['home', 'test'],
    component: lazy(() => import('./routes/Preview'))
  },
  '/dashboard/products': {
    exact: true,
    models: ['home', 'products'],
    component: lazy(() => import('./routes/products/Product'))
  },
  '/dashboard/users': {
    exact: true,
    auth: ['111'],
    models: ['home', 'test'],
    component: lazy(() => import('./routes/Users/Users'))
  },
  '/dashboard/settings': {
    exact: true,
    models: ['home', 'test'],
    component: lazy(() => import('./routes/Settings/Settings'))
  },
  '/dashboard/todos': {
    exact: true,
    component: lazy(() => import('./routes/Todos'))
  },
  '/dashboard/exception/403': {
    exact: true,
    component: lazy(() => import('./routes/Exception/403'))
  },
  '/dashboard/exception/404': {
    exact: true,
    component: lazy(() => import('./routes/Exception/404'))
  },
  '/login': {
    exact: true,
    models: ['login'],
    component: lazy(() => import('./routes/login/Login'))
  },
}
