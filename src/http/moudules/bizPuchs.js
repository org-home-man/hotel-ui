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
export const batchDelete = (data) => {
    return request.post('/bizPuchs/delete',data);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/bizPuchs/findPage',data);
}

