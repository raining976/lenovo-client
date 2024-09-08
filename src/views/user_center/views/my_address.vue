<template>
    <div class="myAddressContainer">

        <div class="addressFormContainer">
            <AddressForm />
        </div>
        <el-divider />
        <div class="addressList">
            地址列表
        </div>
    </div>

</template>
<script setup>
import AddressForm from "../components/AddressForm.vue";
import { useUserStore } from "@/store"
const { proxy } = getCurrentInstance()
const userStore = useUserStore()

const addressForm = ref({})

onMounted(() => {
    updateAddress()
})

const updateAddress = () => {
    const form = {
        userId: userStore.userInfo.id
    }
    proxy.$api.getAddress(form).then(res => {
        console.log('res', res)
    })
}

const createAddress = () => {
    proxy.$api.createAddress(addressForm.value).then(res => {
        console.log('res', res)
    })
}


</script>

<style lang="scss" scoped>
</style>