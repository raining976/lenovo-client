<template>
  <div class="homeLayout">
    <el-container>
      <el-header height="60px" class="header">
        <div class="headerContainer">
          <router-link to="/" class="homeLink"><img src="@/assets/logo/logo2.png" alt="logo" class="logo"></router-link>
          <appNav v-show="isShow"></appNav>
        </div>
      </el-header>
      <el-main class="mainContainer">
        <router-view></router-view>
      </el-main>
      <!-- <el-footer height="60px" v-show="isShow">Footer</el-footer> -->
    </el-container>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const isShow = computed(() => {
  return !(route.name == 'login' || route.name == 'register' || route.name == '404page' || route.name == 'payment_success')
})
</script>


<style lang="scss" scoped>
$navHeight : 60px;

.header {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $background-color-light;
  position: sticky;
  top: 0;
  z-index: 999;
}

.headerContainer {
  display: flex;
  align-items: center;
  background-color: $background-color-light;
  width: $h-width;
  margin: 0 auto;
  padding: 0;


  .homeLink,
  .logo {
    display: inline-block;
    width: 178px;
    height: 36px;
  }
}

.mainContainer {
  padding: 0;
  min-height: calc(100vh - $navHeight);

}
</style>