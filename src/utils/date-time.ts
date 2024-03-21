import dayjs from 'dayjs'

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss'

/**
 * 转换日期时间字符串
 * @param src 需要转换的日期时间字符串
 * @param format 格式字符串，默认 `'YYYY-MM-DD HH:mm:ss'`
 */
export function formatDateTimeString(src: string, format = DEFAULT_FORMAT) {
  return dayjs(src).format(format)
}
