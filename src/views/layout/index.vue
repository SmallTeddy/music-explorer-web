<script lang="ts" setup></script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="flex-c flex-align header">
        <h2 style="color: #ffffff90">SmallTeddy</h2>
      </el-header>
      <el-container>
        <!-- <el-aside class="flex-c flex-align h-100 aside">
          Aside
        </el-aside> -->
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

.aside {
  background-color: #d3dce6;
  width: 200px;
}

.el-main {
  overflow: hidden;
  padding: 0;
}
</style>
