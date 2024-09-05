import axios from "axios"
import { errorNotice, successNotice } from "./notice"
import { useUserStore } from '@/store'
import router from "@/router"

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
})

// 不需要token的白名单
const noRequiresTokenWhiteList = []

request.interceptors.request.use((config) => {
    const userStore = useUserStore()
    // TODO: 判断当前请求是否在白名单中
    const isRequiresToken = true
    if (isRequiresToken) {
        config.headers.Authorization = userStore.token
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
        console.error('error', error)
        let msg = ''
        const status = error.response.status
        switch (status) {
            case 500:
                router.push('/404')
                break;
            case 401:
                msg = '未授权，请重新登录'
                break
            default:
                msg = `未知错误(${status})!`
                break
        }
        // TODO: 错误处理提示
        errorNotice(msg)
        return Promise.reject(error);
    })


function get(url, params) {
    return request.get(url, { params })
}
function post(url, data) {
    return request.post(url, data)
}

export { get, post }


