import { Form as AntForm, Row } from 'antd'
import { merge } from 'lodash-es'

import FormItem from './FormItem'
import { FormPropsProvider, InstanceProvider, SchemaProvider, ValuesProvider } from './contexts'
import { defaultFormProps } from './props'
import type { FormInstance, FormProps } from './types'

const Form = forwardRef<FormInstance, FormProps>((props, ref) => {
  props = merge({}, defaultFormProps, props)

  const {
    schemas,
    searchMode,
    rowProps,
    allowClear,
    labelWidth,
    colProps,
    submitOnEnter,
    submitOnReset,
    onSubmit: onPressEnter,
    initialValues = {},
    ...otherProps
  } = props

  const [form] = AntForm.useForm()
  const [internalSchemas, setInternalSchemas] = useState(schemas || [])

  useImperativeHandle(ref, () => ({
    ...form,
    updateSchema: (field, replacer) => {
      const idx = internalSchemas?.findIndex(schema => schema.field === field)
      if (~idx) {
        const s = internalSchemas[idx]
        const newS = replacer(s)
        const arr = [...internalSchemas]
        arr.splice(idx, 1, newS)
        setInternalSchemas(arr)
      }
    },
  }))

  const [values, setValues] = useState(initialValues)

  return (
    <AntForm
      initialValues={initialValues}
      {...otherProps}
      form={form}
      onValuesChange={(_, v) => setValues(v)}
    >
      <InstanceProvider instance={form}>
        <FormPropsProvider formProps={{ ...props }}>
          <ValuesProvider values={values} setValues={setValues}>
            <Row {...rowProps}>
              {internalSchemas.map(schema => (
                <SchemaProvider key={schema.field || schema.key} schema={schema}>
                  <FormItem />
                </SchemaProvider>
              ))}
            </Row>
          </ValuesProvider>
        </FormPropsProvider>
      </InstanceProvider>
    </AntForm>
  )
})

export default memo(Form) as typeof Form
