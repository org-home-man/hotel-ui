import request from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return request.post('/sysParaConfig/save',data);
}
// 删除
export const batchDelete = (data) => {
    return request.post('/sysParaConfig/delete',data);
}
// 分页查询
export const findPage = (data) => {
    return request.post('/sysParaConfig/findPage',data);
}
// 查找用户的菜单权限标识集合
export const findPermissions = (data) => {
    return request.get('/sysParaConfig/findPermissions',data);
}

// 数据字典查询
export const findKeyValue = (data) => {
  return request.post('/sysParaConfig/findListData',data);
}

// 数据字典查询
export const findByCode = (data) => {
    return request.post('/sysParaConfig/findByCode',data);
}

// 数据字典查询
export const findKeyValueHotel = (data) => {
  return request.post('/sysParaConfig/findListDataHotel',data);
}

// 数据字典查询
export const findKeyValueHotelRoom = (data) => {
  return request.post('/sysParaConfig/findListDataHotelRoom',data);
}

