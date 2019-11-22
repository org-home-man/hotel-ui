import request from '../axios'

// 分页查询
export const findPage = (data) => {
    return request.post('/bizAgreement/findPage',data);
}
