<template>
  
  <el-button @click="adminSettingStore.switchFold()" type="primary" :icon="Operation" plain />
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
      
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="() => closeSystem()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
    
</template>
  
<script setup>

  import { ArrowRight, Operation } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  import { useAdminSettingStore } from '@/store';
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
      // route.matched 保存着路由记录，包含任何已被加载并在 components 对象内被替换掉的懒加载组件
      // meta是定义的路由里面的meta属性，可以自定义
      breadcrumbItems.value = route.matched.filter(r => r.meta && r.meta.title);
    },
    { immediate: true }
  );

</script>
  
<style scoped>
  
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
    font-size: 15px;
  }
  
  
</style>