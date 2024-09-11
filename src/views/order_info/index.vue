<template>
    <div class="orderInfoPageContainer">
        <div class="h">
            <div class="orderInfoContainer">
                <div class="orderStatusContainer">
                    <div class="orderIdBox">订单号：{{ order.id }}</div>
                    <div class="contentBox">
                        <div class="curStatusText">
                            <el-icon :size="30">
                                <component :is="statusList[order.status - 1]?.icon"></component>
                            </el-icon>
                            <span class="text">{{ statusList[order.status - 1]?.label }}</span>
                        </div>
                        <el-steps class="stepsContainer" :space="200" :active="order.status-1"
                            finish-status="success">
                            <el-step v-for="(item, i) in statusList" :key="i" :title="item.label"
                                :icon="item.icon"></el-step>
                        </el-steps>
                    </div>
                </div>
                <div class="addressAndOrderInfo">
                    <div class="addressContainer">
                        <div class="title">收货地址</div>
                        <div class="addressBox">
                            <div class="name text">
                                <span class="label">姓名：</span>
                                <span class="value">{{ order.name }}</span>
                            </div>
                            <div class="phone text">
                                <span class="label">电话：</span>
                                <span class="value">{{ order.phone }}</span>
                            </div>
                            <div class="dz text">
                                <span class="label">地址：</span>
                                <span class="value">{{ order.dz }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="orderInfoBox">
                        <div class="title">订单信息</div>
                        <div class="orderDetails">
                            <div class="orderId text">
                                <span class="label">订单编号：</span>
                                <span class="value">{{ order.id }}</span>
                            </div>
                            <div class="orderCreateTime text">
                                <span class="label">下单时间：</span>
                                <span class="value">{{ order.createdTime }}</span>
                            </div>
                            <div class="orderStatus text">
                                <span class="label">订单状态：</span>
                                <span class="value">{{ statusList[order.status - 1]?.label }}</span>
                            </div>
                            <div class="payWay text">
                                <span class="label">支付方式：</span>
                                <span class="value">在线支付</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="goodContainer">
                    <el-table :data="order.products" style="width: 100%">
                        <el-table-column label="商品信息" width="500">
                            <template #default="scope">
                                <div class="goodInfo">
                                    <div class="imgBox"><img :src="scope.row.picUrl" alt=""> </div>
                                    <div class="textBox">
                                        <div class="name">{{ scope.row.name }}</div>
                                        <div class="brief">{{ scope.row.brief }}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="productCode" label="商品编码" />
                        <el-table-column label="单价（元）">
                            <template #default="scope">
                                {{ (scope.row.price / 100).toFixed(2) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="数量">
                            <template #default="scope">
                                x{{ scope.row.count }}
                            </template>
                        </el-table-column>
                        <el-table-column label="总价（元）">
                            <template #default="scope">
                                {{ (scope.row.count * scope.row.price / 100).toFixed(2) }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUserStore } from "@/store"
const userStore = useUserStore()
const { proxy } = getCurrentInstance()

const props = defineProps({
    id: String
})

const order = ref({})
const statusList = ref([
    {
        icon: 'Timer',
        label: "待支付"
    },
    {
        icon: 'Wallet',
        label: '待发货',
    },
    {
        icon: 'ShoppingCartFull',
        label: '待收货'
    },
    {
        icon: 'CircleCheck',
        label: '已完成'
    }
])

onMounted(() => {
    getOrderInfo()
})

const getOrderInfo = () => {
    const form = {
        id: props.id,
        userId: userStore.userInfo.id
    }
    proxy.$api.getOrderInfo(form).then(res => {
        // console.log('res.data', res.data)
        if (res.code == 0) {
            order.value = res.data

        }
    })
}
</script>
<style scoped>
::v-deep .el-table__header tr:nth-child(1),
::v-deep .el-table__header tr:nth-child(1) th {
    background-color: #EEEEEE;

}

::v-deep .el-table__header tr:nth-child(1) .cell {
    font-size: 14px;
    font-weight: 500;
    color: rgb(37, 37, 37);
    text-align: center;
}

::v-deep .cell {
    text-align: center;
}

.contentBox ::v-deep .is-success {
    color: #E1140A !important;
}
.contentBox ::v-deep .el-step__line-inner{
    border-color: #E1140A !important;
}
</style>
<style lang="scss" scoped>
.orderInfoPageContainer {
    width: 100%;
    background-color: #fafafc;

    .h {
        padding: 20px 0;
    }

    .orderInfoContainer {


        >div {
            margin: 20px 0;
        }

        .orderStatusContainer {
            position: relative;
            width: auto;
            height: 160px;
            background-color: #fff;
            margin: 0;
            border-top: 4px solid #E1140A;
            padding: 50px;

            .orderIdBox {
                position: absolute;
                top: 15px;
                left: 30px;
                font-size: 12px;
                color: #606060;
            }

            .contentBox {

                .curStatusText {
                    display: flex;
                    align-items: center;
                    font-weight: 550;
                    font-size: 30px;
                    color: rgb(225, 20, 10);

                    .text {
                        margin-left: 10px;
                    }

                }

                .stepsContainer {
                    margin-top: 50px;
                }

            }
        }

        .addressAndOrderInfo {
            display: flex;
            background-color: #fff;
            padding: 20px;

            .orderInfoBox {
                flex: 1;
                padding: 20px;
            }

            .addressContainer {
                flex: 1;
                padding: 20px;
                border-right: 1px solid #F6F6F6;

            }

            .title {
                font-size: 15px;
                color: #252525;
                text-align: left;
                margin-bottom: 20px;
            }

            .text {
                font-size: 12px;
                color: #454545;
                margin: 15px 0;
            }
        }

        .goodContainer {
            min-height: 400px;

            .goodInfo {
                display: flex;
                align-items: center;

                img {
                    width: 80px;
                    height: 80px;
                }

                .textBox {
                    margin-left: 20px;

                    .name {
                        font-weight: 550;
                        font-size: 12px;
                        color: rgb(37, 37, 37);
                    }

                    .brief {
                        font-size: 12px;
                        color: rgb(151, 151, 151);
                    }
                }
            }
        }


    }
}
</style>