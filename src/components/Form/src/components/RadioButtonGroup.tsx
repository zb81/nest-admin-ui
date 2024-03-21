import { Radio } from 'antd'

interface Option {
  label: string
  value: string | number | boolean
  disabled?: boolean
}

interface RadioButtonGroupProps {
  value?: Option['value']
  options?: Option[]
  onChange?: (value: Option['value']) => void
}

export default function RadioButtonGroup(props: RadioButtonGroupProps) {
  const { options = [], value, onChange } = props
  return (
    <Radio.Group
      value={value}
      buttonStyle="solid"
      onChange={e => onChange?.(e.target.value)}
    >
      {options.map(opt => (
        <Radio.Button
          key={String(opt.value)}
          value={opt.value}
          disabled={opt.disabled}
        >
          {opt.label}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
}
