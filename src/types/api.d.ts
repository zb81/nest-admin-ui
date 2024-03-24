interface ResWrapper<T = any> {
  code: number
  message: string
  data?: T
}

interface PaginationResWrapper<T = any> {
  list: T[]
  pageNo: number
  pageSize: number
  total: number
  totalPage: number
}

interface SortDto {
  sortField?: string
  sortOrder?: string
}

interface PaginationDto extends SortDto {
  pageNo: number
  pageSize: number
}
