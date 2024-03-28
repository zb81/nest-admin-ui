import type { RoleDto, RoleVo } from '@/apis/system/role'
import type { FormSchema } from '@/components/Form'
import type { ColumnProps } from '@/components/Table'
import { formatDateTimeString } from '@/utils/date-time'

export const formInitialValues: RoleDto = {
  name: '',
  value: '',
  status: 1,
  remark: '',
  menuIds: [],
} as const

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
      treeData: [],
      fieldNames: { label: 'name', value: 'id' },
      getPopupContainer: () => document.body,
    },
  },
]

export const tableColumns: ColumnProps<RoleVo>[] = [
  {
    dataIndex: 'name',
    width: 200,
    title: '角色名称',
    align: 'center',
  },
  {
    dataIndex: 'value',
    width: 180,
    title: '角色标识',
    align: 'center',
  },
  {
    dataIndex: 'status',
    title: '状态',
    width: 120,
    align: 'center',
  },
  {
    dataIndex: 'createdAt',
    sorter: true,
    title: '创建时间',
    width: 180,
    align: 'center',
    render: v => formatDateTimeString(v),
  },
  {
    dataIndex: 'remark',
    title: '备注',
    align: 'center',
  },
]
