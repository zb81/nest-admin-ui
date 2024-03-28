import type { TableProps as AntTableProps } from 'antd'

import type { FormProps, FormSchema } from '@/components/Form'

import type { ActionColumn, ColumnProps } from './column.type'

type Res<R> = R[] | PaginationResWrapper<R>

export interface TableProps<R = any> {
  title?: RN
  columns: ColumnProps<R>[]
  /** 列表查询接口 */
  api: (...args: any) => Promise<[null, Error] | [Res<R>, null]>
  /** @default 'id' */
  rowKey?: string
  /** 是否显示序号列 @default true */
  showIndexColumn?: boolean
  /** 是否显示边框 @default true */
  bordered?: boolean
  /** 表格尺寸 @default 'middle' */
  size?: Size

  /** 操作列配置，没传则不展示 */
  actionColumn?: ActionColumn<R>

  searchFormSchemas?: FormSchema[]
  searchFormProps?: FormProps

  /** 表格上方的操作按钮 */
  toolbarActions?: RN
  /** 表格操作列 */
  rowActions?: RN

  /** 是否开启分页功能 @default true */
  enablePagination?: boolean

  onChange?: AntTableProps['onChange']
}

export interface TableInstance {
  // getSelectedRow: () => R[]
  // getSelectedRowKeys: () => React.Key[]
  // clearSelectedRow: () => void
  reload: (() => Promise<void>) | (() => void)
}
