import { createContext } from 'react'

interface Context {
  permissions: string[]
  setPermissions: (value: string[]) => void
}

export const PermissionsContext = createContext<Context>({
  permissions: [],
  setPermissions: () => {},
})

export function PermissionsProvider({ permissions, setPermissions, children }: PWC<Context>) {
  return (
    <PermissionsContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionsContext.Provider>
  )
}
