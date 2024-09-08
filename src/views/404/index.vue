<template>
    <div class="container">
        <h3>404，您访问的页面不存在!</h3>
    </div>
</template>

<script setup>
</script>
<style lang="scss" scoped>
.container {
    width: 100%;

    height: calc(100vh -  $navHeight);
    display: flex;
    align-items: center;
    /*定义body的元素垂直居中*/
    justify-content: center;
    /*定义body的里的元素水平居中*/
    background-color: #eee;
    font-size: 14px;
}

h3 {
    font-size: 60px;
    color: #cf3c32;
    text-align: center;
    padding-top: 30px;
    font-weight: normal;
}
</style>