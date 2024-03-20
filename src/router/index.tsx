import type { ComponentType } from 'react'
import { lazy } from 'react'
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom'

import type { AccountMenuVo } from '@/apis/account'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/storage-keys'
import AppLayout from '@/layouts'
import { localCache } from '@/utils/cache'
import Auth from '@/views/auth'
import Error from '@/views/fallbacks/Error'
import NotFound from '@/views/fallbacks/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <AppLayout />,
        children: [],
      },
      {
        path: 'auth',
        element: <Auth />,
        children: [
          {
            path: '',
            element: <Navigate to="login" />,
          },
          {
            path: 'login',
            Component: lazy(() => import('@/views/auth/login')),
          },
          {
            path: 'register',
            Component: lazy(() => import('@/views/auth/register')),
          },
          {
            path: 'forget',
            Component: lazy(() => import('@/views/auth/forget')),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export const routeComponents = import.meta.glob('@/views/**/index.tsx') as Record<
  string,
  () => Promise<{ default: ComponentType }>
>

function collectRoutes(menus: AccountMenuVo[], res: AccountMenuVo[] = []) {
  menus.forEach((m) => {
    if (m.type === 0 && m.children?.length)
      collectRoutes(m.children, res)
    else if (m.type === 1)
      res.push(m)
  })
}

export function setDynamicRoutes(menus: AccountMenuVo[]) {
  const collectedMenus: AccountMenuVo[] = []
  collectRoutes(menus, collectedMenus)

  router.routes[0].children![0].children = collectedMenus.map(m => ({
    id: String(m.id),
    path: m.path,
    Component: lazy(routeComponents[`/src/views/${m.component}`.replace(/\/\//g, '/')]),
  }))
}

export function redirectToLogin() {
  localCache.remove(ACCESS_TOKEN_KEY)
  localCache.remove(REFRESH_TOKEN_KEY)
  router.navigate('/auth/login', { replace: true })
}
