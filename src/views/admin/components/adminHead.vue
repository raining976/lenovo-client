<template>
 <div class="headerContainer">
  <div class="leftBox">
    <span class="iconBox" @click="adminSettingStore.switchFold()" >
      <el-icon class="icon-large" v-show="!adminSettingStore.isFold"><Fold /></el-icon>
      <el-icon class="icon-large" v-show="adminSettingStore.isFold"><Expand /></el-icon>
    </span>
    <div class="breadCrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item 
          v-for="item,index in breadcrumbItems" 
          :key="index" 
          :to="{ path: item.path }">
          {{ item.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
        
  </div>
  <div class="rightBox">
    <el-dropdown>
      <div class="el-dropdown-link">
        <img class="adminEvatar" src="@/assets/icons/admin/adminAvatar.png" alt="">
        <span >
          admin
        </span>
      </div>
      
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="() => closeAdmin()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
 </div>
    
</template>
  
<script setup>

  import { ArrowRight, Fold, Expand } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  import { useAdminSettingStore } from '@/store';  //组件间传递信息
  import { ref, watch } from 'vue';

  const adminSettingStore = useAdminSettingStore();

  // 获取路由信息
  const { currentRoute } = useRouter();

  // 定义面包屑数据
  const breadcrumbItems = ref([]);

  // 监听当前路由变化
  watch(
    () => currentRoute.value,
    (route) => {
      breadcrumbItems.value = route.matched.filter(r => r.meta && r.meta.title);
    },
    { immediate: true }
  );

  const router= useRouter();
  const closeAdmin = () =>{
    router.replace('/adminLogin');
  }

</script>
  
<style scoped>
  .headerContainer{

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  
  }
  .headerContainer .iconBox{
      width: 20px;
      height: 20px;
      cursor: pointer;
  }
  .icon-large {
    font-size: 20px; /* 调整图标的大小 */
  }
  
  .leftBox{
    display: flex;
    align-items: center;
  }
  .breadCrumb {
    display: flex;           /* 启用 Flexbox 布局 */
    align-items: center;     /* 垂直居中对齐内容 */
    padding-left: 15px;
    height: 100%;            /* 使容器高度为其父容器的 100% */
    width: 100%;            /* 容器宽度为 600px */
    text-align: center;      /* 确保文本在每个子项内居中对齐 */
  }

  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: black;
  }
  .adminEvatar{
    height: 25px;
    margin-right: 10px; /* 设置图片与文本之间的间距 */
  }
  
  
</style>