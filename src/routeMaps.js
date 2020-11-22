import { lazy } from 'react'

export default {
  '/dashboard': {
    auth: ['member'],
    title: '仪表盘',
    models: ['home', 'login'],
    component: lazy(() => import('./layouts/DashboardLayout'))
  },
  '/dashboard/components': {
    exact: true,
    component: lazy(() => import('./routes/Components'))
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
  }
}
