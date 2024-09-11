import { get , post} from '@/utils/request'
export const adminDeletOrder=(data)=>get('/admin/orders/delete',data)
export const adminAddOrder=(data)=>post('/admin/orders/create',data)
export const adminModifyOrder=(data)=>post('/admin/orders/update',data)
export const adminSearchOrder=(data)=>get('/admin/orders/search',data)