import { get , post} from '@/utils/request'

export const adminDelOrders = (data) => post('/admin/orders/delete', data)
export const adminDelSingleOrder = (data) => post('/admin/orders/delete', data, true)
export const adminLogin = (data) => post('/user/admin/login',data,true)


export const adminGetUserList = (data) => get('/admin/user/search',data)
export const adminAddNewUser = (data) => post('/admin/user/create',data)
export const adminDeleteUser = (data) => get('/admin/user/delete',data)