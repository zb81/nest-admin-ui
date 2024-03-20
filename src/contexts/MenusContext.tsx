import { createContext } from 'react'

import type { AccountMenuVo } from '@/apis/account'

interface Menus {
  menus: AccountMenuVo[]
  setMenus: (m: AccountMenuVo[]) => void
}

export const MenusContext = createContext<Menus>({
  menus: [],
  setMenus: () => {},
})
