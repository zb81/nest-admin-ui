import { DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import classnames from 'classnames'

import { useDark } from '@/hooks/useDark'
import { upperFirst } from '@/utils/string'

export type ColorMode = 'light' | 'dark' | 'auto'

const iconMap = {
  light: <SunOutlined />,
  dark: <MoonOutlined />,
  auto: <DesktopOutlined />,
} as const

const modes = ['light', 'dark', 'auto'] as const

interface Props {
  mode: ColorMode
  trigger?: JSX.Element
  onChange: (mode: ColorMode) => void
}

function ToggleTheme({ mode, trigger, onChange }: Props) {
  const isDark = useDark(mode)

  const modeList = (
    <ul>
      {modes.map(m => (
        <li
          key={m}
          className={classnames('btn flex items-center', { 'text-primary': m === mode })}
          onClick={() => onChange(m)}
        >
          {iconMap[m]}
          <span className="ml-2">{upperFirst(m)}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <Popover
      placement="bottom"
      arrow={false}
      content={modeList}
      trigger="click"
    >
      {trigger ?? (
        <a className="btn">
          {iconMap[isDark ? 'dark' : 'light']}
        </a>
      )}
    </Popover>
  )
}

export default ToggleTheme
