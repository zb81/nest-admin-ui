import { isFunction } from 'lodash-es'

import { componentMap } from '@/components/Form/src/component-map'
import type { FormSchema, InputUnitProps } from '@/components/Form/src/types'

export function FormItemLabel<V = any>(props: { schema: FormSchema<V>, values: V }) {
  const { schema, values } = props
  const { label } = schema

  const labelNode = isFunction(label) ? label({ field: schema.field, values }) : label

  return <span>{labelNode}</span>
}

export function InputUnit(props: { schema: FormSchema } & InputUnitProps) {
  const { value, onChange, schema } = props
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

  return (
    <InputComponent
      className="w-full"
      value={value}
      onChange={onChange}
      {...componentProps}
      {...placeholderProps}
    />
  )
}
