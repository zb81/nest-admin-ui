import { Button, Space } from 'antd'
import type { ButtonType } from 'antd/es/button'

import { FormPropsContext, InstanceContext } from '../contexts'

interface Props {
  /** 取消按钮文本 @default '重置' */
  cancelText?: string
  /** 确认按钮文本 @default '提交' */
  confirmText?: string

  /** 取消按钮类型 @default 'default' */
  cancelType?: ButtonType
  /** 确认按钮类型 @default 'primary' */
  confirmType?: ButtonType
}

function FormActions(props: Props) {
  const {
    cancelText = '重置',
    confirmText = '确认',
    cancelType = 'default',
    confirmType = 'primary',
  } = props

  const { formProps } = useContext(FormPropsContext)
  const { submitOnReset, onSubmit } = formProps
  const { instance } = useContext(InstanceContext)

  function handleReset() {
    instance?.resetFields()
    if (submitOnReset)
      onSubmit?.()
  }

  return (
    <Space>
      <Button type={cancelType} onClick={handleReset}>{cancelText}</Button>
      <Button type={confirmType} onClick={onSubmit}>{confirmText}</Button>
    </Space>
  )
}

export default memo(FormActions) as typeof FormActions
