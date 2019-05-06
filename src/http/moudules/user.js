import request from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/user/save',data);
}
// 删除
export const batchDelete = (data) => {
    return request.post('/user/delete',data);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/user/findPage',data);
}
// 查找用户的菜单权限标识集合
export const findPermissions = (data) => {
    return request.get('/user/findPermissions',data);
}

//根据用户名查找用户
export const findByName = (data) =>{
  return request.post('/user/findByName',data);
}

// 图片上传
export const upload = (data) => {
  return request.post('/document/upload',data);
}

export const showFile = (data) => {
  return request.post('/document/queryByRelId',data);
}
