import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/bizRoom/save',
        method: 'post',
        data
    })
}

// 牌价保存
export const savePrice = (data) => {
  return axios({
    url: '/bizPrise/save',
    method: 'post',
    data
  })
}
// 库存保存
export const saveStock = (data) => {
  return axios({
    url: '/bizInv/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/bizRoom/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/bizRoom/findPage',
        method: 'post',
        data
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/bizRoom/findPermissions',
        method: 'get',
        params
    })
}
// 上传文件
export const uploadFile = (data) => {
  return axios({
    url: '/bizRoom/uploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;boundary=---12321 '
    },
    data
  })
}
