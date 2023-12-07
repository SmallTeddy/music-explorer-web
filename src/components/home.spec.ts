import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import App from '../App.vue'

describe('测试 App 组件', () => {

  it('测试基本功能', async () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBeTruthy()
  })
})
