import BasicHelp from './BasicHelp'

interface Props {
  helpMessage?: string | string[]
  span: boolean
  normal: boolean
}

export default function BasicTitle({ helpMessage, children }: PWC<Props>) {
  return (
    <span>
      {children}
      {helpMessage ? <BasicHelp text={helpMessage} /> : null}
    </span>
  )
}
