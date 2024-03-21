import type { PopconfirmProps } from 'antd'

// 参考 https://ant-design.antgroup.com/components/popconfirm-cn#api
export interface ConfirmButtonProps extends Partial<PopconfirmProps> {
  disabled?: boolean
  /** @default '确认删除' */
  title?: string
}
