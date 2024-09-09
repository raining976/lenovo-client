<template>
    <div class="orderSubmitWrapper">
        <div class="h">
            <div class="orderSubmitContainer">
                <div class="addressContainer">
                    <div class="title">收货地址</div>
                    <ul class="addressList" v-show="addressList.length != 0">
                        <li class="addressItem" :class="{ activeAddress: activeIndex == index }"
                            v-for="(address, index) in addressList" :key="index" @click="activeIndex = index">
                            <div class="name">{{ address.name }}</div>
                            <div class="phone">{{ address.phone }}</div>
                            <div class="dz">{{ address.dz }}</div>
                        </li>
                    </ul>
                    <el-empty class="addressEmpty" v-show="addressList.length == 0" description="请到个人中心添加地址">
                        <el-button><router-link to="/my_address">点我跳转</router-link></el-button>
                    </el-empty>
                </div>
                <div class="payContainer">
                    <div class="title">支付方式</div>
                    <el-tag type="success">在线支付</el-tag>
                </div>
                <div class="goodContainer">
                    <div class="title">商品详情</div>
                    <ul class="goodList">
                        <li class="good">
                            <div class="imgBox">
                                <img :src="curConfig.picUrl" alt="">
                            </div>
                            <div class="contentBox">
                                <div class="info">
                                    <div class="name">{{ curConfig?.name }}</div>
                                    <div class="brief">{{ curConfig?.brief }}</div>
                                </div>
                                <div class="price">¥{{ curConfig?.price / 100 }}</div>
                                <div class="count">X{{ route.query?.count }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="buyContainer">
                    <div class="sumPrice">
                        <span class="label">商品金额:</span>
                        <span class="value">¥{{ payment / 100 }}</span>
                    </div>
                    <div class="deliver">
                        <span class="label">运费:</span>
                        <span class="value">0</span>
                    </div>
                    <div class="realPayment">
                        <span class="label">实付款:</span>
                        <span class="value">¥{{ payment / 100 }}</span>
                    </div>
                </div>
                <div class="btnContainer">
                    <div class="curAddress">
                        <div class="nameAndPhone">
                            <span class="name">{{ addressList[activeIndex]?.name }}</span>
                            <span class="phone">{{ addressList[activeIndex]?.phone }}</span>
                        </div>
                        <div class="dz">
                            {{ addressList[activeIndex]?.dz }}
                        </div>
                    </div>
                    <button class="submitOrderBtn">提交订单</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import router from "@/router"
import { useRoute } from "vue-router"
import { useUserStore } from "@/store"
import handlerGoodConfig from "@/utils/handlerGoodConfig.js"

const { proxy } = getCurrentInstance()
const userStore = useUserStore()
const route = useRoute()
const curConfig = ref({})
const payment = ref(0)
onMounted(() => {
    console.log('route.query', route.query)
    payment.value = route.query.count * route.query.price
    updateAddress()
    getCurProductInfo()
})
const addressList = ref([])
const activeIndex = ref(0)
const updateAddress = () => {
    const form = {
        userId: userStore.userInfo.id
    }
    proxy.$api.getAddress(form).then(res => {
        console.log('res', res)
        addressList.value = res.data
    })
}

const getCurProductInfo = () => {
    proxy.$api.getProductInfo({ configCode: route.query.productCode }).then(res => {
        if (res.code == 0) {
            const { cur } = handlerGoodConfig(route.query.productCode, res.data)
            curConfig.value = cur
            console.log('curConfig.value', curConfig.value)
        }
    })
}


</script>
<style lang="scss" scoped>
.orderSubmitWrapper {
    width: 100%;
    min-height: calc(100vh - 2 * $navHeight);
    background-color: #fafafc;
    padding: 0 20px;

    .h {
        padding: 20px 0;
    }

    .orderSubmitContainer {

        padding: 30px;
        min-height: calc(100vh - 2 * $navHeight);
        background-color: #fff;
        box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.12);

        .addressContainer {
            height: 240px;

            .addressEmpty {
                width: 200px;
                height: 100px;
                transform: scale(0.6) translateY(40px);
                transform-origin: center;
            }

            .addressList {
                display: flex;

                .addressItem {
                    width: 200px;
                    height: 100px;
                    padding: 30px;
                    border: 1px solid #E2E2E2;
                    margin-right: 10px;
                    cursor: pointer;

                    &.activeAddress {
                        border-color: #E12726;
                    }

                    .name {
                        font-size: 16px;
                        height: 35px;
                    }

                    .phone,
                    .dz {
                        font-size: 14px;
                        color: #757575;
                        margin-bottom: 5px;
                    }
                }
            }

        }

        .payContainer {
            height: 100px;
        }

        .goodContainer {
            min-height: 220px;

            .goodList {
                .good {
                    display: flex;
                    align-items: center;
                    width: 1134px;
                    height: 160px;
                    border: #f7f7f7 1px solid;

                    .imgBox {
                        margin: 0 20px;
                        width: 150px;

                        img {
                            width: 100px;
                            height: 100px;
                        }
                    }

                    .contentBox {
                        display: flex;
                        width: 1000px;

                        .info {
                            width: 400px;

                            .name {
                                font-size: 14px;
                            }

                            .brief {
                                font-size: 12px;
                                color: #757575;
                            }
                        }

                        .price {
                            width: 100px;
                            font-size: 14px;
                            color: #ff0000;
                            margin: 0 40px;
                        }

                        .count {
                            width: 100px;
                            font-size: 14px;
                            color: #7f7f7f;
                        }
                    }
                }
            }
        }

        .buyContainer {
            display: flex;
            flex-direction: column;
            align-items: end;
            width: 100%;
            height: 200px;
            margin: 40px 0;
            padding-bottom: 28px;
            border-bottom: 1px solid #efefef;

            div {
                margin: 10px 0;
            }

            .label {
                font-size: 14px;
                color: #3c3c3c;
            }

            .value {
                display: inline-block;
                width: 180px;
                font-size: 14px;
                text-align: right;
                font-weight: 600;
            }

            .realPayment {
                margin-top: 30px;

                .value {
                    font-size: 24px;
                    color: #DF2625;
                }
            }

        }

        .btnContainer {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .curAddress {
                font-size: 14px;
                color: #757575;

                .name {
                    margin-right: 10px;
                }

                .dz {
                    margin-top: 10px;
                }

            }

            .submitOrderBtn {
                width: 156px;
                height: 40px;
                line-height: 40px;
                margin-top: 20px;
                text-align: center;
                color: #fff;
                background-color: #DF2625;
                cursor: pointer;
            }
        }

        .title {
            font-size: 18px;
            color: rgba(0, 0, 0, 0.80);
            text-align: left;
            line-height: 18px;
            margin-bottom: 21px;
            font-weight: 500;
        }
    }
}
</style>