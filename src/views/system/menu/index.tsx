import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Table, message } from 'antd'
import { isNumber } from 'lodash-es'
import { useRef, useState } from 'react'

import { createMenu, getMenuTree, updateMenu } from '@/apis/system/menu'
import type { MenuDto, MenuTreeVo } from '@/apis/system/menu'
import { BasicDrawer, useDrawer } from '@/components/Drawer'
import { Form, useForm } from '@/components/Form'
import { AnimatedRoute } from '@/components/Motion'

import { formInitialValues, genColumns, genFormSchemas } from './menu.config'

export default function Menu() {
  const [menuTree, setMenuTree] = useState<MenuTreeVo[]>([])

  const { run: getTree, loading } = useRequest(getMenuTree, {
    onSuccess([res, err]) {
      if (!err)
        setMenuTree(res)
    },
  })

  const {
    open,
    openDrawer,
    closeDrawer,
    confirmLoading,
    startConfirmLoading,
    stopConfirmLoading,
  } = useDrawer()

  const { form } = useForm<MenuDto>()
  const schemas = genFormSchemas(menuTree)
  const updateId = useRef<number>()

  function closeMenuDrawer() {
    updateId.current = undefined
    closeDrawer()
    form.resetFields()
  }

  async function handleConfirm() {
    try {
      await form.validateFields()
      startConfirmLoading()
      const saveApi = isNumber(updateId.current) ? updateMenu : createMenu
      const [_, err] = await saveApi({
        ...form.getFieldsValue(),
        id: updateId.current,
      })
      if (!err) {
        message.success('保存成功')
        closeMenuDrawer()
        getTree()
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
    form.setFieldsValue(r)
    openDrawer()
  }

  const columns = genColumns(record => (
    <>
      <Button
        type="link"
        size="small"
        icon={<EditOutlined />}
        onClick={() => handleClickEdit(record)}
      />
      <Button type="link" size="small" danger icon={<DeleteOutlined />}></Button>
    </>
  ))

  return (
    <AnimatedRoute>
      {/* <Form
        className="bg-white dark:bg-dark-bg mb-4 rounded-md px-4 py-3"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Row>
          <Col span={8}>
            <Form.Item label="菜单名称" className="mb-0">
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="状态" className="mb-0">
              <Select
                placeholder="请输入"
                options={[{ label: '启用', value: '1' }, { label: '禁用', value: '0' }]}
              />
            </Form.Item>
          </Col>
          <Col span={8} className="text-right">
            <Button>重置</Button>
            <Button type="primary" className="ml-2">查询</Button>
          </Col>
        </Row>
      </Form> */}

      <div className="bg-white dark:bg-dark-bg p-2">
        <div className="mb-2">
          <Button type="primary" onClick={openDrawer}>新增菜单</Button>
        </div>

        <Table
          rowKey={menu => menu.id}
          columns={columns}
          dataSource={menuTree}
          pagination={false}
          loading={loading}
        />
      </div>

      <BasicDrawer
        title="新增菜单"
        open={open}
        confirmLoading={confirmLoading}
        onClose={closeMenuDrawer}
        onConfirm={handleConfirm}
      >
        <Form
          form={form}
          schemas={schemas}
          initialValues={formInitialValues}
          labelWidth={100}
          labelAlign="right"
          colProps={{ lg: 12, md: 24 }}
        />
      </BasicDrawer>
    </AnimatedRoute>
  )
}
