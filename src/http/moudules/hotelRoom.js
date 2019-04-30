import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
  return axios({
    url: '/bizPuchs/save',
    method: 'post',
    data
  })
}


// 删除
export const batchDelete = (data) => {
  return axios({
    url: '/hotelRoom/delete',
    method: 'post',
    data
  })
}
// 分页查询
export const findPage = (params) => {
  return axios({
    url: '/hotelRoom/page',
    method: 'post',
    params
  })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
  return axios({
    url: '/hotelRoom/findPermissions',
    method: 'get',
    params
  })
}

