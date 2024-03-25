import { request } from '@/utils/request'

import type { MenuDto, MenuTreeVo } from './types'

export function getMenuTree(params?: any) {
  return request.get<MenuTreeVo[]>('/system/menu/tree', { params })
}

export function createMenu(data: MenuDto) {
  return request.post('/system/menu', { data })
}

export function updateMenu(data: MenuDto) {
  return request.put(`/system/menu/${data.id}`, { data })
}

export function deleteMenu(id: number) {
  return request.delete(`/system/menu/${id}`)
}

export * from './types'
