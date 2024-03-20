import { useLocalStorageState } from 'ahooks'

import type { ColorMode } from '@/components/ToggleTheme'
import { COLOR_MODE_KEY } from '@/constants/storage-keys'

export function useColorMode() {
  const [mode, setMode] = useLocalStorageState<ColorMode>(COLOR_MODE_KEY, {
    defaultValue: 'auto',
    serializer: v => v,
    deserializer: v => v as ColorMode,
  })

  return [mode!, setMode] as const
}
