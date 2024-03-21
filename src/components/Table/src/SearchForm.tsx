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
    <Form
      form={form}
      className="bg-white dark:bg-dark-bg p-2 mb-3"
      schemas={schemas}
      searchMode
      {...formProps}
    />
  )
})

SearchForm.displayName = 'SearchForm'

export default SearchForm
