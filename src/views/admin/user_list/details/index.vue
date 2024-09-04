<template>
  <div class="userDetailContainer">
    <el-form :model="detail" label-width="120px" class="user-form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户ID">
            <el-input v-model="detail.userId" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号">
            <el-input v-model="detail.email" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
  
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="昵称">
            <el-input v-model="detail.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-select v-model="detail.sex" placeholder="请选择性别">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
              <el-option label="未知" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
  
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="余额">
            <el-input v-model="detail.balance"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
  
      <el-form-item>
        <el-button type="primary" @click="saveDetails">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const detail = ref({
  userId: '',
  email: '',
  name: '',
  sex: '',
  balance: ''
});

onMounted(() => {
  const { query } = route;
  if (query) {
    detail.value = { ...query };
  }
});

const saveDetails = () => {
  // Emit the details back to the table page or perform other save actions
  console.log('保存用户详情:', detail.value);
  router.push('/admin/user_list'); // Return to the user list after saving
};

const cancel = () => {
  router.push('/admin/user_list'); // Return to the user list without saving
};
</script>

<style scoped>
.userDetailContainer {
  padding: 20px;
  background-color: #fff;
}

.user-form {
  max-width: 800px;
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  margin-right: 10px;
}
</style>
