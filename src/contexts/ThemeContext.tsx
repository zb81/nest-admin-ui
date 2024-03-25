import { createContext } from 'react'

import type { ColorMode } from '@/components/ToggleTheme'

interface IThemeColor {
  color: string
  setColor: (m: string) => void
}

export const ThemeColorContext = createContext<IThemeColor>({
  color: import.meta.env.VITE_APP_PRIMARY_COLOR,
  setColor: () => {},
})

export function ThemeColorProvider({ color, setColor, children }: PWC<IThemeColor>) {
  return (
    <ThemeColorContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeColorContext.Provider>
  )
}

interface IColorMode {
  mode: ColorMode
  setMode: (m: ColorMode) => void
}

export const ColorModeContext = createContext<IColorMode>({
  mode: 'auto',
  setMode: () => { },
})

export function ColorModeProvider({ mode, setMode, children }: PWC<IColorMode>) {
  return (
    <ColorModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ColorModeContext.Provider>
  )
}
