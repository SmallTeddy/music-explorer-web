import testRequest from '@/utils/service'
import { TEST_BASE_URL } from '@/utils/service/config'

// 登陆
export function userLogin(data = {}) {
  return testRequest.post({
    url: `${TEST_BASE_URL}/login`,
    data,
  })
}
