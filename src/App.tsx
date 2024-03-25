import type { ThemeConfig } from 'antd'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router-dom'

import { type AccountMenuVo, getAccountMenus } from '@/apis/account'
import { ColorModeProvider, MenusProvider, ThemeColorProvider } from '@/contexts'
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
    <ConfigProvider locale={zhCN} theme={antdTheme} wave={{ disabled: true }}>
      <ColorModeProvider mode={mode} setMode={setMode}>
        <ThemeColorProvider color={primaryColor} setColor={setPrimaryColor}>
          <MenusProvider menus={menus} setMenus={setMenus}>
            <RouterProvider router={router} />
          </MenusProvider>
        </ThemeColorProvider>
      </ColorModeProvider>
    </ConfigProvider>
  )
}
