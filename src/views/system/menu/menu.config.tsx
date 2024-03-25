import { Tag } from 'antd'
import type { TableColumnsType } from 'antd'

import type { MenuDto, MenuTreeVo } from '@/apis/system/menu'
import type { FormSchema } from '@/components/Form'
import { renderAntdIcon } from '@/utils/ant-design-icons'
import { formatDateTimeString } from '@/utils/date-time'

const isDir = (type: number) => type === 0
const isMenu = (type: number) => type === 1
const isButton = (type: number) => type === 2

export const formInitialValues: MenuDto = {
  type: 0,
  name: '',
  keepAlive: 0,
  external: 0,
  status: 1,
  show: 1,
} as const

export function genColumns(optRender: (record: MenuTreeVo) => RN): TableColumnsType<MenuTreeVo> {
  return [
    { title: '菜单名称', dataIndex: 'name' },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 50,
      align: 'center',
      render(v) {
        return renderAntdIcon(v)
      },
    },
    { title: '权限标识', dataIndex: 'permission', align: 'center' },
    { title: '组件', dataIndex: 'component', align: 'center' },
    { title: '排序', dataIndex: 'orderNo', align: 'center', width: 60 },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      width: 80,
      render(v) {
        return v === 1
          ? <Tag color="success" className="m-0">启用</Tag>
          : <Tag color="error" className="m-0">停用</Tag>
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      width: 180,
      render: v => formatDateTimeString(v),
    },
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

export const searchFormSchemas: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
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

export const formSchemas: FormSchema<MenuDto>[] = [
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      treeData: [],
      fieldNames: { label: 'name', value: 'id' },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: ({ values }) => isDir(values.type),
    show: ({ values }) => !isButton(values.type),
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    show: ({ values }) => isMenu(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    show: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
    required: true,
    show: ({ values }) => isButton(values.type),
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
    field: 'external',
    label: '是否外链',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
    show: ({ values }) => isMenu(values.type),
  },

  {
    field: 'keepAlive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '缓存', value: 1 },
        { label: '不缓存', value: 0 },
      ],
    },
    show: ({ values }) => isMenu(values.type),
  },
  {
    field: 'show',
    label: '是否显示',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '显示', value: 1 },
        { label: '隐藏', value: 0 },
      ],
    },
    show: ({ values }) => !isButton(values.type),
  },
]
