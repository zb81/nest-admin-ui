import Icon from '@ant-design/icons'

import LogoCpn from '@/assets/icons/logo.svg?react'

interface Props {
  size?: number | string
  color?: string
}

function Logo({ color = '#000', size = '1rem' }: Props) {
  return (
    <Icon
      style={{ color, fontSize: size }}
      component={LogoCpn}
    />
  )
}

export default Logo
