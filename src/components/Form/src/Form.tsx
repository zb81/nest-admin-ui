import { Form as AntForm, Row } from 'antd'
import classNames from 'classnames'

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
    className,
    searchMode = false,
    allowClear = true,
  } = props

  const [values, setValues] = useState(initialValues as V)

  return (
    <AntForm<V>
      className={className}
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
            allowClear={allowClear}
            className={classNames({ 'mb-0': searchMode })}
            key={schema.field || schema.key}
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
