import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

import type { ConfirmButtonProps } from './types'

export default function ConfirmButton(props: PWC<ConfirmButtonProps>) {
  const {
    disabled = false,
    title = '确认删除该条数据吗?',
    okText = '确认',
    okType = 'danger',
    cancelText = '取消',
    children,
    ...antdProps
  } = props

  const triggerNode = (
    <Button
      size="small"
      disabled={disabled}
      type="text"
      danger
      icon={<DeleteOutlined />}
    >
    </Button>
  )

  if (disabled)
    return triggerNode

  return (
    <Popconfirm
      title={title}
      placement="bottom"
      okText={okText}
      okType={okType}
      cancelText={cancelText}
      {...antdProps}
    >
      {children || triggerNode}
    </Popconfirm>
  )
}
