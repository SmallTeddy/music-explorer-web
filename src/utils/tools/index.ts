import { ElMessage, MessageHandler } from 'element-plus'

/**
 * @description 文档注册enter事件
 * @param {Function} cb
 * @return {void}
 */
export function handleEnter(cb: Function): void {
  if (typeof cb !== 'function')
    return

  document.onkeydown = (e) => {
    const ev: KeyboardEventInit = e || window.event
    const keyCode = ev.code || ev.keyCode
    if (keyCode === 'Enter' || keyCode === 13)
      cb()
  }
}

/**
 * @description 日期格式化
 * @param {string | number} time {string like：{y}-{m}-{d} {h}:{i}:{s} } pattern
 * @return {string}
 */
export function parseTime(time: string | number, pattern: string) {
  if (arguments.length === 0 || !time)
    return null

  const format = pattern || '{y}-{m}-{d}'
  let date
  if (typeof time === 'object') {
    date = time
  }
  else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = Number.parseInt(time)
    }
    else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10)
      time = time * 1000

    date = new Date(time)
  }
  const formatObj: Record<string, string> = {
    y: date.getFullYear(), // 年
    m: date.getMonth() + 1, // 月
    d: date.getDate(), // 日
    h: date.getHours(), // 时
    i: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    a: date.getDay(), // 星期几
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // 注意：getDay()返回的是0表示星期天
    if (key === 'a')
      return ['日', '一', '二', '三', '四', '五', '六'][value]

    if (result.length > 0 && Number(value) < 10)
      value = `0${value}`

    return value || 0
  })
  return time_str
}

/**
 * @description trim函数
 * @param {string} str
 * @return {string}
 */
export function trim(str: string): string {
  return str.replace(/^\s+|\s+$/g, '') // 去除字符串两端的空格
}

/**
 * @description uuid的生成
 * @return {string}
 */
/**
 * @description 生成UUID
 * @return {string}
 */
export function getUUID(): string {
  const s: string[] = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits[Math.floor(Math.random() * 0x10)]
  }
  s[14] = '4'
  s[19] = hexDigits[(parseInt(s[19], 16) & 0x3) | 0x8]
  s[8] = s[13] = s[18] = s[23] = '-'

  const uuid = s.join('')
  return uuid
}
// 38673f6b-bacc-4d9b-9330-dd97b7ae238f

/**
 * @description 千分位
 * @param {string | number} num
 * @return {void}
 */
export function addThousand(num: string | number): string {
  if (num)
    num = Number(num).toFixed(2)

  if ((!num && num !== 0) || num == 'NaN')
    return '--'
  const regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g
  num = num.toString().replace(regForm, '$1,')
  return num
}

/**
 * @description 大数值转换和保留n位有效数字
 * @param {number} num {number} digits
 * @return {string}
 */
export function numberFormatter(num: number, digits: number | undefined): string {
  const si = [
    { value: 1e13, symbol: '亿亿' },
    { value: 1e12, symbol: '万亿' },
    { value: 1e11, symbol: '千亿' },
    { value: 1e10, symbol: '百亿' },
    { value: 1e9, symbol: '十亿' },
    { value: 1e8, symbol: '亿' },
    { value: 1e7, symbol: '千万' },
    { value: 1e6, symbol: '百万' },
    { value: 1e5, symbol: '十万' },
    { value: 1e4, symbol: '万' },
    { value: 1e3, symbol: '千' },
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value)
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
  }
  return num.toString()
}

/**
 * @description 复制方法
 * @param {string} value 传入要复制的值
 * @return {string | MessageHandler}
 */
export const copy = (value: string): string | MessageHandler => {
  if (!value)
    return ElMessage.error('复制失败')

  const tag = document.createElement('textarea')
  tag.value = value
  document.body.appendChild(tag)
  tag.select()
  document.execCommand('copy')
  ElMessage.success('复制成功')
  tag.remove()
  return value
}

/**
 * @description 防抖
 * @param {number} timer
 * @return {function}
 */
export function debounce(timer = 0): (callback: unknown, delay: number) => void {
  return (callback: unknown, delay: number) => {
    if (timer)
      clearTimeout(timer)

    if (typeof callback === 'function')
      timer = setTimeout(callback, delay)
  }
}

/**
 * @description 节流
 * @param {number} timer
 * @return {function}
 */
export const throttle: (fn: (...args: unknown[]) => void, timer: number) => (...args: unknown[]) => void = (fn, timer = 0) => {
  let time: number | null = null
  return (...args: unknown[]) => {
    if (time)
      clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, args)
    }, timer)
  }
}
