import { useRequest } from 'ahooks'
import { Table as AntTable, Divider } from 'antd'
import type { TableColumnsType } from 'antd'
import { memo, useState } from 'react'

import SearchForm from './SearchForm'
import ColumnsSetting from './settings/ColumnsSetting'
import type { ColumnProps, TableProps } from './types'

function genAntColumns(columns: ColumnProps[], showIndexColumn: boolean) {
  const ret: TableColumnsType<any> = columns.filter(col => col.show).map((col) => {
    return {
      title: col.title,
      dataIndex: col.dataIndex,
      key: col.key,
      align: col.align,
      render: col.render,
    }
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

const Table = memo((props: TableProps) => {
  const {
    columns,
    api,
    rowKey = 'id',
    showIndexColumn = true,
    size = 'middle',
    pagination = true,
    bordered = true,
    toolbarActions,
    searchFormSchemas,
    searchFormProps,
  } = props

  const [tableData, setTableData] = useState([])
  const [internalShowIndex, setInternalShowIndex] = useState(true)

  const finalShowIndex = showIndexColumn && internalShowIndex

  useRequest(api, {
    onSuccess: ([data, err]) => {
      if (!err) {
        if (pagination)
          setTableData(data.list)
        else
          setTableData(data)
      }
    },
  })

  const [antColumns, setAntColumns] = useState(genAntColumns(columns, finalShowIndex))

  const showSearchForm = searchFormSchemas && searchFormSchemas.length > 0

  return (
    <>
      {showSearchForm && (
        <SearchForm
          schemas={searchFormSchemas}
          formProps={searchFormProps}
        />
      )}

      <div className="bg-white dark:bg-dark-bg p-2">
        <div className="flex justify-between items-center mb-2">
          <h1>Table</h1>
          <div>
            {toolbarActions}
            {toolbarActions && <Divider type="vertical" />}

            <ColumnsSetting
              showIndexColumn={finalShowIndex}
              onShowIndexColumnChange={show => setInternalShowIndex(show)}
              columns={columns}
              onChange={cols => setAntColumns(genAntColumns(cols, finalShowIndex))}
            />
          </div>
        </div>

        <AntTable
          size={size}
          rowKey={rowKey}
          bordered={bordered}
          columns={antColumns}
          dataSource={tableData}
        />
      </div>
    </>

  )
})

Table.displayName = 'Table'

export default Table
