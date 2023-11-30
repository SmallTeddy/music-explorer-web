<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getToken, setToken } from '@/utils/tools/user'
import { userLogin } from '@/api/userApi'
import useUserStore from '@/store/modules/user'
import { handleEnter } from '@/utils/tools'

// const { proxy } = getCurrentInstance() as any;
const userStore = useUserStore()
const router = useRouter()

const loading = ref(false)

const loginForm = ref({
  username: 'test',
  password: '1234',
})

function loginClick() {
  loading.value = true
  const accessToken = getToken()
  if (!accessToken) {
    userLogin()
      .then((res) => {
        setToken(res.data.access_token)
      })
      .then(() => {
        userLoginFunc()
      })
      .catch((err) => {
        ElMessage.error(err)
        loading.value = false
      })
  }
  else {
    userLoginFunc()
  }
}

function userLoginFunc() {
  loading.value = false
  userStore.SET_USER_INFO({
    id: 1,
    username: 'test',
    nickname: '测试账号',
    roles: ['admin', 'test'],
  })
  router.push({ path: '/home' })
}

onMounted(() => {
  handleEnter(loginClick)
})
</script>

<template>
  <div v-loading="loading" class="login-main" element-loading-text="Logging in...">
    <div class="login-form">
      <div class="logo flex-c flex-align">
        <!-- <img style="height: 50px;" src="../../assets/logo.png" alt="logo" /> -->
      </div>
      <el-form :model="loginForm" label-position="left" label-width="100px">
        <el-form-item label="Username：">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="Password：">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
      </el-form>
      <div class="footer-btn flex-c">
        <button class="login-btn" @click="loginClick">
          login
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  margin-bottom: 20px;

  span {
    margin-left: 8px;
    font-size: 20px;
    color: #003574;
    font-weight: 700;
  }
}

.login-main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../../assets/login-bg.png") no-repeat;
  background-size: 100% 100%;
}

.login-form {
  position: relative;
  top: -110px;
  background: #000;
  border-radius: 8px;

  ::v-deep(.el-form-item__label) {
    color: #fff;
  }
}

.login-btn {
  width: 100%;
  height: 38px;
  font-family: "alliance", mono, sans-serif;
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #c8a43a;
  overflow: hidden;
  background: transparent;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  font-feature-settings: "salt" on, "ss01" on, "ss02" on;
  color: #fff;
  transition: background 0.3s ease-in-out, border-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
  transition-property: background, border-color, color;
  transition-duration: 0.3s, 0.3s, 0.3s;
  transition-timing-function: ease-in-out, ease-in-out, ease-in-out;
  transition-delay: 0s, 0s, 0s;
}

.login-btn:before {
  content: "";
  display: block;
  position: absolute;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  top: 2px;
  left: 2px;
  border-radius: 8px;
  z-index: -1;
  transform: translate3d(0, 0, 0);
  transition: background 0.3s ease-in-out;
}

.login-btn:after {
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  z-index: -3;
  background: linear-gradient(269.16deg,
      #b2f4b6 -15.83%,
      #33ce43 -4.97%,
      #3bf0e4 15.69%,
      #9867f0 32.43%,
      #c2a0fd 50.09%,
      #ea5dad 67.47%,
      #ff7270 84.13%,
      #ff7571 105.13%,
      #ffe580 123.24%);
  background-position: 58% 50%;
  background-size: 500%;
  animation: gradient-shift 30s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 58% 50%;
  }

  25% {
    background-position: 100% 0%;
  }

  75% {
    background-position: 10% 50%;
  }

  to {
    background-position: 58% 50%;
  }
}

.login-btn:hover:before {
  background: transparent;
}

.login-btn:hover {
  cursor: pointer;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
</style>
@/utils
