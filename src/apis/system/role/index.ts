import { request } from '@/utils/request'

import type { RoleDto, RoleVo } from './types'

export function getRoleList(params: any) {
  return request.get<RoleVo[]>('/system/role', { params })
}

export function createRole(data: RoleDto) {
  return request.post('/system/role', { data })
}

export function updateRole(data: RoleDto) {
  return request.put(`/system/role/${data.id}`, { data })
}

export function deleteRole(id: number) {
  return request.delete(`/system/role/${id}`)
}

export * from './types'
