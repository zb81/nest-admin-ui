import { PRIMARY_COLOR_KEY } from '@/constants/storage-keys'

export function usePrimaryColor() {
  const [primaryColor, setPrimaryColor] = useLocalStorageState<string>(
    PRIMARY_COLOR_KEY,
    { defaultValue: import.meta.env.VITE_APP_PRIMARY_COLOR },
  )

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor!)
  }, [primaryColor])

  return [primaryColor!, setPrimaryColor] as const
}
