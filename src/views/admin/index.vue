<template>
    <div>
       admin 入口 
       <div>
           <li v-for="item in router_list" :key="item">
            <router-link :to="item.link">{{ item.title }}</router-link>
           </li> 
       </div>
       <router-view></router-view>
    </div>
</template>
<script setup>
const router_list = ref([
    {
        title:"用户列表",
        link:'/admin/user_list'
    },
    {
        title:"订单列表",
        link:'/admin/order_list'
    },
    {
        title:"商品列表",
        link:'/admin/good_list'
    },
])
</script>
<style scoped> </style>