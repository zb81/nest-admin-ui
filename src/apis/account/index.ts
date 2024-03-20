import type { AccountMenuVo, AccountProfileVo } from '@/apis/account/types'
import { request } from '@/utils/request'

export * from './types'

export function getAccountProfile() {
  return request.get<AccountProfileVo>('/account/profile')
}

export function getAccountMenus() {
  return request.get<AccountMenuVo[]>('/account/menus')
}

export function getAccountPermissions() {
  return request.get<string[]>('/account/permissions')
}
