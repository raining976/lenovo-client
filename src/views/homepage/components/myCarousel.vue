<template>
  <div class="carouselContainer">
    <div class="sortContainer">
      <div class="sortBox">
        <homeSort></homeSort>
      </div>
    </div>
    <el-carousel :interval="5000" arrow="always" height="470px" width="100%">
      <el-carousel-item v-for="(bg, index) in bg_list" :key="index">
        <div class="bgBox">
          <img :src="bg" alt="" class="home_bg">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import homeSort from './homeSort.vue'
const bg_list = ref([])

onMounted(() => {
  const imgs = import.meta.glob('@/assets/imgs/home_bgs/*.jpg', { eager: true })
  bg_list.value = Object.values(imgs).map(module => module.default)
})

</script>

<style lang="scss" scoped>
.carouselContainer {
  position: relative;


  .sortContainer {
    position: relative;
    width: $h-width;
    margin: 0 auto;
    .sortBox {
      position: absolute;
      top: 33px;
      left: 0;
      width: 230px;
      height: 385px;
      background-color: transparent;
      z-index: 2;
    }
  }


  .el-carousel__item {
    overflow: hidden;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .bgBox {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .home_bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;

    }
  }

}
</style>