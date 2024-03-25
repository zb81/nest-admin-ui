import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { Suspense } from 'react'

import type { AccountMenuVo } from '@/apis/account'
import CheckLoggedIn from '@/components/CheckLoggedIn'
import Logo from '@/components/Logo'
import { MenusContext } from '@/contexts'
import HeaderLeft from '@/layouts/HeaderLeft'
import HeaderRight from '@/layouts/HeaderRight'
import { router } from '@/router'
import { renderAntdIcon } from '@/utils/ant-design-icons'
import Loading from '@/views/fallbacks/Loading'

const { Header, Sider, Content } = Layout

function transformMenus(menus: AccountMenuVo[]): MenuProps['items'] {
  return menus.map((m) => {
    return {
      key: `${m.id}:${m.path}`,
      label: m.name,
      children: m.children && transformMenus(m.children),
      icon: renderAntdIcon(m.icon),
    }
  })
}

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const { menus } = useContext(MenusContext)
  const antdMenus = transformMenus(menus)

  if (location.pathname === '/')
    return <Navigate to={router.routes[0].children![0].children![0].path!} replace />

  return (
    <CheckLoggedIn>
      <Layout className="h-full">
        <Sider className="text-white" trigger={null} collapsible collapsed={collapsed} width={210}>
          <div className="h-12 flex items-center justify-center">
            <Logo size="2rem" color="#fff" />
            {!collapsed && (
              <h1 className="ml-3 text-4 font-bold overflow-hidden text-nowrap">
                {import.meta.env.VITE_APP_TITLE}
              </h1>
            )}
          </div>

          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={antdMenus}
            onSelect={(e) => {
              navigate(e.key.split(':')[1])
            }}
          />
        </Sider>

        <Layout>
          <Header className="h-12 leading-12 p-0 flex justify-between">
            <HeaderLeft collapsed={collapsed} onCollapse={c => setCollapsed(c)} />
            <HeaderRight />
          </Header>

          <Content className="p-4">
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </CheckLoggedIn>
  )
}

export default AppLayout
