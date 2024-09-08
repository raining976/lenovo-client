<template>
    <el-cascader
      v-model="value"
      :options="options"
      :props="props"
      @change="handleChange"
      
    />
</template>

<script setup>
import pca from "@/assets/data/pca.js";

const options = ref([])

const value = ([])

const props = {
    expandTrigger:'hover',
    value:"name",
    label:"name"
}


onMounted(() => {
    options.value = pca
    console.log('pca', pca)
})


const handleChange = (value) => {
    console.log(value)
}

</script>