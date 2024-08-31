<template>
    <div>
        <myCarousel/>
        <div class="h">
            <iconList/>
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
.h{
    width: $h-width;
    margin: 0 auto;
}
</style>