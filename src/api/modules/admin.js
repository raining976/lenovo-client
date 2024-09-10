import { get , post} from '@/utils/request'

export const adminLogin = (data) => post('/user/admin/login',data,true)


export const adminGetUserList = (data) => get('/admin/user/search',data)
export const adminAddNewUser = (data) => post('/admin/user/create',data)
export const adminDeleteUser = (data) => get('/admin/user/delete',data)
export const adminUpdateUser = (data) => post('/admin/user/update',data)