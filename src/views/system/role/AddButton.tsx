import { useRequest } from 'ahooks'
import { Button, Form, Input, Radio, TreeSelect, message } from 'antd'
import { useState } from 'react'

import type { MenuTreeVo } from '@/apis/system/menu'
import { getMenuTree } from '@/apis/system/menu'
import { type CreateRoleDto, createRole } from '@/apis/system/role'
import { BasicDrawer, useDrawer } from '@/components/Drawer'

const initialValues: CreateRoleDto = {
  name: '',
  value: '',
  status: 1,
  remark: '',
  menuIds: [],
}

interface Props {
  onSave?: () => void
}

export default function AddButton({ onSave }: Props) {
  const {
    open,
    openDrawer,
    closeDrawer,
    confirmLoading,
    startConfirmLoading,
    stopConfirmLoading,
  } = useDrawer()

  const [form] = Form.useForm<CreateRoleDto>()

  async function handleConfirm() {
    await form.validateFields()
    startConfirmLoading()
    const [_, err] = await createRole(form.getFieldsValue())
    if (!err) {
      message.success('创建成功')
      onSave?.()
      closeDrawer()
      form.resetFields()
    }

    stopConfirmLoading()
  }

  const [menuTree, setMenuTree] = useState<MenuTreeVo[]>([])
  useRequest(getMenuTree, {
    onSuccess([res, err]) {
      if (!err)
        setMenuTree(res)
    },
  })

  return (
    <>
      <Button type="primary" onClick={openDrawer}>新增角色</Button>

      <BasicDrawer
        width={500}
        title="新增角色"
        open={open}
        confirmLoading={confirmLoading}
        onClose={closeDrawer}
        onConfirm={handleConfirm}
      >
        <Form
          form={form}
          initialValues={initialValues}
          colon={false}
          labelCol={{ style: { width: '100px' } }}
        >
          <Form.Item<CreateRoleDto>
            label="角色名称"
            name="name"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item<CreateRoleDto>
            label="角色标识"
            name="value"
            rules={[{ required: true, message: '请输入角色标识' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="状态" name="status">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value={1}>启用</Radio.Button>
              <Radio.Button value={0}>禁用</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item<CreateRoleDto>
            label="备注"
            name="remark"
          >
            <Input.TextArea placeholder="请输入" />
          </Form.Item>
          <Form.Item label="菜单分配" name="menuIds">
            <TreeSelect
              allowClear
              placeholder="请选择"
              treeCheckable
              treeData={menuTree}
              fieldNames={{ label: 'name', value: 'id' }}
            />
          </Form.Item>
        </Form>
      </BasicDrawer>
    </>
  )
}
