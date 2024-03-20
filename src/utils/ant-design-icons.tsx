import * as AntdIcons from '@ant-design/icons'
import React from 'react'

import { camelCaseToKebabCase, kebabCaseToCamelCase } from '@/utils/string'

const iconReg = /^([A-Z][a-z]+){1,}$/

export const antdIcons = Object
  .keys(AntdIcons)
  .filter(k => iconReg.test(k))
  .map(k => camelCaseToKebabCase(k))

export function renderAntdIcon(name: string) {
  if (!name)
    return null

  const Icon = (AntdIcons as unknown as Record<string, React.FC>)[kebabCaseToCamelCase(name)]

  return Icon ? <Icon /> : null
}
