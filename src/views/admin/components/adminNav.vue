<template>
  <div class="sidebar-container">
    <!-- Logo Section -->
    <div class="logo">
      <img src="@/assets/logo/logo2.png" alt="Logo" />
    </div>
    <!-- Menu Section -->
    <el-menu
      class="el-menu-vertical-demo"
      default-active="2"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item v-for="table in tableList":key="table.title" @click="() => openRouter(table.link)">
        {{ table.title }}
      </el-menu-item>
    </el-menu>
  </div>


</template>



<script setup>

import { useRouter } from 'vue-router';

const tableList = ref([
    {
        title:"用户列表",
        link:'/admin/user_list'
    },
    {
        title:"订单列表",
        link:'/admin/order_list'
    },
    {
        title:"商品列表",
        link:'/admin/good_list'
    },
])

const router =useRouter()
const openRouter = (link) => {
  router.push(link)
}

</script>
<style scoped>
.sidebar-container {
  height: 100vh;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.logo img {
  height: 30px; /* Adjust as needed */
}

.el-menu-vertical-demo {
  flex: 1;
  overflow: auto;
}

</style>