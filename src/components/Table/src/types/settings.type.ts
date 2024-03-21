import type { ColumnProps } from './column.type'

export interface ColumnsSettingProps {
  columns: ColumnProps<any>[]
  showIndexColumn: boolean
  onChange: (columns: ColumnProps<any>[]) => void
  onShowIndexColumnChange: (show: boolean) => void
}
