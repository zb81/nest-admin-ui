import type { TableColumnType } from 'antd'

export interface ColumnProps<R = any> extends TableColumnType<R> {
  id?: string

  title?: RN

  /** @default false */
  pinnedLeft?: boolean

  /** @default false */
  pinnedRight?: boolean

  order?: number
}

export interface ActionColumn<R = any> {
  /** 是否展示操作列 @default true */
  show?: boolean | (() => boolean)
  /** 表格操作列的标题，默认 `'操作'` */
  title?: RN
  /** 表格操作列自定义渲染函数 */
  render?: (value: any, record: R, index: number) => RN
  /** 删除接口，用于表格操作列的删除按钮 */
  deleteApi?: (id: Key) => Promise<[null, Error] | [unknown, null]>
  /** 点击操作列的编辑按钮回调 */
  onRowEditAction?: (value: any, record: R, index: number) => void
  /** 是否展示编辑按钮 @default true */
  editable?: boolean | ((value: any, record: R, index: number) => boolean)
  /** 是否展示删除按钮 @default true */
  deleteable?: boolean | ((value: any, record: R, index: number) => boolean)
}
