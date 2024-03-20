import { useCountDown, useLocalStorageState } from 'ahooks'

const EMAIL_CODE_COUNTDOWN = 'nest-admin-email-code-countdown'

export function useEmailCountdown(interval = 60 * 1000) {
  const [targetDate, setTargetDate] = useLocalStorageState<number>(EMAIL_CODE_COUNTDOWN)
  const [countdown] = useCountDown({ targetDate })

  const disabled = countdown !== 0
  const seconds = Math.round(countdown / 1000)

  function start() {
    setTargetDate(Date.now() + interval)
  }

  return { seconds, disabled, start } as const
}
