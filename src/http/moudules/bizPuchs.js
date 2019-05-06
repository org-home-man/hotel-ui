import request from '../axios'

/*
 * 订单查询管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/bizPuchs/save',data);
}
// 删除
export const batchDelete = (data) => {
    return request.post('/bizPuchs/delete',data);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/bizPuchs/findPage',data);
}

