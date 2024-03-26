import { ReloadOutlined } from '@ant-design/icons'
import { Table as AntTable, Card, Divider, Space } from 'antd'

import { TipButton } from '@/components/Button'
import { Form, type FormInstance } from '@/components/Form'
import { logger } from '@/utils/logger'

import { getAntColumns } from './helpers'
import ColumnsSetting from './settings/ColumnsSetting'
import type { TableInstance, TableProps } from './types'

const Table = forwardRef<TableInstance, TableProps>((props, ref) => {
  const {
    title,
    columns: _columns,
    api,
    rowKey = 'id',
    showIndexColumn = false,
    size = 'middle',
    enablePagination = true,
    bordered = true,
    toolbarActions,
    searchFormSchemas,
    searchFormProps,
  } = props

  const formRef = useRef<FormInstance>(null)
  const [tableData, setTableData] = useState<any[]>([])
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [sortParams, setSortParams] = useState<SortDto>()

  const [internalShowIndex, setInternalShowIndex] = useState(showIndexColumn)

  const { loading, run } = useRequest(
    () => api({
      ...(enablePagination ? { pageNo, pageSize } : undefined),
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

  const [columns, setColumns] = useState(_columns)
  const antColumns = useMemo(
    () => getAntColumns(columns, internalShowIndex),
    [columns, internalShowIndex],
  )

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
              <TipButton title="刷新" icon={<ReloadOutlined />} onClick={run} />
              <ColumnsSetting
                columns={columns}
                showIndexColumn={internalShowIndex}
                onChange={setColumns}
                onShowIndexColumnChange={setInternalShowIndex}
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
          scroll={{ scrollToFirstRowOnChange: true, x: 1300, y: 300 }}
          onChange={handleTableChange}
        />
      </Card>
    </>
  )
})

export default memo(Table) as typeof Table
