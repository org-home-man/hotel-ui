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

