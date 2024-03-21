import type { ColProps } from 'antd'

import type { FormSchema } from './form-schema.type'
import type { FormProps } from './form.type'

export interface FormItemProps<V = any> {
  field?: Extract<keyof V, string>
  schema: FormSchema
  formProps: FormProps
  values: V
  className?: string
  allowClear?: boolean

  // 以下为 Antd Form.Item 属性
  // 参考 https://ant-design.antgroup.com/components/form-cn#formitem
  label: RN
  colon?: boolean
  labelCol?: ColProps
  labelAlign?: 'left' | 'right'
  required?: boolean
  wrapperCol?: ColProps
}
