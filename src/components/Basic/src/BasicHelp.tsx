import { InfoCircleOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import type { TooltipPlacement } from 'antd/es/tooltip'
import classNames from 'classnames'
import type { PropsWithChildren } from 'react'

interface Props {
  /**
   * Help text max width
   * @default '600px'
   */
  maxWidth?: string
  /**
   * Whether to show the index
   * @default false
   */
  showIndex?: boolean
  /**
   * Help text color
   * @default '#ffffff'
   */
  color?: string
  /**
   * Help text font size
   * @default '14px'
   */
  fontSize?: string
  /**
   * Help text placement
   * @default 'right'
   */
  placement?: TooltipPlacement
  /**
   * Help text
   */
  text: string | string[] | JSX.Element
  className?: string
}

function renderTitle(text: Props['text'], showIndex?: boolean) {
  if (typeof text === 'string')
    return <p>{text}</p>

  if (Array.isArray(text)) {
    return text.map((t, i) => (
      <p key={t}>
        {showIndex ? `${i + 1}. ` : ''}
        {t}
      </p>
    ))
  }
  return text
}

export default function BasicHelp(p: PropsWithChildren<Props>) {
  const { className, placement, text, showIndex, children, color, fontSize, maxWidth } = p

  const mergedClass = classNames(
    'inline-block ml-[6px] cursor-pointer text-deep-gray hover:text-primary',
    className,
  )

  return (
    <Tooltip
      overlayStyle={{ maxWidth }}
      overlayClassName="mb-0"
      placement={placement}
      title={(
        <div style={{ color, fontSize }}>
          {renderTitle(text, showIndex)}
        </div>
      )}
      autoAdjustOverflow
    >
      <span className={mergedClass}>
        {children || <InfoCircleOutlined />}
      </span>
    </Tooltip>
  )
}
