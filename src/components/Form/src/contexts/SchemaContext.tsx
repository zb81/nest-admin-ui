import { createContext } from 'react'

import type { FormSchema } from '../types'

interface Context {
  schema: FormSchema
}

export const SchemaContext = createContext<Context>({
  schema: {},
})

export function SchemaProvider({ schema, children }: PWC<Context>) {
  return (
    <SchemaContext.Provider value={{ schema }}>
      {children}
    </SchemaContext.Provider>
  )
}
