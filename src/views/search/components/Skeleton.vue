<template>
    <el-skeleton style="width: 100%;  padding: 40px;" animated :loading="loading">
        <template #template>
            <ul class="list">
                <li v-for="i in 4" :key="i">
                    <el-skeleton-item variant="image" style="width: 290px; height: 170px; margin: 0 auto;" />
                    <div style="padding: 14px">
                        <el-skeleton-item variant="p" style="width: 50%" />
                        <el-skeleton-item variant="p" style="width: 100%" />
                        <el-skeleton-item variant="p" style="width: 80%" />
                    </div>
                </li>
            </ul>
        </template>
    </el-skeleton>
</template>
<script setup>

defineProps({
    loading: Boolean
})

</script>
<style lang="scss" scoped>
.list {
    li {
        width: 290px;
        height: 380px;
    }

    display: flex;
    justify-content: space-between;
}
</style>