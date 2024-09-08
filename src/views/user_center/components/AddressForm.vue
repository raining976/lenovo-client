<template>
    <el-form :model="form" label-width="auto" style="max-width: 350px">
        <el-form-item label="收货人">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="收货地址">
            <el-cascader  v-model="selected" :options="options" :props="props" @change="handleChange" />
        </el-form-item>
        <el-form-item label="详细地址">
            <el-input v-model="form.detail" resize="none" type="textarea" placeholder="" />
        </el-form-item>
        <el-form-item class="btnBox">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import AddressSelector from "./AddressSelector.vue"
import { reactive } from 'vue'
import pca from "@/assets/data/pca.js";

const options = ref([])

const selected = ([])

const props = {
    expandTrigger: 'hover',
    value: "name",
    label: "name"
}

onMounted(() => {
    options.value = pca
})


const handleChange = (value) => {
    selected.value = value
}
// do not use same name with ref
const form = reactive({
    name: '',
    phone: ""
})


const onSubmit = () => {
    console.log('submit!')
}
</script>
<style scoped>
    ::v-deep .el-cascader{
        width: 100%;
    }
    .btnBox{
        margin: 0 70px;
    }
</style>