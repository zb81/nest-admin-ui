import { ReloadOutlined } from '@ant-design/icons'
import { Table as AntTable, Button, Card, Divider, Space } from 'antd'

import { logger } from '@/utils/logger'

import SearchForm from './SearchForm'
import { getAntColumns } from './helpers'
import ColumnsSetting from './settings/ColumnsSetting'
import type { TableProps } from './types'

function Table<R extends object>(props: TableProps<R>) {
  const {
    title,
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

  const [tableData, setTableData] = useState<R[]>([])
  const [internalShowIndex, setInternalShowIndex] = useState(true)
  const [total, setTotal] = useState(0)

  const finalShowIndex = showIndexColumn && internalShowIndex

  const { loading, run } = useRequest(api, {
    onSuccess: ([data, err]) => {
      if (!err) {
        if (Array.isArray(data)) {
          setTableData(data)
        }
        else {
          setTableData(data.list)
          setTotal(data.total)
        }
      }
    },
  })

  const [antColumns, setAntColumns] = useState(getAntColumns(columns, finalShowIndex))

  const showSearchForm = searchFormSchemas && searchFormSchemas.length > 0

  const handleTableChange: TableProps<R>['onChange'] = (pagination, _, sorter) => {
    if (Array.isArray(sorter)) {
      // TODO:
      logger.warn('表格组件暂不支持多字段排序')
      return
    }

    run({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc',
    })
  }

  return (
    <>
      {showSearchForm && (
        <SearchForm
          schemas={searchFormSchemas}
          formProps={{
            onPressEnter: run,
            ...searchFormProps,
          }}
        />
      )}

      <Card size="small">
        <div className="flex justify-between items-center mb-3">
          <h1>{title}</h1>
          <div>
            {toolbarActions}
            {toolbarActions && <Divider type="vertical" />}

            <Space>
              <Button type="text" icon={<ReloadOutlined />} />
              <ColumnsSetting
                showIndexColumn={finalShowIndex}
                onShowIndexColumnChange={setInternalShowIndex}
                columns={columns}
                onChange={cols => setAntColumns(getAntColumns(cols, finalShowIndex))}
              />
            </Space>
          </div>
        </div>

        <AntTable<R>
          pagination={pagination ? { total } : false}

          size={size}
          loading={loading}
          rowKey={rowKey}
          bordered={bordered}
          columns={antColumns}
          dataSource={tableData}
          onChange={handleTableChange}
        />
      </Card>

    </>

  )
}

export default memo(Table) as typeof Table
