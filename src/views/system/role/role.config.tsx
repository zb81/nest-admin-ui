import type { RoleDto, RoleVo } from '@/apis/system/role'
import type { FormSchema } from '@/components/Form'

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
