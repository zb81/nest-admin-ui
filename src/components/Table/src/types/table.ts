import type { ColumnProps, TableProps } from 'antd/es/table'

export interface SorterResult<T = any> {
  column: ColumnProps<T>
  order: 'ascend' | 'descend'
  field: string
  columnKey: string
}

export interface FetchParams {
  searchInfo?: Recordable
  page?: number
  sortInfo?: Recordable
  filterInfo?: Recordable
}

export interface FetchSetting {
  /** 当前页的字段 */
  pageField: string
  /** 每页显示多少条的字段 */
  sizeField: string
  /** 请求结果列表字段  支持 a.b.c */
  listField: string
  /** 请求结果总数字段  支持 a.b.c */
  totalField: string
}

export interface TableSetting {
  redo?: boolean
  size?: boolean
  setting?: boolean
  settingCache?: boolean
  fullScreen?: boolean
}

export interface BasicTableProps<T = any> extends TableProps<T> {

}

export interface BasicTableInstance {
  expandAll: () => void
  collapseAll: () => void
}
