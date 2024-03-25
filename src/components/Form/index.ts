import type { FormInstance } from 'antd'
import { Form as AntForm } from 'antd'

import Form from './src/Form'

export { Form }

export * from './src/types'

export function useForm(form?: FormInstance) {
  return AntForm.useForm(form)
}
