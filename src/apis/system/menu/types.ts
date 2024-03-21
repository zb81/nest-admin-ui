export interface MenuTreeVo {
  id: number
  createdAt: string
  updatedAt: string
  parentId: any
  name: string
  path: string
  permission: any
  type: number
  icon: string
  orderNo: number
  component: any
  external: number
  keepAlive: number
  show: number
  status: number
  children?: MenuTreeVo[]
}

export interface MenuDto {
  id?: number
  component?: null | string
  icon?: null | string
  external: number
  keepAlive: number
  status: number
  name: string
  orderNo?: number
  parentId?: number | null
  path?: null | string
  permission?: null | string
  show: number
  type: number
}
