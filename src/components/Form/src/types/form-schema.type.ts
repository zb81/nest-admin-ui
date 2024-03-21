import type { ColProps } from 'antd'
import type { Rule } from 'antd/es/form'

import type { ComponentType } from './components.type'
import type { FormItemProps } from './form-item.type'

interface RenderParams<V> {
  values: V
  field?: string
}
type RenderCallback<V, R = RN> = (p: RenderParams<V>) => R

export interface FormSchema<V = any> {
  key?: string
  field?: Extract<keyof V, string>
  label?: string | RN | RenderCallback<V>
  required?: boolean | RenderCallback<V, boolean>
  rules?: Rule[]
  /** @default 'onChange' */
  validateTrigger?: string[] | string
  helpMessage?: string | string[] | RenderCallback<V, string | string[]>
  show?: boolean | RenderCallback<V, boolean>
  /** 如果指定 render，component 将会失效 */
  render?: RenderCallback<V>
  /** 需要渲染的组件名称，在 `componentMap` 中定义 */
  component?: ComponentType
  /** 需要渲染的组件属性 */
  componentProps?: object
  /** FormItem 组件的属性 */
  formItemProps?: Partial<FormItemProps>
  /** 控制整个 FormItem 的 Col */
  colProps?: ColProps
}

// Generate all schemas with `component` and `componentProps`
// TODO: typescript performance issue
// export type FormSchema<V = any> = {
//   [T in ComponentType]: _FormSchema<V, T>
// }[ComponentType]
