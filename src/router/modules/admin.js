export default [
    {
        path: "/admin",
        component: () => import("@/views/admin/index.vue"),
        meta:{
            title:"管理员",
            requiresAuth:false,
        },
        children:[
            {
                path:"/user_list",
                name:"user_list",
                component: () => import("@/views/admin/user_list/index.vue"),
                meta:{
                    title:"用户列表",
                    requiresAuth:false,
                }
            },
            {
                path:"/good_list",
                name:"good_list",
                component: ()=>import("@/views/admin/good_list/index.vue"),
                meta:{
                    title:"商品列表",
                    requiresAuth:false,
                }
            },
            {
                path:"/order_list",
                name:"order_list",
                component: ()=>import("@/views/admin/order_list/index.vue"),
                meta:{
                    title:"订单列表",
                    requiresAuth:false,
                }
            },
           

        ]

    },
    {
        path:"/adminLogin",
        name:"adminLogin",
        component: ()=>import("@/views/admin/login/index.vue"),
        meta:{
            title:"管理员登录",
            requiresAuth:false,
        }
    }
]