<template>
    <div class="searchContainer">
        <div class="sortContainer">
            <div class="h">
                <div class="sortBox">
                    <span class="title">分类</span>
                    <ul class="sortList">
                        <li class="sortItem" :class="{ active: item.categoryId == searchStore.searchForm.categoryId }"
                            v-for="(item, i ) in sortItems" :key="i">
                            <span @click="changeId(item.categoryId)">{{ item.name }}</span>
                        </li>
                    </ul>
                </div>
                <div class="otherSetting">
                    <div class="title">其他选项</div>
                    <ul class="settingList">
                        <div class="priceSortContainer">
                            <el-select v-model="searchStore.searchForm.sorter" clearable  placeholder="按照价格排序"  style="width: 150px; margin-right:20px;">
                                <el-option v-for="(item,i) in priceSorters" :key='i' :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </div>
                        <div class="priceRangeContainer">
                            <el-tag type="info" style="margin-right: 20px;">价格区间</el-tag>
                            <el-input-number :min="0" v-model="searchStore.searchForm.startPrice" size="small" /> -
                            <el-input-number :min="0" v-model="searchStore.searchForm.endPrice" size="small" />
                            <el-button @click="searchStore.search()">确定</el-button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <div class="h">
            <Skeleton :loading="searchStore.searchRes == null" />
            <div class="resBox">
                <div class="resContainer" v-show="!searchStore.isEmpty">
                    <ul class="resList">
                        <li class="good" v-for="(good, i) in searchStore.searchRes?.pageResult" :key="i">
                            <div class="imgBox" @click="toGoodInfo(good.productId)">
                                <img :src="good.picUrl" alt="">
                            </div>
                            <div class="textBox">
                                <div class="title">{{ good.name }}</div>
                                <div class="brief">{{ good.brief }}</div>
                                <div class="price">¥{{ (good.price / 100 ).toFixed(2)}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="pageContainer" v-show="!searchStore.isEmpty">
                    <el-pagination background layout="prev,pager,next" :page-size="16"
                        :current-page="searchStore.searchForm.currentPage" :total="searchStore.totalItems"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                </div>
                <div class="emptyBox" v-show="searchStore.isEmpty">
                    <el-empty :image-size="200" />
                </div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { getCurrentInstance, onMounted } from 'vue';

import router from "@/router"
import Skeleton from './components/Skeleton.vue';
import { useSearchStore } from "@/store"
const searchStore = useSearchStore()

const { proxy } = getCurrentInstance()
onMounted(() => {
    search()
})

const priceSorters = ref([
    {
        label:'不排序',
        value: 0,
    },
    {
        label:'升序',
        value: 1,
    },
    {
        label:'降序',
        value: 2,
    },
])

const sortItems = ref([
    {
        categoryId: null,
        name: '全部'
    },
    {
        categoryId: 3,
        name: 'Lenovo 电脑'
    },
    {
        categoryId: 4,
        name: 'Lenovo 台式机'
    },
    {
        categoryId: 5,
        name: "手机&配件",
    },
    {
        categoryId: 6,
        name: '平板电脑'
    },
    {
        categoryId: 7,
        name: '选件'
    },
    {
        categoryId: 8,
        name: '服务/配件'
    },
    {
        categoryId: 9,
        name: '智能'
    },
    {
        categoryId: 10,
        name: '显示器'
    },
    {
        categoryId: 11,
        name: 'IP周边'
    },
])



const search = () => {
    searchStore.search()
}

const toGoodInfo = (id) => {
    router.push(`/product/${id}`)
}

const handleSizeChange = (val) => {
    searchStore.searchForm.limit = val
    search()
}

const handleCurrentChange = (val) => {
    searchStore.searchForm.currentPage = val
    search()
}

const changeId = (id) => {
    searchStore.searchForm.categoryId = id;
    console.log('searchStore.searchForm', searchStore.searchForm)
    search()
}



</script>
<style lang="scss" scoped>
.searchContainer {
    background-color: #f5f5f5;
    width: 100%;
    min-height: calc(100vh - 2 * $navHeight);
    padding: 50px 0;

    .sortContainer {
        width: 100vw;
        background-color: #ffffff;
        height: 200px;
        padding: 10px 0;

        .sortBox {
            width: 100%;
            border-bottom: 1px solid #e5e5e5;
        }

        .title {
            float: left;
            width: 100px;
            height: 40px;
            line-height: 40px;
            margin: 0 20px;
            font-size: 13px;
            font-weight: bold;

        }

        .settingList {
            height: 50px;
            display: flex;
            align-items: center;

            .priceRangeContainer {
                .el-button {
                    margin-left: 20px;
                }
            }

        }

        .sortList {
            display: flex;
            flex-wrap: wrap;
            margin-left: 140px;
            width: 1000px;
            height: 110px;

            .sortItem {
                width: 150px;
                font-size: 13px;
                height: 40px;
                line-height: 40px;

                span {
                    cursor: pointer;
                }

                &.active span {
                    color: #e2231a;
                    font-weight: bold;
                }
            }
        }
    }

    .resList {
        display: flex;
        flex-wrap: wrap;
        margin: 40px 0;

        .good {
            width: 250px;
            height: 375px;
            background-color: #fff;
            margin-right: 10px;
            margin-bottom: 14px;
            vertical-align: top;
            padding: 10px 20px 0px;
            position: relative;
            overflow: hidden;
            cursor: pointer;

            .imgBox {
                width: 250px;
                height: 180px;
                text-align: center;
                line-height: 180px;
                border-bottom: 1px solid #e5e5e5;

                img {
                    width: 160px;
                    width: 160px;
                }
            }

            .textBox {
                text-align: left;
                margin: 0 10px;

                .title {
                    font-size: 12px;
                    color: #424242;
                    margin: 20px 0;
                }

                .brief {
                    font-size: 12px;
                    color: #cfcfcf;
                    margin-bottom: 30px;
                }

                .price {
                    color: #ef1e0b;
                    font-size: 14px;
                    text-align: left;
                    font-weight: bold;
                }
            }
        }
    }

    .pageContainer {
        display: flex;
        justify-content: center;
    }
}
</style>