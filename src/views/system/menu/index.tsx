import { useRequest } from 'ahooks'
import { Button, Col, Form, Input, Row, Select, Table, type TableColumnsType } from 'antd'
import { useState } from 'react'

import { type MenuTreeVo, getMenuTree } from '@/apis/system/menu'
import { AnimatedRoute } from '@/components/Motion'
import { renderAntdIcon } from '@/utils/ant-design-icons'
import AddButton from '@/views/system/menu/AddButton'

const columns: TableColumnsType<MenuTreeVo> = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    render(v) {
      return renderAntdIcon(v)
    },
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
  },
]

export default function Menu() {
  const [menuTree, setMenuTree] = useState<MenuTreeVo[]>([])

  const { run, loading } = useRequest(getMenuTree, {
    onSuccess([res, err]) {
      if (!err)
        setMenuTree(res)
    },
  })

  return (
    <AnimatedRoute>
      <Form
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
      </Form>

      <div className="bg-white dark:bg-dark-bg p-2">
        <div className="mb-2">
          <AddButton menuTree={menuTree} onSave={() => run()} />
        </div>

        <Table
          rowKey={menu => menu.id}
          columns={columns}
          dataSource={menuTree}
          pagination={false}
          loading={loading}
        />
      </div>
    </AnimatedRoute>
  )
}
