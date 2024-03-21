import type { FormProps, FormSchema } from '@/components/Form'

import type { ColumnProps } from './column.type'

export interface TableProps<Record = any> {
  columns: ColumnProps<Record>[]
  /** 列表查询接口 */
  api: (...args: any) => Promise<any>
  /** @default 'id' */
  rowKey?: string
  /** 是否显示序号列 @default true */
  showIndexColumn?: boolean
  /** 是否显示边框 @default true */
  bordered?: boolean
  /** 表格尺寸 @default 'middle' */
  size?: 'small' | 'middle' | 'large'

  searchFormSchemas?: FormSchema[]
  searchFormProps?: FormProps

  /** 表格上方的操作按钮 */
  toolbarActions?: RN
  /** 表格操作列 */
  rowActions?: RN

  /** 是否开启分页功能 @default true */
  pagination?: boolean
}
