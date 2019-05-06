import request from '../axios'

/* 
 * 日志管理模块
 */

// 分页查询
export const findPage = (data) => {
    return request.post('/log/findPage',data);
}
