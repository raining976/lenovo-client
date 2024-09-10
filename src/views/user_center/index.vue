<template>
    <div class="h">
        <el-container class="userContainer">
            <el-aside width="200px">
                <AsideMenu />
            </el-aside>
            <el-main class="userInfoMain"><router-view></router-view></el-main>
        </el-container>
    </div>
</template>
<script setup>
import AsideMenu from './components/AsideMenu.vue';

</script>
<style lang="scss" scoped>
.userContainer {
    height: calc(100vh -  $navHeight);
    min-height: 500px;

    .userInfoMain {
        padding: 10px 30px;
    }
}
</style>