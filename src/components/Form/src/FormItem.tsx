import { Form as AntForm, Col } from 'antd'

import { InputUnit } from '@/components/Form/src/helpers/renders'

import { getFormItemCol, getLabelCol, getRequired, getRules, getShow } from './helpers/getters'
import type { FormItemProps } from './types/form-item'

export default function FormItem(props: FormItemProps) {
  const {
    schema,
    values,
    formProps,
    field,
    label,
    colon,
  } = props

  return (
    getShow(schema, values) && (
      <Col {...getFormItemCol(schema, formProps)}>
        <AntForm.Item
          name={field}
          label={label}
          colon={colon}
          required={getRequired(schema, values)}
          {...getLabelCol(schema, formProps)}
          rules={getRules(schema, values)}
        >
          <InputUnit schema={schema} />
        </AntForm.Item>
      </Col>
    )
  )
}
