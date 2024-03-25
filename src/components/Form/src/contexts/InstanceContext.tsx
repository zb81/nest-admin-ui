import type { FormInstance as AntFormInstance } from 'antd'
import { createContext } from 'react'

interface Context {
  instance?: AntFormInstance
}

export const InstanceContext = createContext<Context>({})

export function InstanceProvider({ instance, children }: PWC<Context>) {
  return (
    <InstanceContext.Provider value={{ instance }}>
      {children}
    </InstanceContext.Provider>
  )
}
