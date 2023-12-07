<script lang="ts" setup></script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-header class="flex-c flex-align header">
        <h2 style="color: #ffffff90">SmallTeddy Music</h2>
      </el-header> -->
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 60px;
  background-color: #333;
}

.el-main {
  overflow: hidden;
  padding: 0;
}
</style>
