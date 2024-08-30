<template>
    <div class="navContainer">
        <div class="nav-left list">
            <li class="leftItem" v-for="(tab, index) in leftTabList" :key="index">
                <router-link :to="tab.link"> {{ tab.label }}</router-link>
            </li>
        </div>
        <div class="searchContainer">
            <el-input v-model="searchForm" style="width: 240px" placeholder="Please Input" :suffix-icon="Search" />
        </div>
        <div class="nav-right ">
            <div class="loginBox">
                <router-link to="/login">登录</router-link>
                ｜
                <router-link to="/register">注册</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
const leftTabList = ref([
    {
        label: "新品",
        link: "",
    },
    {
        label: "定制",
        link: "",
    },
    {
        label: "教育特惠",
        link: "",
    },
    {
        label: "疯狂星期肆",
        link: "",
    },
    {
        label: "游戏",
        link: "",
    },
])
const searchForm = ref("")
</script>
<style lang="scss" scoped>
$navHeight: 60px;

.navContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: calc($navHeight - 4px);
    flex: 1;

    .nav-left {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 30px;

        li {
            margin: 0 10px;
            height: calc($navHeight - 4px);
            line-height: $navHeight ;
            border-bottom: 4px transparent solid;
            transition: .2s;

            a {
                font-size: 16px;
            }

            &:hover {
                border-bottom: 4px #e6282b solid;

            }
        }
    }

    .nav-right {
        display: flex;
        align-items: center;

        height: $navHeight;
    }
}
</style>