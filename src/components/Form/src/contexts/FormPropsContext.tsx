import { createContext } from 'react'

import type { FormProps } from '../types'

interface Context {
  formProps: FormProps
}

export const FormPropsContext = createContext<Context>({
  formProps: {},
})

export function FormPropsProvider({ formProps, children }: PWC<Context>) {
  return (
    <FormPropsContext.Provider value={{ formProps }}>
      {children}
    </FormPropsContext.Provider>
  )
}
