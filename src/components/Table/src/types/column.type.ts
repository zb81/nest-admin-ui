import type { TableColumnType } from 'antd'

export interface ColumnProps<R = any> extends TableColumnType<R> {
  id: string

  title?: RN

  /** @default false */
  pinnedLeft?: boolean

  /** @default false */
  pinnedRight?: boolean

  order?: number
}
