import { SettingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Popover } from 'antd'

import type { ColumnsSettingProps } from '../types'

import ColumnItem from './ColumnItem'

function ColumnsSetting(props: ColumnsSettingProps) {
  const { columns, onChange, showIndexColumn, onShowIndexColumnChange } = props

  const titleNode = (
    <div>
      <Checkbox
        checked={showIndexColumn}
        onChange={e => onShowIndexColumnChange?.(e.target.checked)}
      >
        序号列
      </Checkbox>
      <Button type="link">重置</Button>
    </div>
  )

  const contentNode = (
    <ul>
      {columns.map((col) => {
        const {
          show = true,
          pinnedLeft = false,
          pinnedRight = false,
        } = col

        return (
          <li key={col.key || String(col.dataIndex)}>
            <ColumnItem
              title={col.title}
              state={{ show, pinnedLeft, pinnedRight }}
              onChange={(state) => {
                col.show = state.show
                col.pinnedLeft = state.pinnedLeft
                col.pinnedRight = state.pinnedRight
                onChange?.([...columns])
              }}
            />
          </li>
        )
      })}
    </ul>
  )

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      title={titleNode}
      content={contentNode}
    >
      <Button title="列设置" type="text" icon={<SettingOutlined />}></Button>
    </Popover>
  )
}

export default memo(ColumnsSetting) as typeof ColumnsSetting
