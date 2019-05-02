import axios from '../axios'

/*
 * 订单查询管理模块
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
        url: '/bizPuchs/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (params) => {
    return axios({
        url: '/bizPuchs/findPage',
        method: 'post',
        params
    })
}

