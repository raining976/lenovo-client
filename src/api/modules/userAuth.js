import { get, post} from "@/utils/request";

export const passLogin = (data) => post('/user/login',data)
export const codeLogin = (data) => post("/user/login/mail",data)
export const register = (data) => post('/user/register',data)

export const getLoginCode = (data) => post('/user/login/mail/code',data)
export const getRegisterCode = (data) => post('/user/register/mail/code', data)