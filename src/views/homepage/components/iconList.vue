<template>
    <div class="iconListContainer">
        <div class="iconList">
            <li class="item" v-for="(item, index) in textList" :key="index" @mouseover="activeIndex = index"
                @mouseout="activeIndex = -1">
                <a :href="item.link" target="_blank">
                    <div class="iconBox">
                        <img v-show="!(activeIndex == index)" :src="`/src/assets/icons/home_icons/icon${index+1}.png`" alt="">
                        <img v-show="activeIndex == index" :src="`/src/assets/icons/home_icons_hover/icon${index+1}_hover.png`" alt="">
                    </div>
                    <div class="textBox">{{ item.text }}</div>
                </a>
            </li>
        </div>
    </div>
</template>
<script setup>
const activeIndex = ref(-1)

const textList = ref([
    {
        text: '会员福利',
        link: "https://membership.lenovo.com.cn/pc/"
    },
    {
        text: "驱动下载",
        link: "https://newsupport.lenovo.com.cn/",
    },
    {
        text: "小新铺子",
        link: "https://activity.lenovo.com.cn/xiaofei/xiaoxin/hdy.html"
    },
    {
        text: "拯救者联盟",
        link: "https://shop.lenovo.com.cn/page/game/game.html"
    },
    {
        text: "Think家族",
        link: "https://thinkpad.lenovo.com.cn/index.html"
    },
    {
        text: "手机新品",
        link: "https://shop.lenovo.com.cn/mobile/index.html"
    },
    {
        text: "Lenovo台机",
        link: "https://activity.lenovo.com.cn/xiaofei/tsj/sd.index.html"
    },
    {
        text: "平板电脑",
        link: "https://activity.lenovo.com.cn/xiaofei/pingban/xxpb.index.html?"
    },
    {
        text: "选件",
        link: "https://activity.lenovo.com.cn/xuanjian/xjhdy.html"
    },
    {
        text: "智能",
        link: "https://activity.lenovo.com.cn/xuanjian/sd.html"
    },
    {
        text: "服务",
        link: "https://shop.lenovo.com.cn/service/index.html"
    },
    {
        text: "北京家电以旧换新",
        link: "https://activity.lenovo.com.cn/tsyx/xfq.html"
    },

])


</script>
<style lang="scss" scoped>
.iconList {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 95px;
        height: 95px;
        transition: 0.2s;

        &:hover {
            transform: translateY(-3px);

            .textBox {
                color: #e1140a;
            }
        }

        .iconBox {
            img {
                width: 30px;
                height: 30px;
            }
        }

        .textBox {
            font-size: 13px;
            color: #505050;
            height: 16px;
            line-height: 16px;
            text-align: center;
        }
    }


}
</style>