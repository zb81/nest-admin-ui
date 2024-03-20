import type { BasicColumn } from '@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '角色标识',
    dataIndex: 'value',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
]
