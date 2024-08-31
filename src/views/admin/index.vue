<template>
    <div class="common-layout">
        <el-container>
          <el-aside>
            <pageNav></pageNav>
          </el-aside>
          <el-container>
            <el-header>Header</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
          </el-container>
        </el-container>
      </div>
</template>
<script setup>
import pageNav from './components/adminNav.vue'

</script>
<style scoped> </style>