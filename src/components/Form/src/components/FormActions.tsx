import type { FormInstance } from 'antd'
import { Button, Space } from 'antd'
import type { ButtonType } from 'antd/es/button'

interface Props {
  form: FormInstance

  /** 取消按钮文本 @default '重置' */
  cancelText?: string
  /** 确认按钮文本 @default '提交' */
  confirmText?: string

  /** 取消按钮类型 @default 'default' */
  cancelType?: ButtonType
  /** 确认按钮类型 @default 'primary' */
  confirmType?: ButtonType
}

const FormActions = memo((props: Props) => {
  const {
    // form,
    cancelText = '重置',
    confirmText = '确认',
    cancelType = 'default',
    confirmType = 'primary',
  } = props

  // if (!form)
  //   logger.warn('FormActions 组件需要配合 form 组件使用')

  return (
    <Space>
      <Button type={cancelType}>{cancelText}</Button>
      <Button type={confirmType}>{confirmText}</Button>
    </Space>
  )
})

FormActions.displayName = 'FormActions'

export default FormActions
