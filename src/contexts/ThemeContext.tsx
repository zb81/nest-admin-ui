import { createContext } from 'react'

import type { ColorMode } from '@/components/ToggleTheme'

interface IThemeColor {
  color: string
  setColor: (m: string) => void
}

interface IColorMode {
  mode: ColorMode
  setMode: (m: ColorMode) => void
}

export const ThemeColorContext = createContext<IThemeColor>({
  color: import.meta.env.VITE_APP_PRIMARY_COLOR,
  setColor: () => {},
})
export const ColorModeContext = createContext<IColorMode>({
  mode: 'auto',
  setMode: () => { },
})
