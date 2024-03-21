import type { ComponentProps as RCP } from 'react'

interface CustomComponentsProps {
  BasicTitle: RCP<typeof import('@/components/Basic')['BasicTitle']>
  RadioButtonGroup: RCP<typeof import('../components/RadioButtonGroup')['default']>
  IconPicker: RCP<typeof import('@/components/Icon')['IconPicker']>
  FormActions: RCP<typeof import('../components/FormActions')['default']>
}

export interface ComponentProps {
  Input: RCP<typeof import('antd/es/input')['default']>
  InputGroup: RCP<typeof import('antd/es/input/Group')['default']>
  InputPassword: RCP<typeof import('antd/es/input/Password')['default']>
  InputSearch: RCP<typeof import('antd/es/input/Search')['default']>
  InputTextArea: RCP<typeof import('antd/es/input/TextArea')['default']>
  InputNumber: RCP<typeof import('antd/es/input-number')['default']>
  Checkbox: RCP<typeof import('antd/es/checkbox')['default']>
  Select: RCP<typeof import('antd/es/select')['default']>
  TreeSelect: RCP<typeof import('antd/es/tree-select')['default']>
  RadioGroup: RCP<typeof import('antd/es/radio/group')['default']>
  Switch: RCP<typeof import('antd/es/switch')['default']>
  Rate: RCP<typeof import('antd/es/rate')['default']>
  Divider: RCP<typeof import('antd/es/divider')['default']>
  Transfer: RCP<typeof import('antd/es/transfer')['default']>
  Cascader: RCP<typeof import('antd/es/cascader')['default']>
  DatePicker: RCP<typeof import('antd/es/date-picker')['default']>
  MonthPicker: RCP<typeof import('antd/es/date-picker')['default']['MonthPicker']>
  RangePicker: RCP<typeof import('antd/es/date-picker')['default']['RangePicker']>
  WeekPicker: RCP<typeof import('antd/es/date-picker')['default']['WeekPicker']>
  TimePicker: RCP<typeof import('antd/es/time-picker')['default']>
  TimeRangePicker: RCP<typeof import('antd/es/time-picker')['default']['RangePicker']>

  FormActions: CustomComponentsProps['FormActions']
  BasicTitle: CustomComponentsProps['BasicTitle']
  RadioButtonGroup: CustomComponentsProps['RadioButtonGroup'] & ComponentProps['RadioGroup']
  IconPicker: CustomComponentsProps['IconPicker']
}

export type ComponentType = keyof ComponentProps
