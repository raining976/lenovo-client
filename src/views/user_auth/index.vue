<template>
    <div class="authContainer">
        <div class="boxWrapper">
            <div class="authBox">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
</script>

<style lang="scss" scoped>
.authContainer {
    height: calc(100vh - 2 * $navHeight);
    background-color: #fff;
    background-image: url('@/assets/imgs/auth_bg.jpg');
    background-size: cover;
    background-position: center;

    .boxWrapper {
        position: relative;
        margin: 0 auto;
        padding-top: 65px;
        width: 1200px;
        height: calc(100% - 65px);
        .authBox {
            position: absolute;
            right: 65px;
            top: 65px;
        }
    }


}
</style>