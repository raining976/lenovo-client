<template>
    <el-form :model="form" label-width="auto" ref="addressFormRef" :rules="rules" style="max-width: 350px">
        <el-form-item label="收货人" prop="name">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
            <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="收货地址">
            <el-cascader placeholder="请选择" v-model="form.selected" :options="options" :props="props"
                @change="handleChange" />
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
            <el-input v-model="form.detail" resize="none" type="textarea" placeholder="" />
        </el-form-item>
        <el-form-item class="btnBox">
            <el-button type="primary" @click="onSubmit(addressFormRef)">提交</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import pca from "@/assets/data/pca.js";
import { useUserStore } from "@/store"
const userStore = useUserStore()
const { proxy } = getCurrentInstance()
const options = ref([])

const props = {
    expandTrigger: 'hover',
    value: "name",
    label: "name"
}
const addressFormRef = ref()

const emits = defineEmits(['updateAddress'])

onMounted(() => {
    options.value = pca
})

const form = ref({
    name: '',
    phone: "",
    detail: '',
    selected:[]
})


const rules = ref({
    name: [
        { required: true, message: '请输入收货人姓名', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: "请输入收货电话", trigger: 'blur' }
    ],

    detail: [
        { required: true, message: "请输入详细地址", trigger: 'blur' }
    ]
})



const handleChange = (value) => {
    form.value.selected
}

const createAddress = () => {
    let dz = form.value.selected.join('') + form.value.detail
    const formData = {
        userId: userStore.userInfo.id,
        name: form.value.name,
        phone: form.value.phone,
        dz:dz
    }
    proxy.$api.createAddress(formData).then(res => {
        if (res.code == 0) {
            // addressFormRef.resetField()
            updateAddress()
        }
    })
}

const updateAddress = () => {
    emits('updateAddress')
}


const onSubmit = async (formEl) => {
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
            createAddress()
        } else {
            console.log('error submit!', fields)
        }
    })

}
</script>
<style scoped>
::v-deep .el-cascader {
    width: 100%;
}

.btnBox {
    margin: 0 70px;
}
</style>