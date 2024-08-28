export default [
    {
        path:'/orders',
        name:"orders",
        meta:{
            title:"订单列表",
            requiresAuth:true
        },
        component: () => import("@/views/order/order_list.vue")
    }
]