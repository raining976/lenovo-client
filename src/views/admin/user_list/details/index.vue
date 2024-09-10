<template>
  <div class="userDetailContainer">
    <el-form :model="detail" label-width="120px" class="user-form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户ID">
            <el-input 
            v-model="detail.id" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱账号">
            <el-input v-model="detail.email" 
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="昵称">
            <el-input v-model="detail.nickname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-select v-model="detail.gender" placeholder="请选择性别">
              <el-option label="男" :value=1></el-option>
              <el-option label="女" :value=2></el-option>
              <el-option label="未知" :value=0></el-option>
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
  import { onMounted } from 'vue';
  const { proxy } = getCurrentInstance()

  const router = useRouter();

  const props = defineProps({
    id:String,
  })

  

  onMounted(()=>{
    console.log('user id:',props.id)
    // 发起请求 根据该id 获取用户详细信息
    // 拿到信息后存到dtail对象
    const editUser = {userId:props.id,page:1,limit:10}
    proxy.$api.adminGetUserList(editUser).then(res=>{
      if(res.code===0){
        detail.value=res.data.records[0]
        console.log(detail.value)
      }
    })
  })

  const detail = ref({
    id: props.id,
    email: '',
    password:'',
    nickname: '',
    gender: null,
    balance: ''
  });

  

  const saveDetails = () => {
    // Emit the details back to the table page or perform other save actions
    console.log('保存用户详情:', detail.value);
    const saveVal = detail.value;
    if(saveVal.email===''){
      alert('邮箱账号不能为空');
      return;
    }
    else if(saveVal.name===''){
      alert('昵称不能为空');
      return;
    }
    else if(saveVal.balance===''){
      alert('余额不能为空');
      return;
    }
    const UpdateUser = {
      gender: saveVal.gender,
      nickname: saveVal.nickname,
      email: saveVal.email,
      balance: saveVal.balance,
      userId:saveVal.id 
    }
    proxy.$api.adminUpdateUser(UpdateUser).then(res=>{
      if(res.code===0){
        router.replace('/admin/user_list');
      }
    })
    
  };

  const cancel = () => {
    router.replace('/admin/user_list'); // Return to the user list without saving
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
