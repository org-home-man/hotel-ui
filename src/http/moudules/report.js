import request from '../axios'

/* 
 * 字典管理模块
 */

// 分页查询
export const findPage = (data) => {
    return request.post('/wrSummary/page',data);
}

//周报 R0002查询
export const findR0002Report = (data) => {
    return request.post('/wrDetail/r0002Page',data);
}
//周报 R0002导出
export const exportR0002Report = (data,header) => {
    return request.post('/wrDetail/r0002ExportExcel',data,header);
}

//周报 R0003
export const findR0003Report = (data) => {
    return request.post('/wrDetail/r0003Page',data);
}

//周报 R0002导出
export const exportR0003Report = (data,header) => {
    return request.post('/wrDetail/r0003ExportExcel',data,header);
}

//分页查询
export const findMonthPage = (data) => {
    return request.post('/mrSummary/page',data);
}

//月报R0001
export const findR0001Report = (data) => {
    return request.post('/mrDetail/r0001Page',data);
}
//周报 R0001导出
export const exportR0001Report = (data,header) => {
    return request.post('/mrDetail/r0001ExportExcel',data,header);
}

//月报R0004
export const findR0004Report = (data) => {
    return request.post('/mrDetail/r0004Page',data);
}

//周报 R0004导出
export const exportR0004Report = (data,header) => {
    return request.post('/mrDetail/r0004ExportExcel',data,header);
}

//月报R0004
export const findR0005Report = (data) => {
    return request.post('/mrDetail/r0005Page',data);
}

//周报 R0004导出
export const exportR0005Report = (data,header) => {
    return request.post('/mrDetail/r0005ExportExcel',data,header);
}




