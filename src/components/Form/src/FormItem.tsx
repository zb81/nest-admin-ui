import { Form as AntForm, Col } from 'antd'
import classNames from 'classnames'

import { FormPropsContext } from './contexts/FormPropsContext'
import { SchemaContext } from './contexts/SchemaContext'
import { ValuesContext } from './contexts/ValuesContext'
import { getFormItemCol, getLabelCol, getRequired, getRules, getShow } from './helper'
import InputUnit from './renders/InputUnit'
import Label from './renders/Label'

function FormItem() {
  const { values } = useContext(ValuesContext)
  const { formProps } = useContext(FormPropsContext)
  const { schema } = useContext(SchemaContext)

  return (
    getShow(schema, values) && (
      <Col {...getFormItemCol(schema, formProps)}>
        <AntForm.Item
          {...schema.formItemProps}
          className={classNames({ 'mb-0': formProps.searchMode })}
          {...getLabelCol(schema, formProps)}
          name={schema.field}
          label={<Label />}
          required={getRequired(schema, values)}
          rules={getRules(schema, values)}
        >
          <InputUnit />
        </AntForm.Item>
      </Col>
    )
  )
}

export default memo(FormItem)
