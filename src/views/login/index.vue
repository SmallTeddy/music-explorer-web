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
import { getToken, setToken } from "@/utils/tools/user";
import { userLogin } from "@/api/userApi";
import useUserStore from "@/store/modules/user";
import { handleEnter } from "@/utils/tools";
import { ElMessage } from "element-plus";

// const { proxy } = getCurrentInstance() as any;
const userStore = useUserStore();
const router = useRouter();

const loading = ref(false);

const loginForm = ref({
  username: "test",
  password: "1234",
});

const loginClick = () => {
  loading.value = true;
  const accessToken = getToken();
  if (!accessToken) {
    userLogin()
      .then((res) => {
        setToken(res.data.access_token);
      })
      .then(() => {
        userLoginFunc();
      })
      .catch((err) => {
        ElMessage.error(err);
        loading.value = false;
      });
  } else {
    userLoginFunc();
  }
};

const userLoginFunc = () => {
  loading.value = false;
  userStore.SET_USER_INFO({
    id: 1,
    username: "test",
    nickname: "测试账号",
    roles: ["admin", "test"],
  });
  router.push({ path: "/home" });
};

onMounted(() => {
  handleEnter(loginClick);
});
</script>

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
  position: relative;
  z-index: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 40px;
  font-size: 14px;
  font-family: alliance, mono, sans-serif;
  color: #fff;
  background: transparent;
  border-radius: 0;
  transition: background 0.3s ease-in-out, border-color 0.3s ease-in-out,
    color 0.3s ease-in-out;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  font-feature-settings: "salt" on, "ss01" on, "ss02" on;
  transition-property: background, border-color, color;
  transition-duration: 0.3s, 0.3s, 0.3s;
  transition-timing-function: ease-in-out, ease-in-out, ease-in-out;
}

.login-btn::before {
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: -1;
  display: block;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background: #000;
  transition: background 0.3s ease-in-out;
  content: "";
  transform: translate3d(0, 0, 0);
}

.login-btn::after {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -3;
  display: block;
  width: 100%;
  height: 100%;
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
  content: "";
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
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

  100% {
    background-position: 58% 50%;
  }
}

.login-btn:hover::before {
  background: transparent;
}

.login-btn:hover {
  cursor: pointer;
  color: #000;
}
</style>
@/utils
