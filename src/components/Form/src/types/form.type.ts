import type { ColProps, FormInstance, RowProps } from 'antd'

import type { FormSchema } from './form-schema.type'

export interface FormProps<V = any> {
  schemas?: FormSchema<V>[]
  rowProps?: RowProps
  colProps?: ColProps
  /** 搜索表单模式，该模式没有验证提示 @default false */
  searchMode?: boolean
  className?: string
  /** @default true */
  allowClear?: boolean
  /** 回车提交 @default false */
  submitOnEnter?: boolean

  // 以下为 antd form 属性
  // 参考 https://ant-design.antgroup.com/components/form-cn#form
  form?: FormInstance<V>
  initialValues?: Recordable
  colon?: boolean
  layout?: 'horizontal' | 'vertical' | 'inline'
  variant?: 'outlined' | 'borderless' | 'filled'
  labelAlign?: 'left' | 'right'
  labelWidth?: number | string
  labelCol?: ColProps
  wrapperCol?: ColProps
  size?: 'small' | 'middle' | 'large'
}
