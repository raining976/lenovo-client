import { get } from "@/utils/request"

export const getHomeGoods = () => get('/home/')
export const getProductInfo = (data) => get('/product/',data)
export const searchGoods = (data) => get('/search/',data)