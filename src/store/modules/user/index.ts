import { defineStore } from 'pinia'
import { Local } from '@/utils/cache'

const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {
      id: '',
      username: '',
      nickname: '',
      roles: [],
    }, // 用户信息
  }),
  // 添加 persist 属性
  persist: true,
  actions: {
    SET_USER_INFO(info: any) {
      this.userInfo = info
    },
    LOGOUT() {
      this.userInfo = {
        id: '',
        username: '',
        nickname: '',
        roles: [],
      }
      Local.clear()
    },
  },
})

export default useUserStore
