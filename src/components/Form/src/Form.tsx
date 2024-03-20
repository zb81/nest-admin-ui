import { Form as AntForm, Row } from 'antd'
import { useState } from 'react'

import FormItem from './FormItem'
import { FormItemLabel } from './helpers/renders'
import type { FormProps } from './types'

export default function Form<V = any>(props: FormProps<V>) {
  const {
    form,
    schemas = [],
    labelAlign = 'right',
    rowProps = {},
    colon = false,
    layout = 'horizontal',
    variant = 'outlined',
    size = 'middle',
    labelCol = {},
    initialValues,
  } = props

  const [values, setValues] = useState(initialValues as V)

  return (
    <AntForm<V>
      form={form}
      variant={variant}
      size={size}
      colon={colon}
      layout={layout}
      labelAlign={labelAlign}
      labelCol={labelCol}
      initialValues={initialValues}
      onValuesChange={(_, v) => setValues(v)}
    >
      <Row {...rowProps}>
        {schemas.map(schema => (
          <FormItem
            key={schema.field}
            formProps={props}
            values={values}
            schema={schema}
            field={schema.field}
            label={<FormItemLabel schema={schema} values={values} />}
            {...schema.formItemProps}
          />
        ))}
      </Row>
    </AntForm>
  )
}
