import { ReloadOutlined } from '@ant-design/icons'
import { Table as AntTable, Button, Card, Divider, Space } from 'antd'

import { Form, type FormInstance } from '@/components/Form'
import { logger } from '@/utils/logger'

import { getAntColumns } from './helpers'
import ColumnsSetting from './settings/ColumnsSetting'
import type { TableInstance, TableProps } from './types'

const Table = forwardRef<TableInstance, TableProps>((props, ref) => {
  const {
    title,
    columns,
    api,
    rowKey = 'id',
    showIndexColumn = true,
    size = 'middle',
    enablePagination = true,
    bordered = true,
    toolbarActions,
    searchFormSchemas,
    searchFormProps,
  } = props

  const [tableData, setTableData] = useState<any[]>([])
  const [internalShowIndex, setInternalShowIndex] = useState(true)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [sortParams, setSortParams] = useState<SortDto>()

  const finalShowIndex = showIndexColumn && internalShowIndex
  const formRef = useRef<FormInstance>(null)

  const { loading, run } = useRequest(
    () => api({
      pageNo,
      pageSize,
      ...sortParams,
      ...formRef.current?.getFieldsValue(),
    }),
    {
      refreshDeps: [pageNo, pageSize, sortParams],
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
    },
  )

  const [antColumns, setAntColumns] = useState(getAntColumns(columns, finalShowIndex))

  const showSearchForm = searchFormSchemas && searchFormSchemas.length > 0

  const handleTableChange: TableProps['onChange'] = (pagination, _, sorter) => {
    if (Array.isArray(sorter)) {
      // TODO:
      logger.warn('表格组件暂不支持多字段排序')
      return
    }

    setPageNo(pagination.current || 1)
    setPageSize(pagination.pageSize || 10)
    if (sorter.field && sorter.order) {
      setSortParams({
        sortField: sorter.field as string,
        sortOrder: sorter.order === 'ascend' ? 'asc' : 'desc',
      })
    }
    else {
      setSortParams(undefined)
    }
  }

  useImperativeHandle(ref, () => ({
    reload: run,
    // getSelectedRow: () => {},
  }))

  return (
    <>
      {showSearchForm && (
        <Card className="mb-3" size="small">
          <Form
            ref={formRef}
            schemas={searchFormSchemas}
            searchMode
            {...searchFormProps}
            submitOnReset
            submitOnEnter
            onSubmit={() => {
              setPageNo(1)
              run()
            }}
          />
        </Card>
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

        <AntTable
          pagination={enablePagination && { current: pageNo, total, pageSize }}
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
})

export default memo(Table) as typeof Table
