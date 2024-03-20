import type { ColorMode } from '@/components/ToggleTheme'
import { usePreferredDark } from '@/hooks/usePreferredDark'

export function useDark(mode: ColorMode) {
  const preferredDark = usePreferredDark()
  return mode === 'dark' || (preferredDark && mode !== 'light')
}
