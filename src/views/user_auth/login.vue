<template>
    <el-card style="width: 460px;height: 640px;">
        <template #header>
            <div class="card-header">
                <span>登录</span>
            </div>
        </template>
        <el-form :model="form" label-width="auto" style="max-width: 460px">
            <el-form-item label="email">
                <el-input v-model="form.email"  @keydown.enter="onSubmit"/>
            </el-form-item>
            <el-form-item label="password">
                <el-input v-model="form.password" @keydown.enter="onSubmit" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { getCurrentInstance } from 'vue';
import router from "@/router"
const { proxy } = getCurrentInstance()
import { useUserStore } from "@/store"

const userStore = useUserStore()
const form = ref({
    email: '',
    password: ''
})
const onSubmit = () => {
    console.table(form.value)
    proxy.$api.login(form.value).then(res=>{
        console.log('res',res)
        if(res.code == 0){
            // TODO: 
            // 1. 存token 
            // 2. 请求userinfo
            // 3. 存用户信息
            userStore.setToken(res.data)
            handleUserInfo()
            // 跳转
            router.push('/')
        }
    })
}

const handleUserInfo = ()=>{
    proxy.$api.getUserInfo().then(res=>{
        console.log('res',res)
    })
}
</script>