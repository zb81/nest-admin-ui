import type { TableColumnType } from 'antd'

export interface ColumnProps<R extends object> extends TableColumnType<R> {
  title?: RN

  /** @default true */
  show?: boolean

  /** @default false */
  pinnedLeft?: boolean

  /** @default false */
  pinnedRight?: boolean

  order?: number
}
