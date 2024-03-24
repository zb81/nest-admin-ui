import type { TableColumnsType } from 'antd'
import { isBoolean } from 'lodash-es'

import type { ColumnProps } from '../types'

export function getAntColumns<R extends object>(columns: ColumnProps<R>[], showIndexColumn: boolean) {
  const ret: TableColumnsType<R> = columns
    .filter(col => isBoolean(col.show) && col.show)
    .map((col) => {
      return { ...col }
    })

  if (showIndexColumn) {
    ret.unshift({
      title: '序号',
      key: '$index$',
      align: 'center',
      width: 60,
      render: (_, __, index) => index + 1,
    })
  }

  return ret
}
