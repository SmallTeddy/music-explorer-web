<template>
  <div class="flex-c flex-align h-100">
    <el-button type="primary" @click="goRouter('/news')">go news</el-button>
    <el-button type="primary" @click="goRouter('/user')">go user</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goRouter = (path: string): void => {
  router.push(path)
}
</script>
