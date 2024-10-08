<template>
    <div class="registerContainer">
        <div class="title">注册联想账号</div>
        <div class="formContainer">
            <el-form ref="ruleFormRef" :model="form" label-width="auto" style="width: 360px" :rules="formRule" status-icon>
                <el-form-item required prop="email">
                    <el-input :style="inputStyle" placeholder="邮箱" v-model="form.email" @keydown.enter="onSubmit" />
                </el-form-item>
                <el-form-item required prop="code">
                    <el-input :style="inputStyle" style="width: 240px" placeholder="验证码" v-model="form.code"
                        @keydown.enter="onSubmit" />
                    <button class="getCodeBtn" :class="{ disabledClass: isDisabled }"
                        @click.prevent="validateEmail('email')" :disabled="isDisabled">{{ buttonText }}</button>
                </el-form-item>
                <el-form-item required prop="password">
                    <el-input :style="inputStyle" type="password" :show-password="true" placeholder="密码"
                        v-model="form.password" @keydown.enter="onSubmit" />
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :style="inputStyle" type="password" :show-password="true" placeholder="确认密码"
                        v-model="form.rePassword" @keydown.enter="onSubmit" />
                </el-form-item>
                <el-form-item prop="isAgree">
                    <el-checkbox label="" v-model="form.isAgree" />
                    <span>已阅读并同意注册协议、隐私政策、销售条款</span>
                </el-form-item>
            </el-form>
            <div class="buttonContainer">
                <button class="registerBtn" @click="onSubmit">注 册</button>
            </div>
            <div class="registerBox">
                <router-link to="login">立即登录 ></router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, reactive, watch } from 'vue';
import router from "@/router"
const { proxy } = getCurrentInstance()
import { useUserStore } from "@/store"
const userStore = useUserStore()
const ruleFormRef = ref()
const countdown = ref(60);
const isDisabled = ref(false);
const intervalId = ref(null);
const form = ref({
    email: '',
    code: null,
    password: '',
    rePassword: '',
    isAgree: false,
})

const inputStyle = reactive({
    height: '58px',
    backgroundColor: '#f6f6f6',
    color: '#c4c4c4',
    borderRadius: '4px',
    textIndent: '18px',
})


const buttonText = computed(() => {
    return isDisabled.value ? `重新发送 ${countdown.value} 秒` : '获取验证码';
});

const validIsAgree = (rule, value, callback) => {
    if (value == false) callback(new Error('请勾选~~~'))
    else callback()
}

// 验证确认密码
const validateRePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('确认密码不能为空'))
    } else if (value != form.value.password) {
        callback(new Error("两次密码不一致！"))
    } else {
        callback()
    }
}

const formRule = reactive({
    email: [
        {

            required: true,
            message: '邮箱不能为空',
            trigger: 'blur',
        },
        {
            type: "email",
            message: "邮箱格式不正确",
            trigger: 'blur',
        }
    ],
    code: [
        {
            min: 6,
            max: 6,
            message: "验证码长度应该为6位",
            trigger: 'blur',
        },
        {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur',
        },
    ],
    password: [
        {
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
        },
        {
            max:20,
            min:6,
            message:'密码长度应该在6-20位',
            trigger:'blur'
        }
    ],
    rePassword: [
        {
            validator: validateRePassword,
            trigger: 'blur',
        }
    ],
    isAgree: [
        {
            validator: validIsAgree,
            message: "请勾选～～～",
            trigger: 'change'
        }
    ]
})



const onSubmit = () => {
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            register()
        } else {
            console.log("表单错误")
            console.log('form',form.value)
        }
    })
}

const register = () => {
    const formData = {
        email: form.value.email,
        password: form.value.password,
        code: form.value.code,
    }
    proxy.$api.register(formData).then(res=>{
        if(res.code == 0){
            passLogin()
        }
    })
}

const passLogin = () => {
    const formData = {
        email: form.value.email,
        password: form.value.password
    }
    proxy.$api.passLogin(formData).then(res => {
        if (res.code == 0) {
            userStore.setToken(res.data)
            handleUserInfo()
        }
    })
}
const handleUserInfo = () => {
    proxy.$api.getUserInfo().then(res => {
        userStore.setUserInfo(res.data)
        router.replace('/')
       
    })
}

const getCode = () => {
    proxy.$api.getRegisterCode({ email: form.value.email })
}

// 验证单个字段的方法
const validateEmail = (field) => {
    ruleFormRef.value.validateField(field, (valid) => {
        if (valid) {
            startCountdown()
        } else {
            console.log('邮箱验证不通过');
        }
    });
};



// 启动倒计时
const startCountdown = () => {
    if (isDisabled.value) return; // 防止重复点击
    getCode()
    isDisabled.value = true;
    countdown.value = 60; // 重置倒计时
    intervalId.value = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            clearInterval(intervalId.value);
            isDisabled.value = false;
        }
    }, 1000);
};

</script>

<style lang="scss" scoped>
.registerContainer {
    width: 370px;
    height: 500px;
    padding: 50px;
    background-color: $background-color-light;

    .title {
        font-size: 30px;
        color: $color-theme;
        font-weight: 700;
    }

    .formContainer {
        margin-top: 20px;

        .registerBtn {
            width: 370px;
            height: 56px;
            background-color: #d65343;
            font-size: 16px;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
        }

        .getCodeBtn {
            width: 115px;
            height: 58px;
            background: #fff1f1;
            color: #dd766a;
            border-radius: 4px;
            cursor: pointer;
            border: 1px solid #fadfdf;
            margin-left: 3px;

            &.disabledClass {
                color: #8e8f8d;
                background-color: #edeeec;
            }
        }

        .registerBox {
            text-align: end;
            margin: 15px 0;
            font-size: 13px;
            color: $color-theme;
        }
    }
}
</style>