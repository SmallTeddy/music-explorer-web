import type { MessageHandler } from 'element-plus'
import { ElMessage } from 'element-plus'

/**
 * @description 文档注册enter事件
 * @param {Function} cb
 * @return {void}
 */
// 导出一个函数，用于处理按下Enter键时触发的回调函数
export function handleEnter(cb: Function): void {
  // 判断传入的参数是否为函数
  if (typeof cb !== 'function')
    return

  // 监听键盘按下事件
  document.onkeydown = (e) => {
    // 获取键盘事件对象
    const ev: KeyboardEventInit = e || window.event
    // 获取按下的键的编码
    const keyCode = ev.code || ev.keyCode
    // 判断按下的键是否为Enter键
    if (keyCode === 'Enter' || keyCode === 13)
      // 如果是，则执行传入的回调函数
      cb()
  }
}

/**
 * @description 日期格式化
 * @param {string | number} time {string like：{y}-{m}-{d} {h}:{i}:{s} } pattern
 * @return {string}
 */
// 导出一个函数，用于解析时间，参数time为字符串或者数字，pattern为时间格式
export function parseTime(time: string | number, pattern: string) {
  // 如果参数为空或者time为空，返回null
  if (arguments.length === 0 || !time)
    return null

  // 如果没有传入pattern，则使用默认时间格式
  const format = pattern || '{y}-{m}-{d}'
  let date
  // 如果time为对象，则直接赋值给date
  if (typeof time === 'object') {
    date = time
  }
  // 如果time为字符串，则进行处理
  else {
    // 如果time为数字，并且长度为10，则乘以1000
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = Number.parseInt(time)
    }
    // 如果time为字符串，则进行处理
    else if (typeof time === 'string') {
      // 将'-'替换为'/'，将'T'替换为' '，将'.'替换为''
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    // 如果time为数字，并且长度不为10，则乘以1000
    if (typeof time === 'number' && time.toString().length === 10)
      time = time * 1000

    // 将time转换为Date对象
    date = new Date(time)
  }
  // 定义一个对象，用于存储时间格式
  const formatObj: Record<string, string> = {
    y: date.getFullYear(), // 年
    m: date.getMonth() + 1, // 月
    d: date.getDate(), // 日
    h: date.getHours(), // 时
    i: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    a: date.getDay(), // 星期几
  }
  // 替换时间格式中的{y|m|d|h|i|s|a}
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    // 获取时间格式中的值
    let value = formatObj[key]
    // 注意：getDay()返回的是0表示星期天
    // 如果是星期几，则使用['日', '一', '二', '三', '四', '五', '六']中的值替换
    if (key === 'a')
      return ['日', '一', '二', '三', '四', '五', '六'][value]

    // 如果result的长度大于0，并且value小于10，则添加0
    if (result.length > 0 && Number(value) < 10)
      value = `0${value}`

    // 返回value或者0
    return value || 0
  })
  // 返回时间格式
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
// 导出一个函数，用于获取UUID
export function getUUID(): string {
  // 创建一个字符串数组
  const s: string[] = []
  // 定义十六进制字符串
  const hexDigits = '0123456789abcdef'
  // 循环36次，每次随机生成一个十六进制字符串，添加到s数组中
  for (let i = 0; i < 36; i++)
    s[i] = hexDigits[Math.floor(Math.random() * 0x10)]

  // 将s数组的第14个元素设置为4
  s[14] = '4'
  // 将s数组的第19个元素设置为十六进制字符串，并将其与0x3进行按位与运算，再将结果与0x8进行按位或运算
  s[19] = hexDigits[(Number.parseInt(s[19], 16) & 0x3) | 0x8]
  // 将s数组的第8、13、18、23个元素设置为'-'
  s[8] = s[13] = s[18] = s[23] = '-'

  // 将s数组中的元素拼接成字符串，赋值给uuid
  const uuid = s.join('')
  // 返回uuid
  return uuid
}
// 38673f6b-bacc-4d9b-9330-dd97b7ae238f

/**
 * @description 千分位
 * @param {string | number} num
 * @return {void}
 * @return {string}
 */
// 导出一个函数，用于添加千分位
export function addThousand(num: string | number): string {
  // 如果传入的参数存在，则将其转换为数字，并保留两位小数
  if (num)
    num = Number(num).toFixed(2)

  // 如果传入的参数不存在或者为NaN，则返回'--'
  if ((!num && num !== 0) || num == 'NaN')
    return '--'
  // 正则表达式，用于匹配三位数字
  const regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g
  // 将数字替换为千分位
  num = num.toString().replace(regForm, '$1,')
  return num
}

/**
 * @description 大数值转换和保留n位有效数字
 * @param {number} num {number} digits
 * @return {string}
 */
// 导出一个函数numberFormatter，用于格式化数字，参数num为数字，参数digits为数字或者undefined
export function numberFormatter(num: number, digits: number | undefined): string {
  // 定义一个数组si，用于存放单位
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
  // 遍历数组si，如果num大于等于si中的每一项的value，则返回格式化后的数字和单位，否则返回num的toString
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
// 导出一个名为copy的函数，该函数接收一个字符串参数，返回一个字符串或者MessageHandler
export function copy(value: string): string | MessageHandler {
  // 如果传入的参数为空，则返回错误信息
  if (!value)
    return ElMessage.error('复制失败')

  // 创建一个textarea标签
  const tag = document.createElement('textarea')
  // 给textarea标签赋值
  tag.value = value
  // 将textarea标签添加到body中
  document.body.appendChild(tag)
  // 选中textarea标签中的文本
  tag.select()
  // 执行复制操作
  document.execCommand('copy')
  // 复制成功，返回成功信息
  ElMessage.success('复制成功')
  // 移除textarea标签
  tag.remove()
  // 返回传入的参数
  return value
}

/**
 * @description 防抖
 * @param {number} timer
 * @return {Function}
 */
// 导出一个函数，用于防抖，参数timer默认值为0
export function debounce(timer = 0): (callback: unknown, delay: number) => void {
  // 返回一个函数，该函数接收回调函数和延迟时间两个参数
  return (callback: unknown, delay: number) => {
    // 如果timer存在，清除定时器
    if (timer)
      clearTimeout(timer)

    // 如果回调函数存在，设置定时器，延迟delay毫秒后执行回调函数
    if (typeof callback === 'function')
      timer = setTimeout(callback, delay)
  }
}

/**
 * @description 节流
 * @param {number} timer
 * @return {Function}
 */
// 导出一个函数，该函数接受两个参数，一个是函数fn，一个是定时器timer
export const throttle: (fn: (...args: unknown[]) => void, timer: number) => (...args: unknown[]) => void = (fn, timer = 0) => {
  // 定义一个变量time，初始值为null
  let time: number | null = null
  // 返回一个函数，该函数接受任意参数
  return (...args: unknown[]) => {
    // 如果time不为null，则清除定时器
    if (time)
      clearTimeout(time)
    // 设置定时器，定时调用fn函数，并传入参数args
    time = setTimeout(() => {
      fn.apply(this, args)
    }, timer)
  }
}
