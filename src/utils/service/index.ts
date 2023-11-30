import BaseRequest from './http'
import { TIME_OUT } from './config'

const testRequest = new BaseRequest({
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      const errRes = err.response
      if (errRes) {
        return {
          status: errRes.status,
          message: errRes.data.message,
        }
      }
      return err
    },
  },
})

export default testRequest
