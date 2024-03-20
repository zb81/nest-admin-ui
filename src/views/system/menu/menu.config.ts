import type { TableColumnsType } from 'antd'

import type { MenuDto, MenuTreeVo } from '@/apis/system/menu'
import type { FormSchema } from '@/components/Form/src/types'
import { renderAntdIcon } from '@/utils/ant-design-icons'

const isDir = (type: number) => type === 0
const isMenu = (type: number) => type === 1
const isButton = (type: number) => type === 2

export const formInitialValues: MenuDto = {
  type: 0,
  name: '',
  keepAlive: 0,
  isExt: 0,
  status: 1,
  show: 1,
}

export function genColumns(optRender: (record: MenuTreeVo) => RN): TableColumnsType<MenuTreeVo> {
  return [
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
    {
      title: '操作',
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
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
]

export function genFormSchemas(menuTree: MenuTreeVo[]): FormSchema<MenuDto>[] {
  return [
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
        treeData: menuTree,
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
      required: true,
      show: ({ values }) => isDir(values.type),
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
      field: 'isExt',
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
}
