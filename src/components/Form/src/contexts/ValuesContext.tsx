import { createContext } from 'react'

interface Values<V = any> {
  values: V
  setValues: (values: V) => void
}

export const ValuesContext = createContext<Values>({
  values: {},
  setValues: () => {},
})

export function ValuesProvider<V = any>({ values, setValues, children }: PWC<Values<V>>) {
  return (
    <ValuesContext.Provider value={{ values, setValues }}>
      {children}
    </ValuesContext.Provider>
  )
}
