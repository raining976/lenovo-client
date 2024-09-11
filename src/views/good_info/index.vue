<template>
    <div class="h-productInfo">
        <Skeleton :loading="!curConfig.picUrl" />
        <div class="productInfoContainer" v-show="curConfig.picUrl">
            <div class="imgContainer">
                <img v-show="!curConfig.picUrl" src="@/assets/imgs/productInfo.jpg" alt="">
                <img v-show="curConfig.picUrl" :src="curConfig.picUrl" alt="">
            </div>
            <div class="contentContainer">
                <div class="title">
                    {{ curConfig.name }}
                </div>
                <div class="brief">
                    {{ curConfig.brief }}
                </div>
                <div class="priceBox">
                    <span class="priceDesc">商城价</span>
                    <span class="priceSign">¥</span>
                    <span class="price" v-show="curConfig.price">{{ curConfig.price / 100 }}</span>
                </div>
                <div class="configBox">
                    <div class="config" v-for="(config, i) in allConfig">
                        <div class="configName">{{ config.name }}</div>
                        <div class="configChoicesBox">
                            <span class="choice" :class="{ active: c == Object.values(curConfig.value[i])[0] }"
                                v-for="c in config.choices" @click="onClickedChoice(i, c)"><i>{{ c }}</i></span>
                        </div>
                    </div>
                </div>
                <div class="countBox">
                    <div class="countDesc">购买数量</div>
                    <div class="numberSelector">
                        <el-input-number v-model="buyCount" :min="1" :max="10" size="small" />
                    </div>
                </div>
                <div class="buyContainer">
                    <div class="buyButton">
                        <button @click="buyNow">立即购买</button>
                    </div>
                </div>
                <div class="serviceContainer">
                    <span class="serviceTag" v-for="(tag, i) in serviceTags">
                        <el-icon>
                            <CircleCheck />
                        </el-icon>
                        <span class="tag">{{ tag }}</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Skeleton from "./components/Skeleton.vue"
import { CircleCheck } from "@element-plus/icons-vue"
import handlerGoodConfig from "@/utils/handlerGoodConfig.js"
import { useRouter } from 'vue-router'
const router = useRouter()
const { proxy } = getCurrentInstance();
const props = defineProps({
    id: String
})
const serviceTags = ref(["联想自营", "联想发货&售后", "14天无忧退换", "运费险"])
const allConfig = ref({})
const curConfigValues = ref([])
const curConfig = ref([])
const originalConfigs = ref([])
const buyCount = ref(1)
onMounted(() => {
    getCurProductInfo()
})

const getCurProductInfo = () => {
    proxy.$api.getProductInfo({ configCode: props.id }).then(res => {
        if (res.code == 0) {
            // console.log('res.data',res.data)
            originalConfigs.value = res.data
            const { cur, allConfigs, curValue } = handlerGoodConfig(props.id, res.data)
            curConfig.value = cur
            allConfig.value = allConfigs
            curConfigValues.value = curValue
        }
    })
}

const onClickedChoice = (i, c) => {
    curConfigValues.value[i] = c
    const targetIndex = originalConfigs.value.findIndex(item => {
        for (let j = 0; j < 4; j++) {
            if (curConfigValues.value[j] != Object.values(item.value[j])[0])
                return false
        }
        return true
    })
    if (targetIndex != -1) {
        const targetId = originalConfigs.value[targetIndex].productCode
        router.replace(`/product/${targetId}`).then(() => {
            window.location.reload()
        })
        console.log('targetId', targetId)
    }
    // const targetId = originalConfigs.value[targetIndex].productCode
}

const buyNow = () => {
    const orderInfo = {
        productCode: curConfig.value.productCode,
        count: buyCount.value,
        price: curConfig.value.price
    }
    router.push({
        path: '/order_submit',
        query: orderInfo
    })
}
</script>
<style lang="scss" scoped>
.h-productInfo {
    width: $h-width;
    margin: 0 auto;
    min-height: calc(100vh - 2 * $navHeight);
    background-color: #fff;

    .productInfoContainer {
        display: flex;
        justify-content: space-between;
        hight: 100%;

        .imgContainer {
            width: 520px;
            height: 100%;
            margin-right: 20px;
            margin-top: 40px;

            img {
                width: 520px;
                height: 520px;
            }
        }

        .contentContainer {
            width: 640px;
            height: calc(100% - 80px);
            padding-top: 40px;

            .title {
                font-size: 22px;
                font-weight: normal;
            }

            .brief {
                color: #A2A2A2;
                font-size: 14px;
                line-height: 22px;
                margin-top: 10px;
                margin-bottom: 20px;

            }

            .priceBox {
                display: flex;
                align-items: center;

                width: 100%;
                background-color: #f9f9f9;
                border: 1px solid #F0F0F0;

                .priceDesc {
                    display: inline-block;
                    font-size: 12px;
                    color: #434242;
                    letter-spacing: 0.8px;
                    margin-right: 35px;
                    margin-left: 20px;
                    height: 42px;
                    line-height: 42px;
                    width: 45px;
                }

                .priceSign {
                    font-size: 12px;
                    color: #E1140A;
                    font-weight: bold
                }

                .price {
                    font-weight: bold;
                    font-size: 27px;
                    color: #E1140A;
                }
            }

            .configBox {
                margin: 40px 0;

                .config {
                    width: 640px;
                    display: flex;

                    .configName {
                        color: #434242;
                        width: 58px;
                        font-size: 12px;
                        margin-top: 5px;
                    }

                    .configChoicesBox {
                        display: flex;
                        flex-wrap: wrap;
                        width: 537px;

                        .choice {
                            display: inline-block;
                            width: 214px;
                            padding: 0px 21px;
                            height: 23px;
                            border: 1px solid #DADADA;
                            text-align: center;
                            line-height: 23px;
                            margin-right: 10px;
                            cursor: pointer;
                            margin: 5px 10px 5px 0;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            &.active {
                                border-color: #e1140a;

                                i {
                                    color: #e1140a;
                                }
                            }

                            i {
                                color: #999999;
                                font-size: 12px;
                                font-style: normal;
                            }
                        }
                    }

                }
            }

            .countBox {
                display: flex;

                .countDesc {
                    color: #434242;
                    width: 58px;
                    font-size: 12px;
                }
            }

            .buyContainer {
                margin: 30px 58px;

                button {
                    width: 132px;
                    height: 38px;
                    font-size: 15px;
                    background-color: #e1140a;
                    color: #fff;
                    cursor: pointer;
                }
            }

            .serviceContainer {
                margin: 30px 58px;
                display: flex;

                .serviceTag {
                    display: flex;
                    align-items: center;
                    margin-right: 15px;
                    color: #bdbdbd;
                    font-size: 12px;

                    .tag {
                        margin-left: 3px;
                    }
                }
            }
        }
    }

}
</style>