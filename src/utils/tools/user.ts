import useUserStore from '../../store/modules/user'
import { Local } from '@/utils/cache'

const userStore = useUserStore()

export function logout() {
  userStore.LOGOUT()
  setTimeout(() => {
    window.location.href = '/login'
  }, 500)
}

export function setToken(token: string) {
  Local.set('token', token)
}

export function getToken() {
  const token = Local.get('token')
  return token
}
