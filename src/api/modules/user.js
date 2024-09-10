import { get, post} from "@/utils/request";


export const getUserInfo = () => get('/user/info')
export const getAddress = (data) => get('/address/list',data)
export const createAddress = (data) => post('/address/create',data, true)
export const delAddress = (data) => get('/address/delete',data, true)
export const uploadAvatar = (data) => post('/user/avatar',data, true)