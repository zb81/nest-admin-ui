import { Card } from 'antd'
import { memo } from 'react'

import type { FormProps, FormSchema } from '@/components/Form'
import { Form, useForm } from '@/components/Form'

interface Props {
  schemas: FormSchema[]
  formProps?: FormProps
}

const SearchForm = memo(({ schemas, formProps }: Props) => {
  const { form } = useForm()

  return (
    <Card className="mb-3" size="small">
      <Form
        form={form}
        schemas={schemas}
        searchMode
        {...formProps}
      />
    </Card>
  )
})

SearchForm.displayName = 'SearchForm'

export default SearchForm
