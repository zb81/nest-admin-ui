import { EditOutlined } from '@ant-design/icons'
import { Button, Tag, message } from 'antd'
import { produce } from 'immer'
import { isNumber } from 'lodash-es'

import { createMenu, deleteMenu, getMenuTree, updateMenu } from '@/apis/system/menu'
import type { MenuDto, MenuTreeVo } from '@/apis/system/menu'
import { ConfirmButton } from '@/components/Button'
import { BasicDrawer, useDrawer } from '@/components/Drawer'
import type { FormInstance } from '@/components/Form'
import { Form } from '@/components/Form'
import { AnimatedRoute } from '@/components/Motion'
import { Table } from '@/components/Table'
import type { ColumnProps, TableInstance } from '@/components/Table'
import { renderAntdIcon } from '@/utils/ant-design-icons'
import { formatDateTimeString } from '@/utils/date-time'
import { randomId } from '@/utils/random'

import { formInitialValues, formSchemas, searchFormSchemas } from './menu.config'

export default function Menu() {
  const formRef = useRef<FormInstance<MenuDto>>(null)
  const tableRef = useRef<TableInstance>(null)

  const {
    open,
    openDrawer,
    closeDrawer,
    confirmLoading,
    startConfirmLoading,
    stopConfirmLoading,
  } = useDrawer()

  const [initialValues, setInitialValues] = useState<MenuDto>(formInitialValues)
  const updateId = useRef<number>()

  function closeMenuDrawer() {
    updateId.current = undefined
    setInitialValues(formInitialValues)
    closeDrawer()
    formRef.current!.resetFields()
  }

  async function handleConfirm() {
    try {
      await formRef.current!.validateFields()
      startConfirmLoading()
      const saveApi = isNumber(updateId.current) ? updateMenu : createMenu
      const [_, err] = await saveApi({
        ...formRef.current!.getFieldsValue(),
        id: updateId.current,
      })

      if (!err) {
        message.success('保存成功')
        closeMenuDrawer()
        tableRef.current?.reload()
      }
    }
    catch (e) {
      console.error(e)
    }
    finally {
      stopConfirmLoading()
    }
  }

  function handleClickEdit(r: MenuTreeVo) {
    updateId.current = r.id
    setInitialValues(r)
    openDrawer()
  }

  async function handleClickDelete(id: number) {
    await deleteMenu(id)
    message.success('删除成功')
    tableRef.current?.reload()
  }

  const columns: ColumnProps<MenuTreeVo>[] = [
    { id: randomId(), title: '菜单名称', dataIndex: 'name' },
    {
      id: randomId(),
      title: '图标',
      dataIndex: 'icon',
      width: 50,
      align: 'center',
      render(v) {
        return renderAntdIcon(v)
      },
    },
    { id: randomId(), title: '权限标识', dataIndex: 'permission', align: 'center' },
    { id: randomId(), title: '组件', dataIndex: 'component', align: 'center' },
    { id: randomId(), title: '排序', dataIndex: 'orderNo', align: 'center', width: 60 },
    {
      id: randomId(),
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 80,
      render(v) {
        return v === 1
          ? <Tag color="success" className="m-0">启用</Tag>
          : <Tag color="error" className="m-0">停用</Tag>
      },
    },
    {
      id: randomId(),
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      width: 180,
      sorter: true,
      render: v => formatDateTimeString(v),
    },
    {
      id: randomId(),
      title: '操作',
      key: 'options',
      align: 'center',
      width: 80,
      render(_, record) {
        return (
          <>
            <Button
              type="link"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleClickEdit(record)}
            />
            <ConfirmButton onConfirm={() => handleClickDelete(record.id)} />
          </>
        )
      },
    },
  ]

  const { run: getTree } = useRequest(getMenuTree, {
    manual: true,
    onSuccess([res, err]) {
      if (!err) {
        formRef.current?.updateSchema('parentId', (prev) => {
          return produce(prev, (draft) => {
            draft.componentProps!.treeData = res
          })
        })
      }
    },
  })

  const toolbarNode = (
    <Button
      type="primary"
      onClick={() => {
        openDrawer()
        getTree()
      }}
    >
      新增菜单
    </Button>
  )

  return (
    <AnimatedRoute>
      <Table
        ref={tableRef}
        title="菜单列表"
        api={getMenuTree}
        enablePagination={false}
        showIndexColumn={false}
        columns={columns}
        searchFormSchemas={searchFormSchemas}
        toolbarActions={toolbarNode}
        searchFormProps={{
          colProps: { span: 8 },
          labelWidth: 100,
        }}
      />

      <BasicDrawer
        title="新增菜单"
        open={open}
        confirmLoading={confirmLoading}
        onClose={closeMenuDrawer}
        onConfirm={handleConfirm}
      >
        <Form
          ref={formRef}
          schemas={formSchemas}
          initialValues={initialValues}
          labelWidth={100}
          labelAlign="right"
          colProps={{ lg: 12, md: 24 }}
        />
      </BasicDrawer>
    </AnimatedRoute>
  )
}
