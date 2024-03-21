import type { TableColumnsType } from 'antd'

import type { RoleDto, RoleVo } from '@/apis/system/role'
import type { FormSchema } from '@/components/Form'
import { formatDateTimeString } from '@/utils/date-time'

export const formInitialValues: RoleDto = {
  name: '',
  value: '',
  status: 1,
  remark: '',
  menuIds: [],
} as const

export function genColumns(optRender: (record: RoleVo) => RN): TableColumnsType<RoleVo> {
  return [
    { title: '角色名称', dataIndex: 'name' },
    { title: '角色标识', dataIndex: 'value', align: 'center' },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      width: 180,
      render: v => formatDateTimeString(v),
    },
    { title: '备注', dataIndex: 'remark', align: 'center' },
    {
      title: '操作',
      key: 'options',
      align: 'center',
      width: 80,
      render(_, record) {
        return optRender(record)
      },
    },
  ]
}

export const searchFormSchemas: FormSchema<RoleVo>[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    key: '$formActions',
    component: 'FormActions',
    componentProps: {
      confirmText: '搜索',
    },
  },
]

export const formSchemas: FormSchema<RoleDto>[] = [
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'value',
    label: '角色标识',
    component: 'Input',
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
  {
    field: 'menuIds',
    label: '菜单分配',
    component: 'TreeSelect',
    componentProps: {
      treeCheckable: true,
    },
  },
]
