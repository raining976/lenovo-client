<template>
    <el-form v-model="formData" label-width="auto" style="max-width: 400px">
        <el-form-item label="头像" class="avatar">
            <el-upload :http-request="uploadAvatar" name="avatar" :limit="1" :show-file-list="false">
                <el-avatar @error="handlerAvatarError" :size="50" :src="avatarUrl" />
            </el-upload>
        </el-form-item>
        <el-form-item label="邮箱">
            <span>{{ formData.email }}</span>
        </el-form-item>
        <el-form-item label="账户余额">
            <span>¥{{ (formData.balance / 100).toFixed(2) }}</span>
        </el-form-item>
        <el-form-item label="昵称" width="200px">
            <el-input v-show="isEdit" v-model="formData.nickname" />
            <span v-show="!isEdit">{{ userStore.userInfo.nickname }}</span>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-show="isEdit" v-model="formData.gender">
                <el-radio :value="0">未知</el-radio>
                <el-radio :value="1">男</el-radio>
                <el-radio :value="2">女</el-radio>
            </el-radio-group>
            <span v-show="!isEdit">{{ sexList[userStore.userInfo.gender] }}</span>
        </el-form-item>
        <el-form-item class="btnBox">
            <el-button v-show="isEdit" type="primary" @click="onSubmit">提交</el-button>
            <el-button v-show="isEdit" @click="isEdit = false">取消</el-button>
            <el-button v-show="!isEdit" type="primary" @click="isEdit = true">修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import { useUserStore } from "@/store"
const userStore = useUserStore()
const isEdit = ref(false)
const sexList = ref(['未知', '男', '女'])
const formData = ref({
    avatar: "",
    balance: 1000000,
    createdTime: '',
    email: "",
    id: 1,
    nickname: "",
    gender: ""
})
const avatarUrl = ref('')
onMounted(async () => {
    getUserInfo()
})

const updateUserInfo = () => {
    for (let i in userStore.userInfo) {
        formData.value[i] = userStore.userInfo[i]
    }
    avatarUrl.value = formData.value.avatar
}

const { proxy } = getCurrentInstance()

const changeInfo = () => {
    const form = {
        id: formData.value.id,
        nickname: formData.value.nickname,
        gender: formData.value.gender
    }
    proxy.$api.changeUserInfo(form).then(res => {
        if (res.code == 0) {
            getUserInfo()
        }
    })
}

const getUserInfo = () => {
    proxy.$api.getUserInfo().then(res => {
        const info = res.data
        info.avatar ="https://lenovo.imbai.cn" + info.avatar
        userStore.setUserInfo(info)
        updateUserInfo()
        isEdit.value = false
        
    })
}

const onSubmit = () => {
    changeInfo()
    console.log('submit!')
}

const uploadAvatar = (f) => {
    const formData = new FormData()
    formData.append('avatar', f.file)
    proxy.$api.uploadAvatar(formData).then(res => {
        if (res.code == 0) {
            getUserInfo()
        }
    })
}


const handlerAvatarError = () => {
    avatarUrl.value = '/defaultAvatar.jpg'
}
</script>

<style scoped>
.btnBox {
    padding: 0 30px;
}

.avatar ::v-deep .el-form-item__label-wrap {
    align-items: center;
}
</style>