import { ElMessage } from 'element-plus'
import { blobType } from './blobType'

export function download(file: any, fileType: string, fileName?: string) {
  // 如果没有传入文件名，则生成文件名
  if (!fileName) {
    const timeStr = new Date().getTime()
    fileName = `${timeStr}`
  }
  // 格式化文件类型
  const type = formatFileType(fileType)
  // 如果不支持此格式，则提示
  if (!type)
    return ElMessage.warning('暂不支持此格式!')
  // 创建blob对象
  const blob = new Blob([file], { type })
  // 创建a标签
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = fileName
  // 点击下载
  document.body.appendChild(downloadElement)
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
  // 释放掉blob对象
  window.URL.revokeObjectURL(href)
}

// 格式化文件类型
export function formatFileType(fileFormat: string) {
  return blobType[fileFormat]
}

// 将blob转换为FileReader
export function blobToFileReader(blob: any, callback: any) {
  // 如果没有资源，则提示
  if (!blob.size)
    return ElMessage.warning('暂无资源!')
  // 如果不是json格式，则直接返回
  if (blob.type !== 'application/json')
    return callback(blob)
  // 创建文件读取器
  const fr: any = new FileReader()
  // 文件读取完毕后，尝试解析json数据，如果解析失败，则提示
  fr.onloadend = function () {
    try {
      callback(JSON.parse(fr.result))
    }
    catch (err) {
      ElMessage.warning('资源数据有误!')
    }
  }
  // 读取文件
  fr.readAsText(blob)
}
