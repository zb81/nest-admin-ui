import { request } from '@/utils/request'

import type { MenuDto, MenuTreeVo } from './types'

export function getMenuTree() {
  return request.get<MenuTreeVo[]>('/system/menu/tree')
}

export function createMenu(data: MenuDto) {
  return request.post('/system/menu', { data })
}

export function updateMenu(data: MenuDto) {
  return request.put(`/system/menu/${data.id}`, { data })
}

export * from './types'
