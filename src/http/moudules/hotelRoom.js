import request from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
  return request.post('/bizPuchs/save',data);
}

// 删除
export const batchDelete = (data) => {
  return request.post('/hotelRoom/delete',data);
}
// 分页查询
export const findPage = (data) => {
  return request.post('/hotelRoom/page',data);
}
// 查找用户的菜单权限标识集合
export const findPermissions = (data) => {
  return request.get('/hotelRoom/findPermissions',data);
}

