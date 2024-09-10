<template>
    <div class="homePageContainer">
        <myCarousel/>
        <iconList/>
        <div class="h">
            <goodList/>
        </div>
    </div>
</template>

<script setup>
import myCarousel from './components/myCarousel.vue'
import iconList  from "./components/iconList.vue";
import goodList from "./components/goodList.vue";
</script>
<style lang="scss" scoped>
.homePageContainer{
    background-color: #f5f5f5;
}
.h{
    width: $h-width;
    margin: 0 auto;
}

</style>