import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/sysParaConfig/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/sysParaConfig/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/sysParaConfig/findPage',
        method: 'post',
        data
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/sysParaConfig/findPermissions',
        method: 'get',
        params
    })
}

// 数据字典查询
export const findKeyValue = (data) => {
  return axios({
    url: '/sysParaConfig/findListData',
    method: 'post',
    data
  })
}

// 数据字典查询
export const findKeyValueHotel = (data) => {
  return axios({
    url: '/sysParaConfig/findListDataHotel',
    method: 'post',
    data
  })
}

// 数据字典查询
export const findKeyValueHotelRoom = (data) => {
  return axios({
    url: '/sysParaConfig/findListDataHotelRoom',
    method: 'post',
    data
  })
}

