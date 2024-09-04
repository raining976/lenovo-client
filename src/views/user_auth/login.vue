<template>
    <div class="loginContainer">
        <div class="title">联想会员登录</div>
        <div class="switchTabContainer">
            <div class="codeLogin tab" :class="{ activeTabClass: activeTab == 0 }" @click="changeTab(0)">
                <div class="tabTitle">快捷登录</div>
                <div class="bottomLine" :class="{ lineAnimationRight: activeTab == 0 }" </div>
                </div>
                <div class="passLogin tab" :class="{ activeTabClass: activeTab == 1 }" @click="changeTab(1)">
                    <div class="tabTitle">账号密码登录</div>
                    <div class="bottomLine" :class="{ lineAnimationLeft: activeTab == 1 }"></div>
                </div>
            </div>
            <div class="formContainer">
                <el-form ref="ruleFormRef" :model="form" label-width="auto" style="width: 360px" :rules="formRule">
                    <el-form-item required prop="email">
                        <el-input :style="inputStyle" placeholder="邮箱" v-model="form.email" @keydown.enter="onSubmit" />
                    </el-form-item>
                    <el-form-item v-show="activeTab == 0" required prop="code">
                        <el-input :style="inputStyle" style="width: 240px" placeholder="验证码" v-model="form.code"
                            @keydown.enter="onSubmit" />
                        <button class="getCodeBtn" :class="{ disabledClass: isDisabled }"
                            @click.prevent="validateEmail('email')" :disabled="isDisabled">{{ buttonText }}</button>
                    </el-form-item>
                    <el-form-item v-show="activeTab == 1" required prop="password">
                        <el-input :style="inputStyle" type="password" :show-password="true" placeholder="密码"
                            v-model="form.password" @keydown.enter="onSubmit" />
                    </el-form-item>
                    <el-form-item prop="isAgree">
                        <el-checkbox label="" v-model="form.isAgree" />
                        <span>已阅读并同意注册协议、隐私政策、销售条款</span>
                    </el-form-item>
                </el-form>
                <div class="buttonContainer">
                    <button class="loginBtn" @click="onSubmit">登 录</button>
                </div>
                <div class="registerBox">
                    <router-link to="register">注册账号 ></router-link>
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
const activeTab = ref(0)
const ruleFormRef = ref()
const countdown = ref(60);
const isDisabled = ref(false);
const intervalId = ref(null);
const form = ref({
    email: '',
    code: null,
    password: '1',
    isAgree: false,
})

const inputStyle = reactive({
    height: '58px',
    background: '#f6f6f6',
    color: '#c4c4c4',
    borderRadius: '4px',
    textIndent: '18px',
})
watch(activeTab, (val) => {
    if (val == 0) form.value.password = '123456'
    else form.value.code = "123456"
})

const buttonText = computed(() => {
    return isDisabled.value ? `重新发送 ${countdown.value} 秒` : '获取验证码';
});

const validIsAgree = (rule, value, callback) => {
    if (value == false) callback(new Error('请勾选~~~'))
    else callback()
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
    ],
    isAgree: [
        {
            validator: validIsAgree,
            message: "请勾选～～～",
            trigger: 'change'
        }
    ]
})


const changeTab = (idx) => {
    if (idx != activeTab.value) {
        clearErrors()
        activeTab.value = idx;
        form.value.email = ''
        form.value.password = ''
        form.value.code = ''
    }
}

const onSubmit = () => {
    ruleFormRef.value.validate((valid) => {
        if (valid) {
            if (activeTab.value == 0) {
                codeLogin()
            } else {
                passLogin()
            }
        } else {
            console.log("表单错误")
            console.table('form.value', form.value)
        }
    })
}
const codeLogin = () => {
    const formData = {
        email: form.value.email,
        code: form.value.code
    }
    proxy.$api.codeLogin(formData).then(res => {
        if (res.code == 0) {
            userStore.setToken(res.data)
            handleUserInfo()
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
    proxy.$api.getLoginCode({ email: form.value.email })
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

// 清除所有错误信息和重置字段
const clearErrors = () => {
    ruleFormRef.value.resetFields();
};
</script>

<style lang="scss" scoped>
.loginContainer {
    width: 370px;
    height: 440px;
    padding: 50px;
    background-color: $background-color-light;

    .title {
        font-size: 30px;
        color: $color-theme;
        font-weight: 700;
        margin-bottom: 50px;
    }

    .switchTabContainer {
        display: flex;
        width: 360px;

        .tab {
            position: relative;
            color: #787878;
            font-weight: 500;
            font-size: 16px;
            cursor: pointer;

            .bottomLine {
                position: absolute;
                left: 50%;
                margin-left: -20px;
                top: 25px;
                width: 40px;
                height: 3px;
                visibility: hidden;
                margin-bottom: -20px;
                background-color: #e1140a;

                &.lineAnimationRight {
                    animation: moveRight .2s linear;
                    visibility: visible;
                }

                &.lineAnimationLeft {
                    animation: moveLeft .2s linear;
                    visibility: visible;
                }
            }


            &.activeTabClass {
                color: $color-theme;


            }
        }

        .passLogin {
            margin-left: 40px;
        }
    }



    .formContainer {
        padding: 30px 0;

        .loginBtn {
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

@keyframes moveLeft {
    0% {
        left: 0;
    }

    100% {
        left: 50%;
    }
}

@keyframes moveRight {

    0% {
        left: 100%;
    }

    100% {
        left: 50%;
    }
}
</style>