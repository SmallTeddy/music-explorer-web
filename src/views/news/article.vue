<template>
  <div>{{ route.path }}</div>
  <el-button type="danger" @click="goBack">return</el-button>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

console.log(route, "route");

const goBack = () => {
  router.go(-1);
};
</script>
