<template>
    <div class="navContainer">
        <div class="nav-left list">
            <li class="leftItem" v-for="(tab, index) in leftTabList" :key="index">
                <a :href="tab.link" target="_blank" rel="noopener noreferrer">{{ tab.label }}</a>
            </li>
        </div>
        <div class="searchContainer">
            <el-input v-model="searchStore.searchForm.pattern" style="min-width: 260px" placeholder=""
                class="input-with-select" @keydown.enter="search()">
                <template #append>
                    <el-button :icon="Search" @click.prevent="search()" />
                </template>
            </el-input>
        </div>
        <div class="nav-right ">
            <div class="loginBox" v-show="!userStore.isLoggedIn">
                <router-link to="/login">登录</router-link>
                ｜
                <router-link to="/register">注册</router-link>
            </div>
            <div class="userInfoBox" v-show="userStore.isLoggedIn">
                <el-dropdown placement="bottom">
                    <span class="userNickname">
                        {{ userStore.userInfo.nickname }}
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu class="navMenu" aria-hidden="false">
                            <router-link to="/user_center"><el-dropdown-item>个人中心</el-dropdown-item></router-link>
                            <router-link to="orders"><el-dropdown-item>我的订单</el-dropdown-item></router-link>
                            <el-dropdown-item divided @click="userStore.logout()">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { useUserStore, useSearchStore } from '@/store';
import router from "@/router"
import { useRoute } from 'vue-router';
const route = useRoute()

const userStore = useUserStore()
const searchStore = useSearchStore()


const leftTabList = ref([
    {
        label: "新品",
        link: "https://shop.lenovo.com.cn/page/newarrival/xpzx.html",
    },
    {
        label: "定制",
        link: "https://activity.lenovo.com.cn/dingzhi.html",
    },
    {
        label: "教育特惠",
        link: "https://shop.lenovo.com.cn/page/xs/jyth.html",
    },
    {
        label: "疯狂星期肆",
        link: "https://shop.lenovo.com.cn/page/f/fkxqs.html",
    },
    {
        label: "游戏",
        link: "https://shop.lenovo.com.cn/page/game/game.html",
    },
])


const search = () => {
    if (route.path != '/search')
        router.push({
            path: '/search',
        })
    searchStore.search()
}
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
        min-width: 350px;
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

        .loginBox,
        .loginBox a {
            font-size: 12.5px;
            color: #b5b5b5;
            transition: 0.2s;

            &:hover {
                color: #252525;
            }
        }

        .userNickname {
            line-height: 35px;
            cursor: pointer;
        }

    }
}
</style>