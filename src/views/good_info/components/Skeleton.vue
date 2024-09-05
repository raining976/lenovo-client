<template>
    <el-skeleton  animated :loading="loading"  style="width: 1200px;height: 100vh;">
        <template #template>
            <div class="container">
                <div class="imgBox"><el-skeleton-item variant="image" style="width: 450px; height: 450px" /></div>
                <div class="content">
                    <el-skeleton-item variant="p" class="title" />
                    <el-skeleton-item variant="text" class="brief" />
                    <el-skeleton-item variant="text" class="price" />
                    <el-skeleton-item variant="text" class="config" />
                    <el-skeleton-item variant="text" class="config" />
                    <el-skeleton-item variant="text" class="config" />
                    <el-skeleton-item variant="text" class="config" />
                    <el-skeleton-item variant="text" class="config" />
                    <el-skeleton-item variant="text" class="config" />
                </div>
            </div>
        </template>
    </el-skeleton>
</template>
<script setup>
const props = defineProps({
    loading: Boolean
})
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: space-between;

    .imgBox {
        width: 500px;
        padding: 50px;
    }

    .content {
        width: 600px;
        display: flex;
        flex-direction: column;
        padding: 50px;

        .title {
            width: 400px;
            height: 30px;
            margin: 10px 0;
        }

        .brief {
            width: 300px;
            margin: 10px 0;
        }
        .price{
            width: 340px;
            height: 60px;
            margin:30px 0;
        }
        .config{
            width: 500px;
            height: 20px;
            margin:10px 0;
        }

    }
}
</style>