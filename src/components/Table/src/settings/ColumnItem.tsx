import { DragOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons'
import { Checkbox, Divider, Tooltip } from 'antd'
import classNames from 'classnames'

interface State {
  show: boolean
  pinnedLeft: boolean
  pinnedRight: boolean
}

interface Props {
  title: RN
  state: State
  onChange: (state: State) => void
}

export default function ColumnItem(props: Props) {
  const { title, state, onChange } = props
  const { show, pinnedLeft, pinnedRight } = state

  return (
    <div className="py-1 flex justify-between">
      <div>
        <DragOutlined className="cursor-move mr-2" />
        <Checkbox
          className={classNames({ 'text-primary': show })}
          checked={show}
          onChange={e => onChange({ ...state, show: e.target.checked })}
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
