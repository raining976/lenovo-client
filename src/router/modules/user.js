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
        redirect: "/homepage",
        component: () => import("@/views/home/index.vue"),
        children: [
            {
                path: '/homepage',
                name: "homepage",
                meta: {
                    title: "首页",
                    requiresAuth: false
                },
                component: () => import("@/views/homepage/index.vue"),
            },
            {
                path: '/user_auth',
                redirect: "/login",
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


                ]
            },
            {
                path: '/404',
                name: '404page',
                meta: {
                    title: '404',
                    requiresAuth: false
                },
                component: () => import('@/views/404/index.vue'),
            },
           
            {
                path: '/product/:id',
                props: true,
                meta: {
                    title: "商品详情",
                    requireAuth: false,
                },
                component: () => import ("@/views/good_info/index.vue")
            },
            {
                path:'/search',
                props:true,
                meta:{
                    title:"搜索页",
                    requiresAuth: false,
                },
                component: () => import ("@/views/search/index.vue")
            },
            {
                path:'/order_submit',
                name:'order_submit',
                props:true,
                meta:{
                    title:"提交订单",
                    requiresAuth: false,
                },
                component: () => import('@/views/order_submit/index.vue')
            },
            {
                path:'/user_center',
                redirect:'/user_info',
                meta:{
                    title:'个人中心',
                    requiresAuth:true,
                },
                component: () => import ('@/views/user_center/index.vue'),
                children:[
                    {
                        path:'/user_info',
                        name:'user_info',
                        meta:{
                            title:"个人信息",
                            requiresAuth:true,
                        },
                        component:() => import ('@/views/user_center/views/user_info.vue')
                    },
                    {
                        path:'/change_pass',
                        name:'change_pass',
                        meta:{
                            title:"修改密码",
                            requiresAuth:true,
                        },
                        component:() => import ('@/views/user_center/views/change_pass.vue')
                    },
                    {
                        path: '/orders',
                        name: "orders",
                        meta: {
                            title: "订单列表",
                            requiresAuth: true
                        },
                        component: () => import("@/views/user_center/views/order_list.vue")
                    },
                    {
                        path:'/my_address',
                        name:'my_address',
                        meta:{
                            title:"我的地址",
                            requiresAuth:true,
                        },
                        component: () => import("@/views/user_center/views/my_address.vue")
                    }
                ]
            }


        ]

    },

]