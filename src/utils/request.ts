import axios from 'axios'
import { ElMessage } from "element-plus";
import { Local } from '../cache';
import useUserStore from '../store/modules/user'

const userStore = useUserStore()

const logout = () => {
  userStore.LOGOUT()
  setTimeout(() => {
    window.location.href = '/login'
  }, 500)
}

// 创建axios实例
const request = axios.create({
  timeout: 30 * 1000, // 请求超时时间
  withCredentials: true
})

// request 拦截器
request.interceptors.request.use(
  (config: any) => {
    const accessToken = Local.get('token')
    // 登陆则header加token
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    // 否则退出登陆
    return config
  },
  (error) => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

let errorFlag = false
// response 拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data
    // 适应导出功能返回值
    if (response.data?.status === 401) {
      logout()
      return
    }
    if (response.status === 200 && res) {
      return res
    } else {
      return res.data
    }
  },
  (error) => {
    if (!errorFlag) {
      errorFlag = true
      // 当响应异常时做处理
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            ElMessage.error('请求错误(400)');
            break;
          case 401:
            ElMessage.error('未授权，请重新登录(401)');
            logout()
            break;
          case 403:
            ElMessage.error('拒绝访问(403)');
            break;
          case 404:
            ElMessage.error('请求出错(404)');
            break;
          case 408:
            ElMessage.error('请求超时(408)');
            break;
          case 500:
            ElMessage.error('服务器错误(500)');
            break;
          case 501:
            ElMessage.error('服务未实现(501)');
            break;
          case 502:
            ElMessage.error('网络错误(502)');
            break;
          case 503:
            ElMessage.error('服务不可用(503)');
            break;
          case 504:
            ElMessage.error('网络超时(504)');
            break;
          case 505:
            ElMessage.error('HTTP版本不受支持(505)');
            break;
          default: {
            ElMessage.error(`连接出错(${error.response.status})!`);
          }
        }
      } else {
        ElMessage.error('连接服务器失败!');
      }
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

export default request