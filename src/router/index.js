// router/index.js 
import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress'; // progress bar

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const files = import.meta.glob('./modules/*.js', {
    eager: true,
}) // eager 同步加载 此时就非懒加载


// 暂存路由
const routerModuleList = []

// 遍历路由模块
Object.keys(files).forEach(key => {
    const module = files[key].default || {}
    const moduleList = Array.isArray(module) ? [...module] : [module]
    routerModuleList.push(...moduleList) // 这里也要解构
})

// 动态路由
const asyncRouterList = [...routerModuleList]

// 存放静态路由(如果有的话)
const staticRouterList = [{
    path: '/:pathMatch(.*)',
    redirect: '/404',
}]

// 合并路由
const routes = [...asyncRouterList, ...staticRouterList]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return {
            el: '#app',
            top: 0,
            behavior: 'smooth'
        }
    }
})

// 路由前置守卫 主要用来进行鉴权
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.meta.requiresAuth == true) {
        // TODO: 这里判断token是否过期
        const isLoggedIn = true
        if (!isLoggedIn) {
            // TODO: 保留当前的路由 
            return next('/login')
        }
    }

    console.log('to.path', to.path)
    if (to.meta.adminAuth) {
        // TODO: 判断管理员是否登录
        const isAdminLoggedIn = true
        if (!isAdminLoggedIn) {
            // TODO: 保留当前的路由
            return next("/adminLogin")
        }

    }


    next()
})

// 路由后置守卫 
router.afterEach((to, from) => {
    NProgress.done();
    window.document.title = to.meta.title + " | " + import.meta.env.VITE_SITE_TITLE;

})

export default router