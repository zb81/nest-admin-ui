export interface ColumnProps<Record = any> {
  title: RN
  dataIndex: Extract<keyof Record, string>
  key?: string

  /** @default 'center' */
  align?: 'left' | 'right' | 'center'

  render?: (text: any, record: any, index: number) => RN

  /** @default true */
  show?: boolean

  /** @default false */
  pinnedLeft?: boolean

  /** @default false */
  pinnedRight?: boolean

  order?: number

  /** @default false */
  sortable?: boolean
}
