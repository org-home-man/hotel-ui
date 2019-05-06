import request from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/hotelArea/save',data);
}
// 删除
export const batchDelete = (data) => {
    return request.post('/hotelArea/delete',data);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/hotelArea/findPage',data);
}
// 查找用户的菜单权限标识集合
export const findPermissions = (data) => {
    return request.get('/hotelArea/findPermissions',data);
}

// 数据字典查询
export const findKeyValue = (data) =>
{
  return request.post('/hotelArea/findListData',data);
}
  export const findAreaPage = (data) => {
    return request.post('/hotelArea/findAreaPage',data);
}

