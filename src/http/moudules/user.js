import request from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data,header) => {
    return request.post('/user/save',data,header);
}
// 删除
export const batchDelete = (data,header) => {
    return request.post('/user/delete',data,header);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/user/findPage',data);
}
// 查找用户的菜单权限标识集合
export const findPermissions = (data) => {
    return request.post('/user/findPermissions',data);
}

//根据用户名查找用户
export const findByName = (data) =>{
    return request.post('/user/findByName',data);
}

//根据用户名模糊查找用户
export const findLikeByName = (data) =>{
    return request.post('/user/findLikeByName',data);
}

// 图片上传
export const upload = (data,header) => {
  return request.post('/document/upload',data,header);
}

// 图片上传
export const deleteRealFiles = (data) => {
    return request.post('/document/deleteRealFiles',data);
}

export const showFile = (data) => {
  return request.post('/document/queryByRelId',data);
}

export const updatePassword = (data) => {
    return request.post('/user/updatePassword',data);
}
