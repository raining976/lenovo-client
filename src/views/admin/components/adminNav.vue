<template>
  <div class="asideContainer">
    <div class="logContainer " :class="{foldClass: adminSettingStore.isFold}">
        <img src="@/assets/logo/logo2.png" alt="Logo" v-show="!adminSettingStore.isFold" />
        <img src="@/assets/logo/logo1.png" alt="" v-show="adminSettingStore.isFold">
    </div>
    <div class="menuContainer">
      <el-menu :default-active="activeMenu" class="commonMenu" active-text-color="#ffd04b" background-color="#545c64"
        text-color="#fff" :collapse="adminSettingStore.isFold">

        <li class="menuItem" v-for="(table, i) in tableList" :key="i" >
          <router-link :to="table.link">
          <el-menu-item :index="table.link" >
            <el-icon >
              <component :is="table.iconName"></component>
            </el-icon>
            <span v-show="!adminSettingStore.isFold" class="title">{{ table.title }}</span>
          </el-menu-item>
          </router-link>
        </li>


      </el-menu>
    </div>

  </div>






</template>



<script setup>


const tableList = ref([
  {
    title: "后台首页",
    link: '/admin',
    iconName:'HomeFilled'
  },
  {
    title: "用户列表",
    link: '/admin/user_list',
    iconName:'Avatar'
  },
  {
    title: "订单列表",
    link: '/admin/order_list',
    iconName:'List'
  },
  {
    title: "商品列表",
    link: '/admin/good_list',
    iconName:'GoodsFilled'
  },
])
import { useAdminSettingStore } from '@/store'

const adminSettingStore = useAdminSettingStore()

import { useRoute } from 'vue-router';

const route = useRoute()
const activeMenu = computed(() => {
  // 返回当前路径或父路径
  const path = route.path;
  if (path.startsWith('/admin/goodsInfo')) {
    return '/admin/good_list'; 
  }
  if (path.startsWith('/admin/orderInfo')) {
    return '/admin/order_list'; 
  }
  if (path.startsWith('/admin/userInfo')) {
    return '/admin/user_list'; 
  }
  return path;

})




</script>
<style scoped>
.logContainer{
  height: 60px;
  width: 200px;
  transition: width 0.3s;

  text-align: center;
  line-height: 75px;
}
.logContainer.foldClass{
  width: 64px;
}

.logContainer img {
  height: 30px;
  /* Adjust as needed */
}

.el-menu {
  border: none;
  height: calc(100vh - 60px);
}
.menuItem .title{
  width: 56px;
}


</style>