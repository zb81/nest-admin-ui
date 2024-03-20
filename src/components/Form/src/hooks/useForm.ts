import { Form } from 'antd'

export function useForm<V = any>() {
  const [form] = Form.useForm<V>()

  return { form } as const
}
