import { consola } from 'consola'

export const logger = {
  info<T = string>(data: T) {
    consola.info(data)
  },
  error(message: string | Error) {
    if (typeof message === 'string')
      consola.error(new Error(message))
    else
      consola.error(message)
  },
  warn<T = string>(data: T) {
    consola.warn(data)
  },
  success<T = string>(data: T) {
    consola.success(data)
  },
} as const
