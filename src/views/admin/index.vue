<template>
    <div class="common-layout">
        <el-container>
          <el-aside width="auto" >
            <pageNav></pageNav>
          </el-aside>
          <el-container>
            <el-header>
              <pageHeader></pageHeader>
            </el-header>
            <el-main>
              <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
</template>
<script setup>
import pageNav from './components/adminNav.vue'
import pageHeader from './components/adminHead.vue'
</script>
<style scoped> 

html, body {
    height: 100%;
    margin: 0;
  }
  
  .el-container {
    height: 100vh;
    display: flex;
    flex-direction: row; /* 水平布局以容纳 el-aside 和内层 el-container */
  }
   
  .el-container > .el-container {
    height: 100%; /* 确保内层 el-container 填满父容器的高度 */
    flex-direction: column; /* 垂直布局以容纳 el-header 和 el-main */
  }
  
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 25px;
    padding-left: 15px;
  }
  
  .el-main {
    padding: 20px;
    flex: 1; /* 使 el-main 填满剩余空间 */
    background-color: #f6f7f9;
  }

  .el-aside{
    background-color: #545c64;
  }
</style>