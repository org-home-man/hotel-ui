import request from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/bizRoom/save',data);
}

// 牌价保存
export const savePrice = (data) => {
  return request.post('/bizPrise/save',data);
}
// 库存保存
export const saveStock = (data) => {
  return request.post('/bizInv/save',data);
}
// 删除
export const batchDelete = (data) => {
    return request.post('/bizRoom/delete',data);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/bizRoom/page',data);
}
// 查找用户的菜单权限标识集合
export const findPermissions = (data) => {
    return request.get('/bizRoom/findPermissions',data);
}
// 上传文件
export const uploadFile = (data) => {
  return request.post('/bizRoom/uploadFile',data);
}

//生成日期数据，并且根据用户生成数据是否有设置相应数据需要替换，（牌价）。
export const producePriceCalendar = (data) => {
  return request.post('/bizRoom/producePriceCalendar',data);
}

//用户输入生成数据组，组装数据组，为了客户可以重复输入
export const priceDatePro = (data) => {
  return request.post('/bizRoom/priceDatePro',data);
}

//生成日期数据，并且根据用户生成数据是否有设置相应数据需要替换，（库存）。
export const produceStockCalendar = (data) => {
  return request.post('/bizRoom/produceStockCalendar',data);
}

//用户输入生成数据组，组装数据组，为了客户可以重复输入(库存)
export const stockDatePro = (data) => {
  return request.post('/bizRoom/stockDatePro',data);
}
