import request from '../axios'

/* 
 * 角色管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/role/save',data);
}
// 修改
export const update = (data) => {
    return request.post('/role/update',data);
}
// 删除
export const batchDelete = (data,headers) => {
    return request.post('/role/delete',data,headers);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/role/findPage',data);
}
// 查询全部
export const findAll = () => {
    return request.get('/role/findAll');
}
// 查询角色菜单集合
export const findRoleMenus = (data) => {
    return request.post('/role/findRoleMenus',data);
}
// 保存角色菜单集合
export const saveRoleMenus = (data,headers) => {
    return request.post('/role/saveRoleMenus',data,headers);
}
