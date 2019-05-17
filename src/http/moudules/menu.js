import request from '../axios'

/* 
 * 菜单管理模块
 */

 // 保存
export const save = (data) => {
    return request.post('/menu/save',data);
}
// 删除
export const batchDelete = (data,header) => {
    return request.post('/menu/delete',data,header);
}
// 查找导航菜单树
export const findNavTree = (data) => {
    return request.post('/menu/findNavTree',data);
}
// 查找导航菜单树
export const findMenuTree = () => {
    return request.get('/menu/findMenuTree');
}
