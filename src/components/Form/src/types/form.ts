import type { ColProps, FormInstance, RowProps } from 'antd'

import type { FormSchema } from './form-schema'

export interface FormProps<V = any> {
  schemas?: FormSchema<V>[]
  rowProps?: RowProps
  colProps?: ColProps

  // 以下为 antd form 属性
  // 参考 https://ant-design.antgroup.com/components/form-cn#form
  form?: FormInstance<V>
  initialValues?: Recordable
  colon?: boolean
  layout?: 'horizontal' | 'vertical' | 'inline'
  variant?: 'outlined' | 'borderless' | 'filled'
  labelAlign?: 'left' | 'right'
  /** label 标签宽度 */
  labelWidth?: number | string
  /** label 标签 Col 配置 */
  labelCol?: ColProps
  wrapperCol?: ColProps
  size?: 'small' | 'middle' | 'large'
}
