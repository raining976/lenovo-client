<template>
  <body id="poster">
    <el-form class="login-container" label-position="left" label-width="0px">
      <h3 class="login_title">管理员登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.email" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
 
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
 
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>
 
 
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAdminStore } from '@/store';

  const { proxy } = getCurrentInstance()
  const adminStore = useAdminStore()

  // 定义响应式数据
  const loginForm = ref({
    email: '',
    password: ''
  });
  const responseResult = ref([]);

  // 获取路由实例
  const router = useRouter();

  // 登录方法
  const login = async () => {
    proxy.$api.adminLogin(loginForm.value).then(res=>{
      console.log('res=',res)
      if(res.code===0){
        adminStore.token=res.data;
        console.log("token=",adminStore.token)
        router.replace('/admin')
      }
    })
    
  };
  
</script>
 
<style>
  #poster {
    
    background:url("@/assets/imgs/admin/adminLoginBackground.png") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
    padding: 0;
  }
 
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 300px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
 
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
 
 
</style>