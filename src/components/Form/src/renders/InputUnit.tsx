import { isFunction } from 'lodash-es'

import { componentMap, isClearable, isEnterable } from '../component-map'
import { FormPropsContext, SchemaContext } from '../contexts'

interface Props {
  value?: any
  onChange?: (v: any) => void
}

function InputUnit(props: Props) {
  const { value, onChange } = props
  const { schema } = useContext(SchemaContext)
  const { formProps } = useContext(FormPropsContext)
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
      // onPressEnter={() => {
      //   console.log('enter...')
      // }}
      onChange={onChange}
      {...(isClearable(component) ? { allowClear: formProps.allowClear } : {})}
      {...(isEnterable(component) ? { onPressEnter: formProps.onSubmit } : {})}
      {...componentProps}
      {...placeholderProps}
    />
  )
}

export default memo(InputUnit) as typeof InputUnit
