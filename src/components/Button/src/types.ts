import type { PopconfirmProps } from 'antd'
import type { TooltipPlacement } from 'antd/es/tooltip'

// 参考 https://ant-design.antgroup.com/components/popconfirm-cn#api
export interface ConfirmButtonProps extends Partial<PopconfirmProps> {
  /** @default false */
  disabled?: boolean

  /** @default '确认删除该条数据吗?' */
  title?: string
}

export interface TipButtonProps {
  title: string
  icon?: RN
  /** @default 'bottom' */
  placement?: TooltipPlacement
  onClick?: () => void
}
