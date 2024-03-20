import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { isLoggedIn } from '@/utils/auth'

export default function CheckLoggedIn({ children }: PropsWithChildren) {
  if (!isLoggedIn())
    return <Navigate to="/auth" replace />

  return children
}
