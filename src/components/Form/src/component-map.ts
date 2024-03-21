import { Cascader, Checkbox, DatePicker, Divider, Input, InputNumber, Radio, Rate, Select, Switch, Transfer, TreeSelect } from 'antd'
import type React from 'react'

import { BasicTitle } from '@/components/Basic'
import { IconPicker } from '@/components/Icon'

import FormActions from './components/FormActions'
import RadioButtonGroup from './components/RadioButtonGroup'
import type { ComponentType } from './types/components.type'

const componentMap = new Map<ComponentType, React.FC<any>>()

componentMap.set('Input', Input)
componentMap.set('InputGroup', Input.Group)
componentMap.set('InputPassword', Input.Password)
componentMap.set('InputSearch', Input.Search)
componentMap.set('InputTextArea', Input.TextArea)
componentMap.set('InputNumber', InputNumber)
componentMap.set('Checkbox', Checkbox)
componentMap.set('Select', Select)
componentMap.set('TreeSelect', TreeSelect)
componentMap.set('RadioGroup', Radio.Group)
componentMap.set('Switch', Switch)
componentMap.set('Rate', Rate)
componentMap.set('Divider', Divider)
componentMap.set('Transfer', Transfer)
componentMap.set('Cascader', Cascader)
componentMap.set('DatePicker', DatePicker)
componentMap.set('MonthPicker', DatePicker.MonthPicker)
componentMap.set('RangePicker', DatePicker.RangePicker)
componentMap.set('WeekPicker', DatePicker.WeekPicker)
componentMap.set('TimePicker', DatePicker.TimePicker)
componentMap.set('TimeRangePicker', DatePicker.RangePicker)

componentMap.set('FormActions', FormActions)
componentMap.set('BasicTitle', BasicTitle)
componentMap.set('RadioButtonGroup', RadioButtonGroup)
componentMap.set('IconPicker', IconPicker)

export { componentMap }

const clearableComponents: ComponentType[] = [
  'Input',
  'InputPassword',
  'InputSearch',
  'InputTextArea',
  'TreeSelect',
  'Cascader',
  'DatePicker',
  'MonthPicker',
  'TimePicker',
  'WeekPicker',
  'TimeRangePicker',
  'RangePicker',
  'Select',
]

export function isClearable(component: ComponentType) {
  return clearableComponents.includes(component)
}
