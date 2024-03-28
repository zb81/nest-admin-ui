import type { TableColumnsType } from 'antd'

import type { ColumnProps } from '../types'

export function getAntColumns<R extends object>(columns: ColumnProps<R>[], showIndexColumn: boolean) {
  const ret: TableColumnsType<R> = columns
    .map((col) => {
      return {
        ...col,
        fixed: col.pinnedLeft ? 'left' : col.pinnedRight ? 'right' : undefined,
      }
    })

  if (showIndexColumn) {
    ret.unshift({
      title: '序号',
      key: '$index$',
      align: 'center',
      render: (_, __, index) => index + 1,
    })
  }

  return ret
}
