import type { ColumnProps } from './column.type'

export interface ColumnsSettingProps {
  columns: ColumnProps[]
  showIndexColumn: boolean
  onChange: (columns: ColumnProps[]) => void
  onShowIndexColumnChange: (show: boolean) => void
}
