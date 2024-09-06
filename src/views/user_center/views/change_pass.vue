<template>
    <el-form ref="ruleFormRef" style="max-width: 400px" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="ruleForm">
        <el-form-item label="原密码" prop="oldPass">
            <el-input v-model="ruleForm.oldPass" type="password" autocomplete="off" :show-password="true" />
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" :show-password="true" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" :show-password="true" />
        </el-form-item>
        <el-form-item class="btnBox">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
                提交
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
const { proxy } = getCurrentInstance()

const ruleFormRef = ref()

const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码！'))
    } else if (value != ruleForm.value.pass) {
        callback(new Error("两次密码不一致！"))
    } else {
        callback()
    }
}

const ruleForm = ref({
    pass: '',
    checkPass: '',
    oldPass: '',
})

const rules = reactive({
    oldPass: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    pass: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    checkPass: [
        { validator: validatePass2, trigger: 'blur' },
        { required: true, message: '请输入确认密码', trigger: 'blur' }
    ],
})

const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            const formData = {
                old: ruleForm.value.oldPass,
                new: ruleForm.value.pass
            }
            proxy.$api.changePass(formData).then(res=>{
                   resetForm(ruleFormRef.value)
            })
        } else {
            console.log('error submit!')
        }
    })
}


const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style lang="scss" scoped>
.btnBox {
    padding: 0 80px;
}
</style>