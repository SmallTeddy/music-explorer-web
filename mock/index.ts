import type { MockMethod } from 'vite-plugin-mock'

const mockItems: MockMethod[] = [
  {
    url: '/mock/login',
    method: 'post',
    response: () => {
      return {
        status: 200,
        data: {
          access_token: 'abc',
        },
        message: 'success',
      }
    },
  },
]

export default mockItems
