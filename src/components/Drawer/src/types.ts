export interface DrawerProps {
  title: string
  /** @default false */
  isDetail?: boolean
  open: boolean
  /** @default true */
  destroyOnClose?: boolean
  /** @default false */
  maskClosable?: boolean
  /** @default false */
  loading?: boolean
  loadingText?: string
  /** @default '50%' */
  width?: number | string
  /** @default true */
  showFooter?: boolean
  /** @default false */
  confirmLoading?: boolean
  footer?: RN

  onConfirm?: () => void
  onClose?: () => void
}
