import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/hotelArea/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/hotelArea/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/hotelArea/findPage',
        method: 'post',
        data
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/hotelArea/findPermissions',
        method: 'get',
        params
    })
}

// 数据字典查询
export const findKeyValue = (data) =>
{
  return axios({
    url: '/hotelArea/findListData',
    method: 'post',
    data
  })
}
  export const findAreaPage = (data) => {
    return axios({
      url: '/hotelArea/findAreaPage',
      method: 'post',
      data
    })
}

