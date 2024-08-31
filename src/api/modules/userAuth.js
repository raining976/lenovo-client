import { get, post} from "@/utils/request";

export const passLogin = (data) => post('/user/login',data)
export const codeLogin = (data) => post("/user/login/mail",data)
export const getUserInfo = () => get('/user/info')

export const getLoginCode = (data) => post('/user/login/mail/code',data)