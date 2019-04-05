import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/bizHotl/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/bizHotl/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/bizHotl/findPage',
        method: 'post',
        data
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/bizHotl/findPermissions',
        method: 'get',
        params
    })
}
// 所有数据
export const findAllData = (data) => {
  return axios({
    url: '/bizHotl/findAllData',
    method: 'post',
    data
  })
}