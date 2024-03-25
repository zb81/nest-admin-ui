import type { Rule } from 'antd/es/form'
import { isFunction, isNumber, isString } from 'lodash-es'

import type { FormProps, FormSchema } from '@/components/Form'

export function getLabelCol(schema: FormSchema, formProps: FormProps) {
  const {
    labelCol = {},
    wrapperCol = {},
  } = schema.formItemProps || {}

  const {
    labelWidth,
    labelCol: globalLabelCol = {},
    wrapperCol: globalWrapperCol = {},
    layout,
  } = formProps

  if (!labelWidth && !globalLabelCol && !globalWrapperCol)
    return { labelCol, wrapperCol }

  let width = labelWidth
  if (width)
    width = isNumber(width) ? `${width}px` : width

  return {
    labelCol: { style: { width }, ...{ ...globalLabelCol, ...labelCol } },
    wrapperCol: {
      style: { width: layout === 'vertical' ? '100%' : `calc(100% - ${width})` },
      ...{ ...globalWrapperCol, ...wrapperCol },
    },
  }
}

export function getFormItemCol(schema: FormSchema, formProps: FormProps) {
  const { colProps: globalColProps } = formProps
  const { colProps } = schema

  return {
    ...globalColProps,
    ...colProps,
  }
}

export function getShow<V = any>(schema: FormSchema, values: V) {
  const { show = true, field } = schema
  return isFunction(show) ? show({ field, values }) : show
}

export function getRequired<V = any>(schema: FormSchema, values: V) {
  const { required = false, field } = schema
  return isFunction(required) ? required({ field, values }) : required
}

function getRequiredMessage(schema: FormSchema) {
  const { component, label } = schema
  if (!component || !isString(label))
    return `请输入`

  if (component.includes('Input'))
    return `请输入${label}`

  if (component.includes('Select') || component.includes('Picker'))
    return `请选择${label}`

  return '请输入'
}

export function getRules<V = any>(schema: FormSchema, values: V) {
  const ret: Rule[] = [...schema.rules || []]
  const required = getRequired(schema, values)
  if (required)
    ret.push({ message: getRequiredMessage(schema), required })

  return ret
}
