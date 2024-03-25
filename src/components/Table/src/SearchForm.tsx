import { Card } from 'antd'

import type { FormProps, FormSchema } from '@/components/Form'
import { Form, useForm } from '@/components/Form'

interface Props {
  schemas: FormSchema[]
  formProps?: FormProps
}

function SearchForm({ schemas, formProps }: Props) {
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
}

export default memo(SearchForm) as typeof SearchForm
