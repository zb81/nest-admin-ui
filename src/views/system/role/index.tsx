import { Button, message } from 'antd'
import { produce } from 'immer'
import { isNumber } from 'lodash-es'

import { getMenuTree } from '@/apis/system/menu'
import type { RoleDto, RoleVo } from '@/apis/system/role'
import { createRole, deleteRole, getRoleList, updateRole } from '@/apis/system/role'
import { BasicDrawer, useDrawer } from '@/components/Drawer'
import type { FormInstance } from '@/components/Form'
import { Form } from '@/components/Form'
import { AnimatedRoute } from '@/components/Motion'
import type { ActionColumn, TableInstance } from '@/components/Table'
import { Table } from '@/components/Table'

import { formInitialValues, formSchemas, searchFormSchemas, tableColumns } from './role.config'

export default function Role() {
  const {
    open,
    openDrawer,
    closeDrawer,
    confirmLoading,
    startConfirmLoading,
    stopConfirmLoading,
  } = useDrawer()

  const formRef = useRef<FormInstance<RoleDto>>(null)
  const tableRef = useRef<TableInstance>(null)
  const [initialValues, setInitialValues] = useState<RoleDto>(formInitialValues)
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
      const saveApi = isNumber(updateId.current) ? updateRole : createRole
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

  const actionColumnConfig = useMemo<ActionColumn<RoleVo>>(() => ({
    deleteable: true,
    editable: true,
    deleteApi: deleteRole,
    onRowEditAction(_, r) {
      updateId.current = r.id
      setInitialValues(r)
      openDrawer()
    },
  }), [openDrawer])

  const { run: getTree } = useRequest(getMenuTree, {
    manual: true,
    onSuccess([res, err]) {
      if (!err) {
        formRef.current?.updateSchema('menuIds', (prev) => {
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
      新增角色
    </Button>
  )

  return (
    <AnimatedRoute>
      <Table
        ref={tableRef}
        title="角色列表"
        api={getRoleList}
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
        width={500}
        open={open}
        confirmLoading={confirmLoading}
        onClose={closeMenuDrawer}
        onConfirm={handleConfirm}
      >
        <Form
          ref={formRef}
          schemas={formSchemas}
          initialValues={initialValues}
          labelAlign="right"
          labelWidth={100}
          colProps={{ span: 24 }}
        />
      </BasicDrawer>
    </AnimatedRoute>
  )
}
