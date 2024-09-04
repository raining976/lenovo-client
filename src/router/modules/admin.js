export default [
    {
        path: "/admin",
        component: () => import("@/views/admin/index.vue"),
        meta:{
            title:"首页",
            adminAuth:true,
        },
        children: [
            {
                path: "user_list",
                component: () => import("@/views/admin/user_list/index.vue"),
                meta: {
                    title: "用户列表",
                    adminAuth:true,
                },
                children:[
                    {
                        path: ":id",  // 新增的用户详情路由
                        component: () => import("@/views/admin/user_list/details/index.vue"),
                        meta: {
                            title: "用户详情",
                            adminAuth: true,
                        }
                    }
                ]
            },
            {
                path: "good_list",
                component: () => import("@/views/admin/good_list/index.vue"),
                meta: {
                    title: "商品列表",
                    adminAuth:true,
                },
                children:[
                    {
                        path: ":id",  // 新增的商品详情路由
                        component: () => import("@/views/admin/good_list/details/index.vue"),
                        meta: {
                            title: "商品详情",
                            adminAuth: true,
                        }
                    }
                ]
            },
            {
                path: "order_list",
                component: () => import("@/views/admin/order_list/index.vue"),
                meta: {
                    title: "订单列表",
                    adminAuth:true,
                },
                children:[
                    {
                        path: ":id",  // 新增的用户详情路由
                        component: () => import("@/views/admin/order_list/details/index.vue"),
                        meta: {
                            title: "订单详情",
                            adminAuth: true,
                        }
                    }
                ]
            },


        ]

    },
    {
        path: "/adminLogin",
        name: "adminLogin",
        component: () => import("@/views/admin/login/index.vue"),
        meta: {
            title: "管理员登录",
        }
    }
]