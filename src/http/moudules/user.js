import axios from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/user/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/user/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (params) => {
    return axios({
        url: '/user/findPage',
        method: 'post',
        params
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/user/findPermissions',
        method: 'get',
        params
    })
}

//根据用户名查找用户
export const findByName = (params) =>{
  return axios({
    url: '/user/findByName',
    method: 'get',
    params
  })
}

// 图片上传
export const upload = (data) => {
  return axios({
    url: '/document/upload',
    method: 'post',
    data
  })
}

export const showFile = (params) => {
  return axios({
    url: '/document/queryByRelId',
    method: 'post',
    params
  })
}
