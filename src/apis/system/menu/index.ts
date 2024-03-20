import { request } from '@/utils/request'

import type { CreateMenuDto, MenuTreeVo } from './types'

export function createMenu(data: CreateMenuDto) {
  return request.post('/system/menu', { data })
}

export function getMenuTree() {
  return request.get<MenuTreeVo[]>('/system/menu/tree')
}

export * from './types'
