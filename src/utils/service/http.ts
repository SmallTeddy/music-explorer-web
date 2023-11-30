import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import type { BaseRequestConfig, BaseRequestInterceptors } from './types'
import { getToken, logout } from '@/utils/tools/user'

const DEFAULT_LOADING = false
let isRelogin = false

class BaseRequest {
  // axios 实例
  instance: AxiosInstance
  interceptors?: BaseRequestInterceptors
  showLoading: boolean | string
  loading?: LoadingInstance

  constructor(config: BaseRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.loading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1. 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (config.params && config.params.responseType) {
          config.responseType = config.params.responseType
          delete config.params.responseType
        }
        if (
          (config.method === 'post' || config.method === 'put')
          && config.params
        ) {
          if (config.params.formData)
            config.data = config.params.formData
          else
            config.data = { ...config.params }

          delete config.params
        }
        // console.log('所有的实例都有的拦截器: 请求成功拦截')
        if (this.showLoading) {
          const loadingText
            = typeof this.showLoading == 'boolean' ? '加载中' : this.showLoading
          this.loading = ElLoading.service({
            lock: true,
            text: `${loadingText}...`,
            background: 'rgba(0, 0, 0, 0.5)',
          })
        }
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 请求失败拦截')
        return err
      },
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()
        if (res.status !== 200)
          return res
        return res.data
      },
      (err) => {
        // console.log('所有的实例都有的拦截器: 响应失败拦截')
        // 将loading移除
        this.loading?.close()

        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        switch (err.response.status) {
          case 400:
            ElMessage.error('请求错误(400)')
            break
          case 401:
            ElMessage.error('未授权，请重新登录(401)')
            logout()
            break
          case 403:
            ElMessage.error('拒绝访问(403)')
            break
          case 404:
            ElMessage.error('请求出错(404)')
            break
          case 408:
            ElMessage.error('请求超时(408)')
            break
          case 500:
            ElMessage.error('服务器错误(500)')
            break
          case 501:
            ElMessage.error('服务未实现(501)')
            break
          case 502:
            ElMessage.error('网络错误(502)')
            break
          case 503:
            ElMessage.error('服务不可用(503)')
            break
          case 504:
            ElMessage.error('网络超时(504)')
            break
          case 505:
            ElMessage.error('HTTP版本不受支持(505)')
            break
          default: {
            ElMessage.error(`连接出错(${err.response.status})!`)
          }
        }
        return err
      },
    )
  }

  request<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        // 对config 进行转化
        config = config.interceptors.requestInterceptor(
          config as InternalAxiosRequestConfig,
        )
      }
      // 携带token的拦截
      if (!config.noToken && getToken()) {
        config.headers = {
          Authorization: getToken(),
        }
      }
      // 2.判断是否需要显示loading
      if (config.loading)
        this.showLoading = config.loading

      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor)
            res = config.interceptors.responseInterceptor(res)

          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          if (res.status !== 200) {
            if (config.responseType == 'blob') {
              resolve(res)
              return
            }
            let errMsg = res.message || '请求失败'
            if (res.code == '501')
              errMsg = '数据中存在敏感词汇, 请修改!'
            if (res.status == 401) {
              if (!isRelogin) {
                isRelogin = true
                // prettier-ignore
                errMsg = res.message || '登录状态已过期，您可以继续留在该页面，或者重新登录'
                ElMessageBox.confirm(errMsg, '系统提示', {
                  confirmButtonText: '重新登录',
                  cancelButtonText: '取消',
                  type: 'warning',
                })
                  .then(() => {
                    isRelogin = false
                    logout()
                  })
                  .catch(() => {
                    isRelogin = false
                  })
              }
              reject(res)
              return
            }
            ElMessage({
              message: errMsg,
              type: 'error',
            })
            reject(res)
          }
          else {
            resolve(res)
          }
        })
        .catch((err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default BaseRequest
