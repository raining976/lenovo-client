import { get, post} from "@/utils/request";

export const login = (data) => post('/user/login',data)
export const getUserInfo = () => get('/user/info')