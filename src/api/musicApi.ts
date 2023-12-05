import testRequest from '@/utils/service'
import { TEST_BASE_URL } from '@/utils/service/config'

// 登陆
export function getLrc() {
  return testRequest.get({
    url: `${TEST_BASE_URL}/music`
  })
}
