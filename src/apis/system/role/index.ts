import type { CreateRoleDto } from '@/apis/system/role/types'
import { request } from '@/utils/request'

export function createRole(data: CreateRoleDto) {
  return request.post('/system/role', { data })
}

export * from './types'
