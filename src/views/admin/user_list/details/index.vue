<template>
  
    <div>
      <el-form :model="detail">
        <el-form-item label="账号">
          <el-input v-model="detail.accounts"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="detail.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="detail.sex">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="detail.balance"></el-input>
        </el-form-item>
        <el-button type="primary" @click="saveDetails">保存</el-button>
      </el-form>
    </div>

</template>
  
<script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  
  const props = defineProps(['accounts', 'name', 'sex', 'balance'])
  const emit = defineEmits(['updateUser'])
  
  const router = useRouter()
  const route = useRoute()
  
  const detail = ref({ ...route.query }) // 从路由 query 中获取数据并初始化
  
  const saveDetails = () => {
    emit('updateUser', detail.value) // 触发事件，将数据传递回表格页面
    router.push('/admin/user_list')  // 保存后返回用户列表
  }

</script>
  