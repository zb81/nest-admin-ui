import { logger } from '@/utils/logger'

class Cache {
  instance: Storage

  constructor(storage: Storage) {
    this.instance = storage
  }

  get(key: string) {
    const v = this.instance.getItem(key)
    if (v) {
      try {
        return JSON.parse(v)
      }
      catch (error) {
        logger.error(error as Error)
        return v
      }
    }
    return null
  }

  set(key: string, value: any) {
    try {
      this.instance.setItem(key, JSON.stringify(value))
    }
    catch (error) {
      logger.error(error as Error)
    }
  }

  remove(key: string) {
    this.instance.removeItem(key)
  }

  clear() {
    this.instance.clear()
  }
}

export const localCache = new Cache(localStorage)

export const sessionCache = new Cache(sessionStorage)
