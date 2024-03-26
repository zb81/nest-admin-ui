import { SettingOutlined } from '@ant-design/icons'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button, Checkbox, Popover } from 'antd'

import type { ColumnsSettingProps } from '../types'

import ColumnItem from './ColumnItem'

function ColumnsSetting(props: ColumnsSettingProps) {
  const { columns, onChange, showIndexColumn, onShowIndexColumnChange } = props
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const titleNode = (
    <div>
      <Checkbox
        checked={showIndexColumn}
        onChange={e => onShowIndexColumnChange?.(e.target.checked)}
      >
        序号列
      </Checkbox>
    </div>
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const oldIndex = columns.findIndex(c => c.id === active.id)
      const newIndex = columns.findIndex(c => c.id === over.id)
      onChange?.(arrayMove(columns, oldIndex, newIndex))
    }
  }

  const contentNode = (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={columns} strategy={verticalListSortingStrategy}>
        {columns.map((col) => {
          const {
            hidden = false,
            pinnedLeft = false,
            pinnedRight = false,
          } = col

          return (
            <li key={col.id}>
              <ColumnItem
                id={col.id}
                title={col.title}
                state={{ hidden, pinnedLeft, pinnedRight }}
                onChange={(state) => {
                  col.hidden = state.hidden
                  col.pinnedLeft = state.pinnedLeft
                  col.pinnedRight = state.pinnedRight
                  onChange?.([...columns])
                }}
              />
            </li>
          )
        })}
      </SortableContext>

    </DndContext>
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
