import request from '../axios'

/* 
 * 字典管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/dict/save',data);
}
// 删除
export const batchDelete = (data) => {
    return request.post('/dict/delete',data);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/dict/findPage',data);
}
