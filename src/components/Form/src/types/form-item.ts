import type { ColProps } from 'antd'

import type { FormProps } from './form'
import type { FormSchema } from './form-schema'

export interface FormItemProps<V = any> {
  schema: FormSchema
  field: Extract<keyof V, string>
  formProps: FormProps
  values: V

  // 以下为 Antd Form.Item 属性
  // 参考 https://ant-design.antgroup.com/components/form-cn#formitem
  label: RN
  colon?: boolean
  labelCol?: ColProps
  labelAlign?: 'left' | 'right'
  required?: boolean
  wrapperCol?: ColProps
}
