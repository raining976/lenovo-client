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
<style scoped>
::v-deep .el-input__wrapper {
    padding: 0 1px;
    /* border: 1px solid #eee; */
    border-radius: 4px;

}

::v-deep .el-input__inner {
    background-color: #f6f6f6;
    line-height: 100%;
    height: calc(100% - 2px);
    text-indent: 18px;
    border-radius: 4px;

}
 ::v-deep .el-input__suffix-inner{
    background-color: #f6f6f6;
    width: calc(100% - 1px);
    height: calc(100% - 2px);
    margin-top: 1px;

}
::v-deep .el-input__icon.el-input__password{
    margin: 0 5px;
   
}
::v-deep .el-input__suffix-inner .el-icon{
    width: 30px;
    margin: 0 auto;
}
</style>
<style lang="scss" scoped>
.authContainer {
    height: calc(100vh -  $navHeight);
    background-color: #fff;
    background-image: url('@/assets/imgs/auth_bg.jpg');
    background-size: cover;
    background-position: center;

    .boxWrapper {
        position: relative;
        margin: 0 auto;
        width: 1200px;
        height: 100%;
        $wrapper-height: 100%;
        .authBox {
            position: absolute;
            right: 65px;
            top:calc(($wrapper-height - 600px) / 2);
        }
    }


}
</style>