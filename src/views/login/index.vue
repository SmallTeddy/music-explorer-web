<template>
  <div class="login-main" v-loading="loading" element-loading-text="Logging in...">
    <div class="login-form">
      <div class="logo flex-c flex-align">
        <!-- <img style="height: 50px;" src="../../assets/logo.png" alt="logo" /> -->
      </div>
      <el-form :model="loginForm" label-position="left" label-width="100px">
        <el-form-item label="Username：">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password：">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer-btn flex-c">
        <el-button size="large" type="primary" @click="loginClick" style="width: 100%"
          >login</el-button
        >
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
  username: "",
  password: "",
});

const loginClick = () => {
  loading.value = true;
  const accessToken = Local.get("token");
  if (!accessToken) {
    Local.set("token", "abc");
    userLoginFunc()
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
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
</style>
