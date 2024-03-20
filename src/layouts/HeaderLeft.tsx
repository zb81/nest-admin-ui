import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

interface Props {
  collapsed: boolean
  onCollapse: (c: boolean) => void
}

function HeaderLeft({ collapsed, onCollapse }: Props) {
  return (
    <div className="h-full flex items-center">
      <span className="header-btn" onClick={() => onCollapse(!collapsed)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
    </div>
  )
}

export default HeaderLeft
