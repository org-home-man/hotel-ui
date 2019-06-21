import request from '../axios'

/*
 * 订单查询管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/bizPuchs/save',data);
}
// 保存
export const update = (data) => {
    return request.post('/bizPuchs/update',data);
}

// 订单确认
export const confirm = (data) => {
    return request.post('/bizPuchs/confirm',data);
}
// 删除
export const batchCancel= (data) => {
    return request.post('/bizPuchs/orderCancel',data);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/bizPuchs/findPage',data);
}
// 库存查询
export const findInv = (data) => {
    return request.post('/bizInv/findInv',data);
}

//入退时间范围内唯一客房的查询
export const findByDate = (data) => {
    return request.post('/bizPrise/findByDate',data);
}

// 订单结算
export const accountsConfirm = (data) => {
    return request.post('/bizPuchs/accountsConfirm',data);
}

// 订单导出
export const exportExcel = (data,header) => {
    return request.post('/bizPuchs/exportExcel',data,header);
}
// 订单导出
export const exportManagerExcel = (data,header) => {
    return request.post('/bizPuchs/exportManagerExcel',data,header);
}

