<template>
    <div class="goodListContainer">
        <li class="subListBox" v-for="(subList, i) in goodList" :key="i">
            <div class="title">{{ subList.name }}</div>
            <div class="contentBox">
                <div class="imgBox">
                    <el-carousel :interval="5000" width="230px" height="612px" arrow="never">
                        <el-carousel-item v-for="link in subList.imgUrl" >
                            <img :src="link" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="goodListBox">
        <li class="good" v-for="(item, j) in subList.products" :key="j">
            <router-link :to="`/product/${item.productId}`">
                <div class="goodImgBox">
                    <img :src="item.picUrl"
                        alt="">
                </div>
                <div class="goodDescBox">
                    <div class="goodName">
                        {{ item.name }}
                    </div>
                    <div class="goodConfig">
                        {{ item.brief }}
                    </div>
                    <div class="goodPrice">
                        ¥{{ item.price}}
                    </div>
                </div>
            </router-link>
        </li>
    </div>
    </div>
    </li>
    </div>
</template>
<script setup>
const { proxy } = getCurrentInstance()
onMounted(() => {
    getGoodList()
})
const goodList = ref([])
const getGoodList = () => {
    proxy.$api.getHomeGoods().then(res => {
        if(res.code == 0){
            goodList.value = res.data
        }
    })
}



</script>
<style lang="scss" scoped>
.subListBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    padding: 20px 0;
    height: 660px;
    width: 1200px;

    .title {
        font-size: 26px;
        font-weight: bold;
        color: #1f1f1f;
    }

    .contentBox {
        display: flex;
        justify-content: space-between;
        height: 612px;
        width: 100%;

        .imgBox {
            width: 230px;

        }

        .goodListBox {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 958px;
            .good {
                width: 230px;
                height: 300px;
                background-color: rgb(255, 255, 255);
                transition: box-shadow 0.3s;
                margin-bottom:10px;
                cursor: pointer;

                .goodImgBox {
                    height: 170px;
                    text-align: center;
                    line-height: 170px;

                    img {
                        width: 160px;
                        height: 160px;
                    }
                }

                &:hover {
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

                }

                .goodDescBox {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .goodName {
                        height: 36px;
                        line-height: 18px;
                        font-size: 15px;
                        color: #242424;
                        letter-spacing: -0.1px;
                        text-align: center;
                        font-weight: 550;
                        margin-top: 10px;
                    }

                    .goodConfig {
                        padding: 0 40px;
                        overflow: hidden;
                        font-size: 12px;
                        color: #858585;
                        letter-spacing: -0.07px;
                        text-align: center;
                        height: 14px;
                        line-height: 14px;
                        margin-bottom: 10px;
                    }

                    .goodPrice {
                        color: #e2231a;
                        font-size: 16px;
                        font-weight: 600;
                        text-align: center;
                    }
                }
            }
        }
    }
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>