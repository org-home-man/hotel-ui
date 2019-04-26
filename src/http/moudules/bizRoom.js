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
        url: '/bizRoom/page',
        method: 'post',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
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
    data
  })
}

//生成日期数据，并且根据用户生成数据是否有设置相应数据需要替换。
export const producePriceCalendar = (data) => {
  return axios({
    url: '/bizRoom/producePriceCalendar',
    method: 'post',
    data
  })
}

//用户输入生成数据组，组装数据组，为了客户可以重复输入
export const priceDatePro = (data) => {
  return axios({
    url: '/bizRoom/priceDatePro',
    method: 'post',
    data
  })
}
