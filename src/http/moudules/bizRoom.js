import request from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/bizRoom/save',data);
}

// 牌价保存
export const savePrice = (data,headers) => {
  return request.post('/bizPrise/save',data,headers);
}
// 库存保存
export const saveStock = (data,headers) => {
  return request.post('/bizInv/save',data,headers);
}
// 删除
export const batchDelete = (data,headers) => {
    return request.post('/bizRoom/delete',data,headers);
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
export const uploadFile = (data,headers) => {
  return request.post('/document/upload',data,headers);
}

// 上传文件
export const queryByRelId = (data) => {
  return request.post('/document/queryByRelId',data);
}

//生成日期数据，并且根据用户生成数据是否有设置相应数据需要替换，（牌价）。
export const producePriceCalendar = (data,headers) => {
  return request.post('/bizRoom/producePriceCalendar',data,headers);
}

//用户输入生成数据组，组装数据组，为了客户可以重复输入
export const priceDatePro = (data,headers) => {
  return request.post('/bizRoom/priceDatePro',data,headers);
}

//生成日期数据，并且根据用户生成数据是否有设置相应数据需要替换，（库存）。
export const produceStockCalendar = (data,headers) => {
  return request.post('/bizRoom/produceStockCalendar',data,headers);
}

//用户输入生成数据组，组装数据组，为了客户可以重复输入(库存)
export const stockDatePro = (data,headers) => {
  return request.post('/bizRoom/stockDatePro',data,headers);
}

// 用户删除以前的图片
export const deletePictureFile = (data) => {
    return request.post('/document/deleteRealFiles',data);
}
