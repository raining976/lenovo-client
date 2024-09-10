<template>
    <div class="h">
        <div class="successContainer">
            <el-result icon="success" title="支付成功！" :sub-title="`订单号为：LENOVO2753${id}`">
                <template #extra>
                    <router-link to="/"><el-button>回到主页</el-button></router-link>
                </template>
            </el-result>
        </div>
    </div>
</template>
<script setup>
const { proxy } = getCurrentInstance()
const props = defineProps({
    id: String,
})

onMounted(() => {
    updateUserInfo()
})

const updateUserInfo = () => {
    proxy.$api.getUserInfo().then(res => {
        userStore.setUserInfo(res.data)
    })
}


</script>
<style lang="scss" scoped>
.successContainer{
    padding: 50px 0;
}

</style>