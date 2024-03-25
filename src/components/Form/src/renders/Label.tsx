import { isFunction } from 'lodash-es'

import { SchemaContext, ValuesContext } from '../contexts'

function Label() {
  const { schema } = useContext(SchemaContext)
  const { label, field } = schema
  const { values } = useContext(ValuesContext)

  const labelNode = isFunction(label) ? label({ field, values }) : label

  return <span>{labelNode}</span>
}

export default memo(Label)
