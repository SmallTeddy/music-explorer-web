<template>
  <div>
    <el-button type="primary" @click="showArticleInfo(1)">id: 1</el-button>
    <el-button type="primary" @click="showArticleInfo(2)">id: 2</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const showArticleInfo = (id: number) => {
  router.push({
    path: `/news/article/${id}`,
  });
};
</script>
