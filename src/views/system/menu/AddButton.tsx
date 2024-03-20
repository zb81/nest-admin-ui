import { Button, message } from 'antd'

import { createMenu } from '@/apis/system/menu'
import type { CreateMenuDto, MenuTreeVo } from '@/apis/system/menu'
import { BasicDrawer, useDrawer } from '@/components/Drawer'
import { Form, useForm } from '@/components/Form'

import { formInitialValues, formSchemas } from './menu.config'

interface Props {
  menuTree: MenuTreeVo[]
  onSave?: () => void
}

export default function AddButton({ menuTree, onSave }: Props) {
  const {
    open,
    openDrawer,
    closeDrawer,
    confirmLoading,
    startConfirmLoading,
    stopConfirmLoading,
  } = useDrawer()

  const { form } = useForm<CreateMenuDto>()

  async function handleConfirm() {
    await form.validateFields()
    startConfirmLoading()
    const [_, err] = await createMenu(form.getFieldsValue())
    if (!err) {
      message.success('创建成功')
      onSave?.()
      closeDrawer()
      form.resetFields()
    }

    stopConfirmLoading()
  }

  return (
    <>
      <Button type="primary" onClick={openDrawer}>新增菜单</Button>

      <BasicDrawer
        title="新增菜单"
        open={open}
        confirmLoading={confirmLoading}
        onClose={closeDrawer}
        onConfirm={handleConfirm}
      >
        <Form
          form={form}
          schemas={formSchemas}
          initialValues={formInitialValues}
          labelWidth={100}
          labelAlign="right"
          colProps={{ lg: 12, md: 24 }}
        />
      </BasicDrawer>
    </>
  )
}
