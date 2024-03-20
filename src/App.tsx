import { useMount } from 'ahooks'
import type { ThemeConfig } from 'antd'
import { ConfigProvider, theme } from 'antd'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { RouterProvider } from 'react-router-dom'

import { type AccountMenuVo, getAccountMenus } from '@/apis/account'
import { MenusContext } from '@/contexts/MenusContext'
import { ColorModeContext, ThemeColorContext } from '@/contexts/ThemeContext'
import { useColorMode } from '@/hooks/useColorMode'
import { useDark } from '@/hooks/useDark'
import { usePrimaryColor } from '@/hooks/usePrimaryColor'
import { router, setDynamicRoutes } from '@/router'
import { isLoggedIn } from '@/utils/auth'
import Loading from '@/views/fallbacks/Loading'

export default function App() {
  const [primaryColor, setPrimaryColor] = usePrimaryColor()
  const [mode, setMode] = useColorMode()
  const isDark = useDark(mode)
  const [menus, setMenus] = useState<AccountMenuVo[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const antdTheme = useMemo<ThemeConfig>(() => {
    return {
      token: { colorPrimary: primaryColor },
      algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }
  }, [isDark, primaryColor])

  useLayoutEffect(() => {
    ConfigProvider.config({
      holderRender: children => (
        <ConfigProvider theme={antdTheme}>
          {children}
        </ConfigProvider>
      ),
    })
  }, [antdTheme])

  const [loading, setLoading] = useState(true)

  useMount(async () => {
    if (!isLoggedIn()) {
      setLoading(false)
      return
    }

    const [menus, err] = await getAccountMenus()
    setLoading(false)
    if (!err) {
      setDynamicRoutes(menus)
      setMenus(menus)
    }
  })

  if (loading)
    return <Loading />

  return (
    <ConfigProvider theme={antdTheme} wave={{ disabled: true }}>
      <ColorModeContext.Provider value={{ mode, setMode }}>
        <ThemeColorContext.Provider value={{ color: primaryColor, setColor: setPrimaryColor }}>
          <MenusContext.Provider value={{ menus, setMenus }}>
            <RouterProvider router={router} />
          </MenusContext.Provider>
        </ThemeColorContext.Provider>
      </ColorModeContext.Provider>
    </ConfigProvider>
  )
}
