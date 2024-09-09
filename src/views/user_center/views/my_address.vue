<template>
    <div class="myAddressContainer">
        <div class="addressFormContainer">
            <AddressForm @updateAddress="updateAddress" />
        </div>
        <el-divider />
        <div class="addressList">
            <el-descriptions class="addressItem"  :column="column" :title="`地址 ${index + 1}`" v-for="(address, index) in addressList" :key="index" v-show="address.name">
                <el-descriptions-item label="姓名">{{ address.name }}</el-descriptions-item>
                <el-descriptions-item label="电话">{{ address.phone }}</el-descriptions-item>
                <el-descriptions-item label="地址">
                    {{ address.dz }}
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>

</template>
<script setup>
import AddressForm from "../components/AddressForm.vue";
import { useUserStore } from "@/store"
const { proxy } = getCurrentInstance()
const userStore = useUserStore()


const addressList = ref([])
const column = ref(1)

onMounted(() => {
    updateAddress()
})

const updateAddress = () => {
    const form = {
        userId: userStore.userInfo.id
    }
    proxy.$api.getAddress(form).then(res => {
        console.log('res', res)
        addressList.value = res.data
    })
}




</script>

<style lang="scss" scoped>
.addressList{
    display: flex;
    flex-wrap: wrap;
    .addressItem{
        min-width: 350px;
    }
}

</style>