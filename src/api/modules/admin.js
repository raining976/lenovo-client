import { get , post} from '@/utils/request'

export const adminLogin = (data) => post('/user/admin/login',data,true)


export const adminGetUserList = (data) => get('/admin/user/search',data)
export const adminAddNewUser = (data) => post('/admin/user/create',data)
export const adminDeleteUser = (data) => get('/admin/user/delete',data)
export const adminUpdateUser = (data) => post('/admin/user/update',data)

//商品
export const adminGetProductList = (data) => get('/admin/product/search',data)
export const adminAddNewProduct = (data) => post('/admin/product/create',data)
export const adminDeleteProduct = (data) => get('/admin/product/delete',data)
export const adminUpdateProduct = (data) => post('/admin/product/update',data)