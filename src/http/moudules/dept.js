import request from '../axios'

/* 
 * 机构管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/dept/save',data);
}
// 删除
export const batchDelete = (data,headers) => {
    return request.post('/dept/delete',data,headers);
}
// 查询机构树
export const findDeptTree = () => {
    return request.get('/dept/findTree');
}
