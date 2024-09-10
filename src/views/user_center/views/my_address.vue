<template>
    <div class="myAddressContainer">
        <div class="addressFormContainer">
            <AddressForm @updateAddress="updateAddress" />
        </div>
        <el-divider />
        <div class="addressList">
            <li class="addressItemLi" v-for="(address, index) in addressList" :key="index" v-show="address.name">
                <el-card style="width: 100%" shadow="always">
                    <el-descriptions class="addressItem" :column="column" :title="`地址 ${index + 1}`">
                        <el-descriptions-item label="姓名">{{ address.name }}</el-descriptions-item>
                        <el-descriptions-item label="电话">{{ address.phone }}</el-descriptions-item>
                        <el-descriptions-item label="地址">
                            {{ address.dz }}
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
                <el-popconfirm title="确定要删？？？" @confirm="confirmDel(address.id)">
                    <template #reference>
                        <el-button type="danger" :icon="Delete" circle />
                    </template>
                </el-popconfirm>
               
            </li>

        </div>
    </div>

</template>
<script setup>
import AddressForm from "../components/AddressForm.vue";
import { useUserStore } from "@/store"
import { Delete } from '@element-plus/icons-vue'
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


const confirmDel = (id)=>{
    console.log('id',id)
    proxy.$api.delAddress({Id:id}).then(res=>{
        if(res.code == 0){
            updateAddress()
        }
    })
}

</script>

<style lang="scss" scoped>
.addressList {
    display: flex;
    flex-wrap: wrap;

    .addressItemLi {
        position: relative;
        margin-right: 30px;
        margin-bottom: 30px;

        .el-button {
            position: absolute;
            top: 10px;
            right: 20px;
            transform: scale(0.8);
        }
    }

    .addressItem {
        width: 380px;
    }
}
</style>