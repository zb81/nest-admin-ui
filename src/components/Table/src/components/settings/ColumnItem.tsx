import { DragOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Checkbox, Divider, Tooltip } from 'antd'
import classNames from 'classnames'

interface State {
  hidden: boolean
  pinnedLeft: boolean
  pinnedRight: boolean
}

interface Props {
  id: string
  title: RN
  state: State
  onChange: (state: State) => void
}

export default function ColumnItem(props: Props) {
  const { title, state, onChange, id } = props
  const { hidden, pinnedLeft, pinnedRight } = state

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isShow = !hidden

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="py-1 flex justify-between"
    >
      <div>
        <span
          className="cursor-move mr-2"
          {...attributes}
          {...listeners}
        >
          <DragOutlined />
        </span>
        <Checkbox
          className={classNames({ 'text-primary': isShow })}
          checked={isShow}
          onChange={e => onChange({ ...state, hidden: !e.target.checked })}
        >
          {title}
        </Checkbox>
      </div>

      <div>
        <Tooltip title="固定在左侧">
          <VerticalRightOutlined
            className={classNames('cursor-pointer', { 'text-primary': pinnedLeft })}
            onClick={() => onChange({ ...state, pinnedRight: false, pinnedLeft: !pinnedLeft })}
          />
        </Tooltip>
        <Divider type="vertical" />
        <Tooltip title="固定在右侧">
          <VerticalLeftOutlined
            className={classNames('cursor-pointer', { 'text-primary': pinnedRight })}
            onClick={() => onChange({ ...state, pinnedLeft: false, pinnedRight: !pinnedRight })}
          />
        </Tooltip>
      </div>
    </div>
  )
}
