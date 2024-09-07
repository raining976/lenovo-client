import { get , post} from '@/utils/request'

export const adminDelOrders = (data) => post('/admin/orders/delete', data)
export const adminDelSingleOrder = (data) => post('/admin/orders/delete', data, true)