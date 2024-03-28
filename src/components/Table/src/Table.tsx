import { EditOutlined, ReloadOutlined } from '@ant-design/icons'
import { Table as AntTable, Button, Card, Divider, Space, message } from 'antd'
import { isFunction } from 'lodash-es'

import { ConfirmButton, TipButton } from '@/components/Button'
import { Form, type FormInstance } from '@/components/Form'
import { logger } from '@/utils/logger'
import { randomId } from '@/utils/random'

import ColumnsSetting from './components/settings/ColumnsSetting'
import SizeSetting from './components/settings/SizeSetting'
import { getAntColumns } from './helpers'
import type { ColumnProps, TableInstance, TableProps } from './types'

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
    actionColumn,
  } = props

  const formRef = useRef<FormInstance>(null)
  const [tableData, setTableData] = useState<any[]>([])
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [sortParams, setSortParams] = useState<SortDto>()

  const [internalShowIndex, setInternalShowIndex] = useState(showIndexColumn)
  const [tableSize, setTableSize] = useState<Size>(size)

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

  const [columns, setColumns] = useState<ColumnProps[]>(_columns.map(col => ({
    id: randomId(),
    ...col,
  })))

  const antColumns = useMemo(
    () => {
      const ret = getAntColumns(columns, internalShowIndex)

      if (actionColumn) {
        let {
          show = true,
          title = '操作',
          render,
          onRowEditAction,
          deleteApi,
          deleteable,
          editable,
        } = actionColumn

        if (isFunction(show))
          show = show()
        if (!show)
          return ret

        ret.push({
          title,
          dataIndex: 'actions',
          align: 'center',
          width: 80,
          render: render || ((value, record, index) => {
            if (isFunction(deleteable))
              deleteable = deleteable(value, record, index)
            if (isFunction(editable))
              editable = editable(value, record, index)

            editable = editable && isFunction(onRowEditAction)
            deleteable = deleteable && isFunction(deleteApi)

            return (
              <>
                {editable && (
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => onRowEditAction!(value, record, index)}
                  />
                )}
                {editable && deleteable && <Divider type="vertical" className="mx-1" />}
                {deleteable && (
                  <ConfirmButton
                    onConfirm={async () => {
                      const [_, err] = await deleteApi!(record.id)
                      if (!err) {
                        message.success('删除成功')
                        // 如果当前不是第一页，且当前页只有一条数据，刷新上一页
                        if (pageNo > 1 && tableData.length === 1)
                          setPageNo(pageNo - 1)
                        else
                          run()
                      }
                    }}
                  />
                )}
              </>
            )
          }),
        })
      }

      return ret
    },
    [columns, internalShowIndex, actionColumn, pageNo, tableData, run],
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
              <SizeSetting size={tableSize} onChange={setTableSize} />
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
          className={`table-${tableSize}`}
          pagination={enablePagination && { current: pageNo, total, pageSize }}
          size={tableSize}
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
