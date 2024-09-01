<template>
    <div>
        <ul class="sortListContainer">
            <li class="sortItem" v-for="(item, index) in sortList" :key="index" @mouseover="activeIndex = index"
                @mouseout="activeIndex = -1">
                <div class="listTitle" :class="{ activeClass: activeIndex == index }">
                    <span> {{ item.title }}</span>
                    <span class="arrow"><el-icon>
                            <ArrowRightBold />
                        </el-icon></span>
                </div>
                <div class="subList" v-show="activeIndex == index">
            <li class="subListItem" v-for="subItem in item.list">
                <div class="subListTitleContainer">
                    <span class="subListTitle">{{ subItem.subtitle }}</span>
                    <span class="arrow"><el-icon>
                            <ArrowRight />
                        </el-icon></span>
                </div>
                <ul class="dSubListContainer">
                    <li class="dSubListItem" v-for="dSubItem in subItem.sublist">
                        {{ dSubItem }}
                    </li>
                </ul>
            </li>
    </div>
    </li>
    </ul>
    </div>
</template>
<script setup>
import { ArrowRightBold,ArrowRight } from "@element-plus/icons-vue"
const activeIndex = ref(-1)

const sortList = ref([
    {
        "title": "Lenovo电脑",
        "list": [
            {
                "subtitle": "电竞游戏本",
                "sublist": [
                    "拯救者 Y9000P AI元启",
                    "拯救者 Y9000X AI元启",
                    "拯救者 Y7000P",
                    "拯救者 Y7000",
                    "拯救者 R7000",
                    "拯救者 R7000P",
                    "拯救者 R9000X",
                    "拯救者 R9000P",
                    "IP选件",
                    "掌上游戏机"
                ]
            },
            {
                "subtitle": "轻薄办公本",
                "sublist": [
                    "小新Pro 16 AI元启",
                    "小新Pro 14 AI元启",
                    "小新Pro 14",
                    "小新 16",
                    "小新 15",
                    "小新 14",
                    "小新 Air"
                ]
            },
            {
                "subtitle": "极致轻薄本",
                "sublist": [
                    "YOGA Air 14s AI元启",
                    "YOGA Air 14c AI元启",
                    "YOGA Air 14 AI元启",
                    "YOGA Pro 16s AI元启",
                    "YOGA Book 9i AI元启",
                    "YOGA Pro 14s"
                ]
            },
            {
                "subtitle": "商务笔记本",
                "sublist": [
                    "ideaPad"
                ]
            },
            {
                "subtitle": "分体台式机",
                "sublist": [
                    "天逸510S  7.4L 机箱",
                    "天逸510 Pro  14L 机箱",
                    "Mini主机",
                    "来酷高性价比主机"
                ]
            },
            {
                "subtitle": "游戏台式机",
                "sublist": [
                    "刃9000",
                    "刃7000",
                    "GeekPro",
                    "刃7000K超能版"
                ]
            },
            {
                "subtitle": "一体台式机",
                "sublist": [
                    "小新24英寸一体机",
                    "小新27英寸一体机",
                    "YOGA Air32",
                    "YOGA 27",
                    "来酷高性价比一体机",
                    "特惠机型"
                ]
            },
            {
                "subtitle": "子系列",
                "sublist": [
                    "小新",
                    "拯救者",
                    "YOGA"
                ]
            },
            {
                "subtitle": "场景",
                "sublist": [
                    "高清游戏",
                    "家庭娱乐",
                    "潮范校园",
                    "便捷出行",
                    "快乐学习"
                ]
            },
            {
                "subtitle": "特色服务",
                "sublist": [
                    "私人定制",
                    "以旧换新",
                    "保值焕新"
                ]
            },
            {
                "subtitle": "二手优品",
                "sublist": [
                    "二手笔记本"
                ]
            }
        ]
    },
    {
        "title": "ThinkPad电脑",
        "list": [
            {
                "subtitle": "ThinkPad",
                "sublist": [
                    "X1系列（尊贵旗舰）",
                    "T14p系列(专业经典)",
                    "X13系列(商旅互联)",
                    "T14系列(专业便携)",
                    "P系列（创意设计）",
                    "S系列（新锐职场）",
                    "E系列（日常办公）"
                ]
            },
            {
                "subtitle": "ThinkCentre",
                "sublist": [
                    "neo系列（超强性能）"
                ]
            },
            {
                "subtitle": "thinkplus",
                "sublist": [
                    "口红电源",
                    "商务箱包",
                    "耳机",
                    "键盘鼠标",
                    "口袋全向麦",
                    "会议平板"
                ]
            },
            {
                "subtitle": "快速选机",
                "sublist": [
                    "全能轻薄本",
                    "高性能笔记本",
                    "超便携商务本",
                    "高性能台式机",
                    "经济商务台式机"
                ]
            },
            {
                "subtitle": "特色服务",
                "sublist": [
                    "以旧换新"
                ]
            }
        ]
    },
    {
        "title": "平板电脑",
        "list": [
            {
                "subtitle": "小新平板",
                "sublist": [
                    "小新Pad",
                    "小新Pad Pro",
                    "小新Pad plus",
                    "小新学习平板",
                    "小新Pad 2024 舒视智学版",
                    "小新Pad Studio"
                ]
            },
            {
                "subtitle": "拯救者平板",
                "sublist": [
                    "Y700",
                    "Y900"
                ]
            },
            {
                "subtitle": "平板配件",
                "sublist": [
                    "平板保护夹",
                    "平板保护膜",
                    "磁吸键盘及支架",
                    "触控笔"
                ]
            }
        ]
    },
    {
        "title": "手机/通信",
        "list": [
            {
                "subtitle": "motorola",
                "sublist": [
                    "联想 moto razr 50 Ultra",
                    "联想 moto razr 50",
                    "联想 moto S50 Neo",
                    "联想 moto X50 Ultra",
                    "联想 moto razr 40 Ultra",
                    "联想 moto X40",
                    "联想 moto razr 40",
                    "联想 moto g54",
                    "联想 moto g34"
                ]
            },
            {
                "subtitle": "moto配件",
                "sublist": [
                    "联想 moto buds 无线耳机",
                    "联想 moto buds+ 无线耳机",
                    "联想 moto手机保护壳",
                    "联想 moto手机充电器"
                ]
            },
            {
                "subtitle": "170/171",
                "sublist": [
                    "懂陪伴",
                    "糖豆儿",
                    "大白话"
                ]
            }
        ]
    },
    {
        "title": "智能产品",
        "list": [
            {
                "subtitle": "智能影音",
                "sublist": [
                    "小新100S",
                    "小新100P",
                    "小新365",
                    "YOGA5000S",
                    "YOGA7000",
                    "投影专选配件"
                ]
            },
            {
                "subtitle": "智能存储",
                "sublist": [
                    "个人云",
                    "家庭存储中枢"
                ]
            },
            {
                "subtitle": "智能安防",
                "sublist": [
                    "智能门锁",
                    "摄像头"
                ]
            },
            {
                "subtitle": "智能家居",
                "sublist": [
                    "智能插座",
                    "温湿度计",
                    "风扇",
                    "水健康"
                ]
            },
            {
                "subtitle": "出行与工具",
                "sublist": [
                    "车载吸尘器",
                    "车载充气泵",
                    "随身WiFi"
                ]
            },
            {
                "subtitle": "个护清洁",
                "sublist": [
                    "吹风机",
                    "剃须刀",
                    "电动牙刷",
                    "冲牙器",
                    "洗手机"
                ]
            },
            {
                "subtitle": "运动健康",
                "sublist": [
                    "按摩椅",
                    "按摩仪",
                    "跳绳",
                    "体脂秤"
                ]
            },
            {
                "subtitle": "智能学习",
                "sublist": [
                    "词典笔"
                ]
            }
        ]
    },
    {
        "title": "配件/办公",
        "list": [
            {
                "subtitle": "电脑周边",
                "sublist": [
                    "键盘",
                    "鼠标",
                    "鼠标防滑贴",
                    "笔记本贴膜",
                    "水杯",
                    "鼠标垫",
                    "支架",
                    "光驱",
                    "电源适配器",
                    "转接&扩展设备",
                    "电脑包",
                    "周边服饰",
                    "饰品配件"
                ]
            },
            {
                "subtitle": "存储设备",
                "sublist": [
                    "U盘",
                    "固态硬盘",
                    "移动硬盘"
                ]
            },
            {
                "subtitle": "显示生态",
                "sublist": [
                    "Lenovo显示器",
                    "ThinkVision显示器",
                    "Lecoo显示器"
                ]
            },
            {
                "subtitle": "娱乐生活",
                "sublist": [
                    "耳机耳麦",
                    "音箱",
                    "小新宠物随行水杯",
                    "小新宠物梳"
                ]
            },
            {
                "subtitle": "游戏设备",
                "sublist": [
                    "游戏鼠标",
                    "机械键盘",
                    "电竞耳机",
                    "电竞桌椅",
                    "掌上游戏机"
                ]
            },
            {
                "subtitle": "打印机",
                "sublist": [
                    "单功能打印机",
                    "多功能一体机",
                    "耗材"
                ]
            },
            {
                "subtitle": "会议设备",
                "sublist": [
                    "会议平板",
                    "会议平板配件"
                ]
            }
        ]
    },
    {
        "title": "增值服务",
        "list": [
            {
                "subtitle": "Care+",
                "sublist": [
                    "延长保修",
                    "上门服务"
                ]
            },
            {
                "subtitle": "系统服务",
                "sublist": [
                    "重装系统",
                    "新机开荒",
                    "专家上门",
                    "电脑加速",
                    "驱动安装",
                    "网课调优",
                    "Office365"
                ]
            },
            {
                "subtitle": "清洁保养",
                "sublist": [
                    "拆机清洁",
                    "外观清洁",
                    "清洁套装工具",
                    "到店换硅脂"
                ]
            },
            {
                "subtitle": "诊断维修",
                "sublist": [
                    "电脑故障检修服务",
                    "电脑硬件安装服务",
                    "电脑系统检测服务"
                ]
            },
            {
                "subtitle": "数据恢复",
                "sublist": [
                    "远程数据恢复",
                    "硬件开盘数据恢复"
                ]
            },
            {
                "subtitle": "保值焕新",
                "sublist": [
                    "回收服务",
                    "以旧换新"
                ]
            },
            {
                "subtitle": "硬件升级",
                "sublist": [
                    "内存",
                    "SSD固态硬盘"
                ]
            }
        ]
    }
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

            &.activeClass {
                background-color: #f6f3f2;

                .arrow {
                    color: #c6615d;
                }
            }


        }

        .subList {
            position: absolute;
            left: 230px;
            top: 0;
            width: 930px;
            min-height: 345px;
            padding: 20px;
            background-color: #f7f7f7;

            &.activeClass {
                display: block;
            }

            .subListItem {
                position: relative;

                .subListTitleContainer {
                    position: absolute;
                    left: 0;
                    width: 90px;
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    padding-right: 20px;
                    cursor: pointer;

                    &:hover {
                        color: #c6615d;

                        .subListTitle {
                            color: #c6615d;
                        }
                    }

                    .subListTitle {
                        font-size: 13px;
                        color: #494949;
                        font-weight: 600;
                        text-align: right;
                    }

                    .arrow {
                        width: 16px;
                        height: 16px;
                    }
                }


                .dSubListContainer {
                    margin-bottom: 30px;
                    margin-left: 110px;
                    padding: 0;
                    width: 870px;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;

                    .dSubListItem {
                        font-size: 12px;
                        line-height: 20px;
                        color: #494949;
                        border-left: 1px solid #e5e5e5;
                        padding: 0 12px;
                        font-weight: 600;
                        cursor: pointer;
                        &:hover {
                            color: #c6615d;
                        }
                    }
                }
            }

        }

    }
}
</style>