import request from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/bizHotl/save',data);
}
// 删除
export const batchDelete = (data,header) => {
    return request.post('/bizHotl/delete',data,header);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/bizHotl/findPage',data);
}
// 查找用户的菜单权限标识集合
export const findPermissions = (data) => {
    return request.get('/bizHotl/findPermissions',data);
}
// 所有数据
export const findAllData = (data) => {
  return request.post('/bizHotl/findAllData',data);
}
