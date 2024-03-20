export interface CreateRoleDto {
  value: string
  name: string
  status: number
  remark?: string
  menuIds: number[]
  [property: string]: any
}
