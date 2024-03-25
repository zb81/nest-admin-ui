import { isFunction } from 'lodash-es'

import { SchemaContext } from '../contexts/SchemaContext'
import { ValuesContext } from '../contexts/ValuesContext'

function Label() {
  const { schema } = useContext(SchemaContext)
  const { label, field } = schema
  const { values } = useContext(ValuesContext)

  const labelNode = isFunction(label) ? label({ field, values }) : label

  return <span>{labelNode}</span>
}

export default memo(Label)
