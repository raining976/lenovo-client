<template>
    <div>
        <ul class="sortListContainer">
            <li class="sortItem" v-for="(item, index) in sortList" :key="index">
                <div class="listTitle">
                    <span> {{ item.title }}</span>
                    <span class="arrow">&gt;</span>
                </div>
                <div class="subList">
                    <li class="subListItem" v-for="subItem in item.list" >
                        <span class="subListItem">{{ subItem.subtitle }} &gt;</span>
                    </li>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
const sortList = ref([
    {
        title: "Lenovo电脑",
        list: [
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
        ]
    },
    {
        title: "Lenovo电脑",
        list: [
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
        ]
    },
    {
        title: "Lenovo电脑",
        list: [
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
        ]
    },
    {
        title: "Lenovo电脑",
        list: [
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
        ]
    },
    {
        title: "Lenovo电脑",
        list: [
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
        ]
    },
    {
        title: "Lenovo电脑",
        list: [
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
        ]
    },
    {
        title: "Lenovo电脑",
        list: [
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
            {
                subtitle: "电竞游戏本",
                subList: ['拯救者Y9000P AI元启', '拯救者Y9000X AI元启']
            },
        ]
    },
])

</script>
<style lang="scss" scoped>
.sortListContainer {
    position: relative;
    margin: 0;
    padding: 0;
    background-color: #ffffff99;
    backdrop-filter: blur(100px);

    .sortItem {
        
        .listTitle {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 25px;
            line-height: 25px;
            padding: 15px 15px 14px 30px;
            color: #494949;
            font-size: 16px;
            font-weight: 600;
            border-bottom: 1px solid #e6e6e6;
            cursor: pointer;

            .arrow {
                transform: scale(0.9);
            }
            &:hover{
                background-color: #f6f3f2;
                .arrow {
                    color: #c6615d;
                }
            }
            &:hover+.subList {
                display: block;
            }

        }

        .subList {
            position: absolute;
            left: 230px;
            top: 0;
            display: none;
            width: 930px;
            min-height: 345px;
            padding: 20px;
            background-color: #f7f7f7;
            .subListTitle{
                font-size: 13px;
                color: #494949;
            }
        }

    }
}
</style>