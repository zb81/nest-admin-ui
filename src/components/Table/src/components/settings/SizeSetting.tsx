import { ColumnHeightOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'

import { TipButton } from '@/components/Button'

interface Props {
  size: Size
  onChange: (size: Size) => void
}

const items: Array<{ key: Size, label: string }> = [
  {
    key: 'large',
    label: '稀疏',
  },
  {
    key: 'middle',
    label: '默认',
  },
  {
    key: 'small',
    label: '紧凑',
  },
] as const

function SizeSetting({ size, onChange }: Props) {
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        onClick: ({ key }) => onChange(key as Size),
        defaultSelectedKeys: [size],
      }}
      trigger={['click']}
      placement="bottom"
    >
      <TipButton title="密度" icon={<ColumnHeightOutlined />} />
    </Dropdown>
  )
}

export default memo(SizeSetting)
