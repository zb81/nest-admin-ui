export interface RoleDto {
  id?: number
  value: string
  name: string
  status: number
  remark?: string
  menuIds: number[]
}

export interface RoleVo {
  id: number
  name: string
  value: string
  remark: string | null
  status: number
  default: boolean | null
  createdAt: string
  updatedAt: string
}
