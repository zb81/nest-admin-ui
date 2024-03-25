import { Button, message } from 'antd'
import { isNumber } from 'lodash-es'

import type { RoleDto, RoleVo } from '@/apis/system/role'
import { createRole, getRoleList, updateRole } from '@/apis/system/role'
import { BasicDrawer, useDrawer } from '@/components/Drawer'
import { Form, useForm } from '@/components/Form'
import { AnimatedRoute } from '@/components/Motion'
import type { ColumnProps } from '@/components/Table'
import { Table } from '@/components/Table'
import { formatDateTimeString } from '@/utils/date-time'

import { formInitialValues, formSchemas, searchFormSchemas } from './role.config'

export default function Role() {
  const columns: ColumnProps<RoleVo>[] = [
    { show: true, dataIndex: 'name', title: '角色名称' },
    { show: true, dataIndex: 'value', title: '角色标识' },
    { show: true, dataIndex: 'status', title: '状态', sorter: true },
    {
      show: true,
      dataIndex: 'createdAt',
      sorter: true,
      title: '创建时间',
      render: v => formatDateTimeString(v),
    },
    { show: true, dataIndex: 'remark', key: 'remark', title: '备注' },
  ]

  const {
    open,
    openDrawer,
    closeDrawer,
    confirmLoading,
    startConfirmLoading,
    stopConfirmLoading,
  } = useDrawer()

  const { form } = useForm<RoleDto>()
  const [initialValues, setInitialValues] = useState<RoleDto>(formInitialValues)
  const updateId = useRef<number>()

  function closeMenuDrawer() {
    updateId.current = undefined
    setInitialValues(formInitialValues)
    closeDrawer()
    form.resetFields()
  }

  async function handleConfirm() {
    try {
      await form.validateFields()
      startConfirmLoading()
      const saveApi = isNumber(updateId.current) ? updateRole : createRole
      const [_, err] = await saveApi({
        ...form.getFieldsValue(),
        id: updateId.current,
      })
      if (!err) {
        message.success('保存成功')
        closeMenuDrawer()
      }
    }
    catch (e) {
      console.error(e)
    }
    finally {
      stopConfirmLoading()
    }
  }

  const toolbarNode = <Button type="primary" onClick={openDrawer}>新增角色</Button>

  return (
    <AnimatedRoute>
      <Table<RoleVo>
        title="角色列表"
        api={getRoleList}
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
        width={500}
        open={open}
        confirmLoading={confirmLoading}
        onClose={closeMenuDrawer}
        onConfirm={handleConfirm}
      >
        <Form
          form={form}
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
