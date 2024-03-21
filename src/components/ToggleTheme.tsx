import { DesktopOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button, Popover } from 'antd'
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
  trigger?: RN
  onChange: (mode: ColorMode) => void
}

function ToggleTheme({ mode, trigger, onChange }: Props) {
  const isDark = useDark(mode)
  trigger = trigger || <Button type="text" icon={iconMap[isDark ? 'dark' : 'light']} />

  const modeList = (
    <ul>
      {modes.map(m => (
        <li key={m} onClick={() => onChange(m)}>
          <Button
            className={classnames({ 'text-primary': m === mode })}
            type="text"
            icon={iconMap[m]}
          >
            {upperFirst(m)}
          </Button>
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
      {trigger}
    </Popover>
  )
}

export default ToggleTheme
