// router/modules/base.js
/**
 * @Description: 路由项说明
 * @Author: raining
 *
 *  {
 *     path: "/components",          // 路由地址
 *     name: "components",           // 路由名称
 *     meta: {
 *         title: "组件示例",          // 路由标题
 *         icon: "Basketball",       // 路由图标
 *         requiresAuth: true,       // 是否需要登录
 *         isLink: false,            // 是否外链
 *         hidden: false,            // 是否隐藏
 *     },
 *     children: []                  // 子路由
 * }
 */
export default [
    {
        path: '/',
        redirect:"/homepage",
        component: () => import("@/views/home/index.vue"),
        children:[
            {
                path:'/homepage',
                name:"homepage",
                meta: {
                    title: "首页",
                    requiresAuth: false
                },
                component: () => import("@/views/homepage/index.vue"),
            },
            {
                path: '/user_auth',
                redirect:"/login",
                meta: {
                    requiresAuth: false
                },
                component: () => import("@/views/user_auth/index.vue"),
                children: [
                    {
                        path: '/login',
                        name: 'login',
                        meta: {
                            title: "登录",
                            requiresAuth: false
                        },
                        component: () => import("@/views/user_auth/login.vue"),
                    },
                    {
                        path: '/register',
                        name: 'register',
                        meta: {
                            title: "注册",
                            requiresAuth: false
                        },
                        component: () => import("@/views/user_auth/register.vue"),
                    },
                    {
                        path: '/404',
                        name: '404page',
                        meta: { 
                            title:'404',
                            requiresAuth: false
                        },
                        component: () => import('@/views/404/index.vue'),
                    },
                    {
                        path:'/orders',
                        name:"orders",
                        meta:{
                            title:"订单列表",
                            requiresAuth:true
                        },
                        component: () => import("@/views/order/order_list.vue")
                    },

                ]
            },
           

        ]

    },
   
]