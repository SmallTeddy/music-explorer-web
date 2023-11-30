import { ElMessage } from 'element-plus'
import { blobType } from './blobType'

export function download(file: any, fileType: string, fileName?: string) {
  if (!fileName) {
    const timeStr = new Date().getTime()
    fileName = `${timeStr}`
  }
  const type = formatFileType(fileType)
  if (!type)
    return ElMessage.warning('暂不支持此格式!')
  const blob = new Blob([file], { type })
  const downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob) // 创建下载的链接
  downloadElement.href = href
  downloadElement.download = fileName // 下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() // 点击下载
  document.body.removeChild(downloadElement) // 下载完成移除元素
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}

export function formatFileType(fileFormat: string) {
  return blobType[fileFormat]
}

export function blobToFileReader(blob: any, callback: any) {
  if (!blob.size)
    return ElMessage.warning('暂无资源!')
  if (blob.type !== 'application/json')
    return callback(blob)
  const fr: any = new FileReader()
  fr.onloadend = function () {
    try {
      callback(JSON.parse(fr.result))
    }
    catch (err) {
      ElMessage.warning('资源数据有误!')
    }
  }
  fr.readAsText(blob)
}
