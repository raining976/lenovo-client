<template>
    <div class="menuContainer">
        <el-menu default-active="1" class="menu" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1">
                <router-link to="/user_info">个人信息</router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link to="/change_pass">修改密码</router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link to="/my_address">我的地址</router-link>
            </el-menu-item>
            <el-menu-item index="4">
                <router-link to="/orders">我的订单</router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script setup>
const handleOpen = () => { }

const handleClose = () => { }

</script>

<style lang="scss" scoped>
.menuContainer {

    height: 100%;

    .menu {
        height: 100%;
    }


}
</style>