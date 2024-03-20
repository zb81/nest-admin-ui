export interface AccountProfileVo {
  id: number
  createdAt: string
  updatedAt: string
  username: string
  nickname: any
  avatar: any
  email: string
  phone: any
  remark: any
  status: number
}

export interface AccountMenuVo {
  id: number
  createdAt: string
  updatedAt: string
  parentId: any
  name: string
  permission: string
  type: number
  icon: string
  orderNo: number
  keepAlive: number
  show: number
  status: number
  component: string
  path: string
  children?: AccountMenuVo[]
}
