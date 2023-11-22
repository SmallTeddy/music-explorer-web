<template>
  <div class="login-main" v-loading="loading" element-loading-text="Logging in...">
    <div class="login-form">
      <div class="logo flex-c flex-align">
        <!-- <img style="height: 50px;" src="../../assets/logo.png" alt="logo" /> -->
      </div>
      <el-form :model="loginForm" label-position="left" label-width="100px">
        <el-form-item label="Username：">
          <el-input v-model="loginForm.username" />
        </el-form-item>
        <el-form-item label="Password：">
          <el-input type="password" v-model="loginForm.password" />
        </el-form-item>
      </el-form>
      <div class="footer-btn flex-c">
        <button class="login-btn" @click="loginClick">login</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Local } from "@/cache/index";
// import { getToken, userLogin } from '@/api/userApi'
// import useUserStore from '@/store/modules/user';
import { handleEnter } from "@/utils/tools";

const { proxy } = getCurrentInstance() as any;
// const userStore = useUserStore()
const router = useRouter();

const loading = ref(false);

const loginForm = ref({
  username: "test",
  password: "1234",
});

const loginClick = () => {
  loading.value = true;
  const accessToken = Local.get("token");
  if (!accessToken) {
    Local.set("token", "abc");
    userLoginFunc();
    // getToken().then((res: any) => {
    //   Local.set('token', res.access_token || res.data.access_token)
    // }).then(() => {
    //   userLoginFunc()
    // }).catch((err) => {
    //   proxy.$message.error(err)
    //   loading.value = false
    // })
  } else {
    userLoginFunc();
  }
};

const userLoginFunc = () => {
  loading.value = false;
  // userStore.SET_USER_INFO(res)
  router.push({ path: "/home" });
};

onMounted(() => {
  handleEnter(loginClick);
});
</script>

<style scoped lang="scss">
.logo {
  margin-bottom: 20px;

  span {
    font-size: 20px;
    font-weight: 700;
    color: #003574;
    margin-left: 8px;
  }
}

.login-main {
  height: 100vh;
  background: url(../../assets/login-bg.png) no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-family: "alliance", mono, sans-serif;
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-transform: none;
  font-weight: 600;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  width: 100%;
  border-radius: 0;
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
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  top: 1px;
  left: 1px;
  background: #000;
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
  background: linear-gradient(
    269.16deg,
    #9867f0 -15.83%,
    #3bf0e4 -4.97%,
    #33ce43 15.69%,
    #b2f4b6 32.43%,
    #ffe580 50.09%,
    #ff7571 67.47%,
    #ff7270 84.13%,
    #ea5dad 105.13%,
    #c2a0fd 123.24%
  );
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
  color: #000;
}
</style>
