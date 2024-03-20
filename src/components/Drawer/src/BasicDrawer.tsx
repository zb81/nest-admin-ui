import { LoadingOutlined } from '@ant-design/icons'
import { Button, Drawer, Space, Spin } from 'antd'

import type { DrawerProps } from './types'

export default function BasicDrawer(props: PWC<DrawerProps>) {
  const {
    title,
    loading = false,
    loadingText,
    maskClosable = true,
    destroyOnClose = true,
    width = '50%',
    open,
    showFooter = true,
    footer,
    confirmLoading = false,
    onClose,
    onConfirm,
    children,
  } = props

  const footerNode = footer || (
    <div className="text-right">
      <Space>
        <Button onClick={onClose}>取消</Button>
        <Button type="primary" loading={confirmLoading} onClick={onConfirm}>确认</Button>
      </Space>
    </div>
  )

  return (
    <Drawer
      title={title}
      width={width}
      open={open}
      maskClosable={maskClosable}
      destroyOnClose={destroyOnClose}
      onClose={onClose}
      footer={showFooter && footerNode}
    >
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined spin style={{ fontSize: 24 }} />}
        tip={loadingText}
      >
        {children}
      </Spin>
    </Drawer>
  )
}
