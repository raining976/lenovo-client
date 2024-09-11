<template>
  <div class="userDetailContainer">
    <el-form :rules="rules" :model="detail" label-width="120px" class="user-form">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户ID">
            <el-input 
            v-model="detail.id" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="email" label="邮箱账号">
            <el-input v-model="detail.email" 
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="nickname" label="昵称">
            <el-input v-model="detail.nickname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="detail.gender">
              <el-radio :value=1>男</el-radio>
              <el-radio :value=2>女</el-radio>
              <el-radio :value=0>未知</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item prop="balance" label="余额(￥)">
            <el-input-number v-model="detail.balance" :precision="2" :step="0.01" controls-position="right"/>
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

  const rules = {
    email:[
        { required: true, message: '邮箱不能为空！', trigger: 'blur' }
    ],
    nickname: [
        { required: true, message: '昵称不能为空！', trigger: 'blur' }
    ],
    balance: [
        { required: true, message: '余额不能为空！', trigger: 'blur' }
    ],
      
  }

  onMounted(()=>{
    console.log('user id:',props.id)
    // 发起请求 根据该id 获取用户详细信息
    // 拿到信息后存到dtail对象
    const editUser = {userId:props.id,page:1,limit:10}
    proxy.$api.adminGetUserList(editUser).then(res=>{
      if(res.code===0){
        detail.value=res.data.records[0]
        detail.value.balance=Number((detail.value.balance / 100).toFixed(2));
      }
    })
  })

  const detail = ref({
    id: props.id,
    email: '',
    password:'',
    nickname: '',
    gender: 0,
    balance: ''
  });

  

  const saveDetails = () => {
    const saveVal = detail.value;
    if(
      saveVal.email===''||
      saveVal.nickname===''||
      saveVal.balance===''
    ){
      return;
    }
    const UpdateUser = {
      gender: saveVal.gender,
      nickname: saveVal.nickname,
      email: saveVal.email,
      balance: Math.floor(detail.value.balance * 100),
      userId:saveVal.id 
    }
    proxy.$api.adminUpdateUser(UpdateUser).then(res=>{
      if(res.code===0){
        ElMessage({
          type: 'success',
          message: '保存成功！',
        });
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
  margin: 20px;
  padding: 40px 20px 20px 20px;
  background-color: #fff;
}

.user-form {
  max-width: 800px;
  margin: 0 auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item .el-button {
  margin-right: 10px;
}

.el-form-item .el-input-number{
  width:100%
}
</style>
