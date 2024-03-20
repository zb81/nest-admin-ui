import { LoadingOutlined } from '@ant-design/icons'
import { Button, Drawer, Space, Spin } from 'antd'
import type { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  title: string
  /**
   * @default false
   */
  isDetail?: boolean
  open: boolean
  /**
   * @default true
   */
  destroyOnClose?: boolean
  /**
   * @default false
   */
  maskClosable?: boolean
  /**
   * @default false
   */
  loading?: boolean
  loadingText?: string
  /**
   * @default '50%'
   */
  width?: number | string
  /**
   * @default true
   */
  showFooter?: boolean
  /**
   * @default false
   */
  confirmLoading?: boolean
  footer?: JSX.Element
  onConfirm?: () => void
  onClose?: () => void
}>

export default function BasicDrawer(props: Props) {
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
