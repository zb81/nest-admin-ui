import type { Method } from '@zb81/req'
import { Request } from '@zb81/req'
import { message as antdMessage } from 'antd'

import { refreshToken } from '@/apis/auth'
import { ACCESS_TOKEN_KEY } from '@/constants/storage-keys'
import { localCache } from '@/utils/cache'
import { logger } from '@/utils/logger'

let refreshing = false
const reqQueue: any[] = []

export const request = new Request({
  baseURL: import.meta.env.VITE_APP_API_BASE,
  timeout: Number.parseInt(import.meta.env.VITE_APP_API_TIMEOUT),
  requestInterceptor: (config) => {
    if (refreshing && !config.url?.includes('/auth/refresh')) {
      return new Promise((resolve) => {
        reqQueue.push({ resolve, config, type: 'request' })
      })
    }

    if (!config.headers)
      config.headers = {}
    const token = localCache.get(ACCESS_TOKEN_KEY)
    if (token)
      config.headers.Authorization = `Bearer ${token}`

    return config
  },
  responseInterceptor: (res) => {
    const { code, message, data } = res.data as IResWrapper
    if (code === 200) {
      return data
    }
    else if (code === 401) {
      return new Promise((resolve, reject) => {
        reqQueue.push({
          resolve,
          reject,
          config: res.config,
          type: 'response',
        })

        if (!refreshing) {
          refreshing = true
          refreshToken().then(() => {
            refreshing = false
            reqQueue.forEach((item) => {
              if (item.type === 'request') {
                item.config.headers.Authorization = `Bearer ${localCache.get(ACCESS_TOKEN_KEY)}`
                item.resolve(item.config)
              }
              else if (item.type === 'response') {
                request.request(
                  item.config.method! as Method,
                  item.config.url!,
                  item.config,
                ).then(([d, e]) => {
                  if (e)
                    item.reject(e)
                  else
                    item.resolve(d)
                })
              }
            })
            reqQueue.length = 0
          }).finally(() => {
            refreshing = false
          })
        }
      })
    }
    else {
      antdMessage.error(message)
      throw new Error(message)
    }
  },
  responseCatchInterceptor: (err) => {
    antdMessage.error(err.message || err)
    logger.error(err)
    throw err
  },
})
