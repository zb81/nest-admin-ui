import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useContext } from 'react'

import ToggleTheme from '@/components/ToggleTheme'
import { ColorModeContext } from '@/contexts/ThemeContext'
import { useDark } from '@/hooks/useDark'

function HeaderRight() {
  const { mode, setMode } = useContext(ColorModeContext)
  const isDark = useDark(mode)

  const themeTrigger = (
    <span className="header-btn">
      {isDark ? <MoonOutlined /> : <SunOutlined />}
    </span>
  )

  return (
    <div className="h-full flex items-center">
      <ToggleTheme
        mode={mode}
        onChange={m => setMode(m)}
        trigger={themeTrigger}
      />
    </div>
  )
}

export default HeaderRight
