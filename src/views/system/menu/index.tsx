import { Button, message } from 'antd'
import { produce } from 'immer'
import { isNumber } from 'lodash-es'

import { createMenu, deleteMenu, getMenuTree, updateMenu } from '@/apis/system/menu'
import type { MenuDto, MenuTreeVo } from '@/apis/system/menu'
import { BasicDrawer, useDrawer } from '@/components/Drawer'
import type { FormInstance } from '@/components/Form'
import { Form } from '@/components/Form'
import { AnimatedRoute } from '@/components/Motion'
import { Table } from '@/components/Table'
import type { ActionColumn, TableInstance } from '@/components/Table'

import { formInitialValues, formSchemas, searchFormSchemas, tableColumns } from './menu.config'

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

  const actionColumnConfig = useMemo<ActionColumn<MenuTreeVo>>(() => ({
    deleteable: true,
    editable: true,
    deleteApi: deleteMenu,
    onRowEditAction(_, r) {
      updateId.current = r.id
      setInitialValues(r)
      openDrawer()
    },
  }), [openDrawer])

  return (
    <AnimatedRoute>
      <Table
        ref={tableRef}
        title="菜单列表"
        api={getMenuTree}
        enablePagination={false}
        showIndexColumn={false}
        columns={tableColumns}
        searchFormSchemas={searchFormSchemas}
        toolbarActions={toolbarNode}
        searchFormProps={{
          colProps: { span: 8 },
          labelWidth: 100,
        }}
        actionColumn={actionColumnConfig}
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
