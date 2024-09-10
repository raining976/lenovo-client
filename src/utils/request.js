import axios from "axios"
import { errorNotice, successNotice } from "./notice"
import { useUserStore, useAdminStore, useSiteStore } from '@/store'
import router from "@/router"

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
})

// 不需要token的白名单
const noRequiresTokenWhiteList = []

request.interceptors.request.use((config) => {
    const userStore = useUserStore()
    const adminStore = useAdminStore()
    const siteStore = useSiteStore()
    // TODO: 判断当前请求是否在白名单中
    const isRequiresToken = true
    const token = siteStore.isAdmin ? adminStore.token : userStore.token
    if (isRequiresToken) {
        config.headers.Authorization = token
    }

    return config
})

request.interceptors.response.use((response) => {
    if (response.data.code == 1) {
        errorNotice(response.data.msg)
    }
    // if (response.data.code == 0) {
    //     successNotice(response.data.msg)
    // }
    return response.data
},
    (error) => {
        const siteStore = useSiteStore()
        console.error('error', error)
        let msg = ''
        const status = error.response?.status
        switch (status) {
            case 500:
                router.push('/404')
                break;
            case 401:
                msg = '未授权，请重新登录'
                errorNotice(msg)
                if(!siteStore.isAdmin){
                    router.replace('/login')
                }else {
                    router.replace('/adminLogin')
                }
                break
            default:
                msg = `未知错误(${status})!`
                errorNotice(msg)
                router.push('/404')
                break
        }
        // errorNotice(msg)
        return Promise.reject(error);
    })

function get(url, params, isNotice = false) {
    return request.get(url, { params }).then(res => {
        if (isNotice && res.code == 0) {
            successNotice(res.msg)
        } else if (isNotice && res.code == 1) {
            ErrorNotice(res.msg)
        }
        return res
    })
}
function post(url, data, isNotice = false) {
    return request.post(url, data).then(res => {
        // console.log('test', isNotice)
        if (isNotice && res.code == 0) {
            successNotice(res.msg)
        } else if (isNotice && res.code == 1) {
            ErrorNotice(res.msg)
        }
        return res
    })
}

export { get, post }


