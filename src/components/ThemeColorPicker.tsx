import { ColorPicker } from 'antd'

interface Props {
  value: string
  onChange?: (color: string) => void
}

function ThemeColorPicker({ value, onChange }: Props) {
  return (
    <ColorPicker
      showText
      value={value}
      onChange={(_, h) => {
        onChange?.(h)
      }}
    />
  )
}

export default ThemeColorPicker
