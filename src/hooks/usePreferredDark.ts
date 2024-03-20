import { useEffect, useState } from 'react'

import { logger } from '@/utils/logger'

const isSupported = window && 'matchMedia' in window && typeof window.matchMedia === 'function'

const iconLink = document.querySelector('link[rel~="icon"]') as HTMLLinkElement

let queryList: MediaQueryList

export function usePreferredDark() {
  if (!isSupported)
    logger.warn('`matchMedia` is not supported in your browser.')
  else
    queryList = window.matchMedia('(prefers-color-scheme: dark)')

  const [matches, setMatches] = useState(isSupported ? queryList.matches : false)

  if (isSupported) {
    queryList.addEventListener('change', (e) => {
      setMatches(e.matches)
    })
  }

  useEffect(() => {
    iconLink.href = `/nest${matches ? '-dark' : ''}.svg`
  }, [matches])

  return matches
}
