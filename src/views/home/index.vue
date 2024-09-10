<template>
  <div class="homeLayout">
    <el-container>
      <el-header height="60px" class="header">
        <router-link to="/" class="homeLink"><img src="@/assets/logo/logo2.png" alt="logo" class="logo"></router-link>
        <appNav v-show="isShow"></appNav>
      </el-header>
      <el-main class="mainContainer">
        <router-view></router-view>
      </el-main>
      <el-footer  height="60px" v-show="isShow">Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const isShow = computed(() => {
  return !(route.name =='login' || route.name == 'register' || route.name == '404page' || route.name == 'payment_success')
})
</script>


<style lang="scss" scoped>
$navHeight : 60px;

.header {
  display: flex;
  align-items: center;
  background-color: $background-color-light;
  width: $h-width;
  margin:0 auto;
  padding: 0;
  .homeLink,
  .logo {
    display: inline-block;
    width: 178px;
    height: 36px;
  }
}
.mainContainer{
  padding: 0;
  min-height: calc(100vh - 120px);
  
}
</style>