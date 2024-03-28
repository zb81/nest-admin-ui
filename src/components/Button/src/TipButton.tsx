import { Button, Tooltip } from 'antd'

import type { TipButtonProps } from './types'

export default function TipButton(props: PWC<TipButtonProps>) {
  const {
    title,
    icon,
    onClick,
    placement = 'top',
    children,
  } = props

  return (
    <Tooltip title={title} placement={placement}>
      {children || <Button title={title} type="text" icon={icon} onClick={onClick} />}
    </Tooltip>
  )
}
