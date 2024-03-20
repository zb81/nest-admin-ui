import { ACCESS_TOKEN_KEY } from '@/constants/storage-keys'
import { localCache } from '@/utils/cache'

export function isLoggedIn() {
  return !!localCache.get(ACCESS_TOKEN_KEY)
}
