import request from '../axios'

/* 
 * 离线消息通知
 */

// 查询所有
export const findAll = () => {
    return request.post('/message/findAll');
};

// 查询所有
export const update = (data) => {
    return request.post('/message/update',data);
};

// 查询所有
export const findNoReadCount = () => {
    return request.post('/message/findCount');
};
