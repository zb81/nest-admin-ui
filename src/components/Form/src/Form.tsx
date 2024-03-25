import { Form as AntForm, Row } from 'antd'
import { merge } from 'lodash-es'

import FormItem from './FormItem'
import { FormPropsProvider } from './contexts/FormPropsContext'
import { SchemaProvider } from './contexts/SchemaContext'
import { ValuesProvider } from './contexts/ValuesContext'
import { defaultFormProps } from './props'
import type { FormProps } from './types'

function Form<V = any>(props: FormProps<V>) {
  props = merge({}, defaultFormProps, props)

  const {
    schemas,
    searchMode,
    rowProps,
    allowClear,
    labelWidth,
    colProps,
    submitOnEnter,
    onPressEnter,
    ...otherProps
  } = props

  const [values, setValues] = useState(otherProps.form?.getFieldsValue())

  return (
    <AntForm
      {...otherProps}
      onValuesChange={(_, v) => setValues(v)}
    >
      <FormPropsProvider formProps={props}>
        <ValuesProvider values={values} setValues={setValues}>
          <Row {...rowProps}>
            {Array.isArray(schemas) && schemas.map(schema => (
              <SchemaProvider key={schema.field || schema.key} schema={schema}>
                <FormItem />
              </SchemaProvider>
            ))}
          </Row>
        </ValuesProvider>
      </FormPropsProvider>
    </AntForm>
  )
}

export default memo(Form) as typeof Form
