import { EditOutlined } from '@ant-design/icons'
import { Button, Table, message } from 'antd'
import { isNumber } from 'lodash-es'

import { createMenu, deleteMenu, getMenuTree, updateMenu } from '@/apis/system/menu'
import type { MenuDto, MenuTreeVo } from '@/apis/system/menu'
import { ConfirmButton } from '@/components/Button'
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
  const [initialValues, setInitialValues] = useState<MenuDto>(formInitialValues)
  const schemas = genFormSchemas(menuTree)
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
    setInitialValues(r)
    openDrawer()
  }

  async function handleClickDelete(id: number) {
    await deleteMenu(id)
    message.success('删除成功')
    getTree()
  }

  const columns = genColumns(record => (
    <>
      <Button
        type="link"
        size="small"
        icon={<EditOutlined />}
        onClick={() => handleClickEdit(record)}
      />
      <ConfirmButton onConfirm={() => handleClickDelete(record.id)} />
    </>
  ))

  return (
    <AnimatedRoute>
      <div className="bg-white dark:bg-dark-bg p-2">
        <div className="mb-2">
          <Button type="primary" onClick={openDrawer}>新增菜单</Button>
        </div>

        <Table
          bordered
          size="small"
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
          initialValues={initialValues}
          labelWidth={100}
          labelAlign="right"
          colProps={{ lg: 12, md: 24 }}
        />
      </BasicDrawer>
    </AnimatedRoute>
  )
}
