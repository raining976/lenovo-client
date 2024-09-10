import { get, post} from "@/utils/request";


export const getUserInfo = () => get('/user/info')
export const getAddress = (data) => get('/address/list',data)
export const createAddress = (data) => post('/address/create',data, true)
