import type { PopconfirmProps } from 'antd'

// 参考 https://ant-design.antgroup.com/components/popconfirm-cn#api
export interface ConfirmButtonProps extends Partial<PopconfirmProps> {
  /** @default false */
  disabled?: boolean

  /** @default '确认删除该条数据吗?' */
  title?: string
}
