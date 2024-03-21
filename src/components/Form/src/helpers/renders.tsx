import { isFunction } from 'lodash-es'

import { componentMap, isClearable } from '../component-map'
import type { FormSchema, InputUnitProps } from '../types'

export function FormItemLabel<V = any>(props: { schema: FormSchema<V>, values: V }) {
  const { schema, values } = props
  const { label } = schema

  const labelNode = isFunction(label) ? label({ field: schema.field, values }) : label

  return <span>{labelNode}</span>
}

export function InputUnit(props: { schema: FormSchema } & InputUnitProps) {
  const { value, onChange, schema, allowClear = true } = props
  const { component, componentProps, render } = schema

  // component 为空，或者用户传入 render
  if (!component || isFunction(render))
    return null

  const InputComponent = componentMap.get(component)
  if (!InputComponent)
    return null

  const placeholderProps: { placeholder?: string } = {}

  if (component.includes('Input'))
    placeholderProps.placeholder = '请输入'

  if (component.includes('Select') || component.includes('Picker'))
    placeholderProps.placeholder = '请选择'

  const clearable = isClearable(component)

  return (
    <InputComponent
      className="w-full"
      value={value}
      // onPressEnter={() => {
      //   console.log('enter...')
      // }}
      onChange={onChange}
      {...(clearable ? { allowClear } : {})}
      {...componentProps}
      {...placeholderProps}
    />
  )
}
