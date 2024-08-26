export default [
    {
        path:'/order_list',
        name:"order_list",
        meta:{
            title:"订单列表",
            requiresAuth:true
        },
        component: () => import("@/views/order/order_list.vue")
    }
]