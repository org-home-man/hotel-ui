/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

 // 后台管理系统服务器地址
// export const baseUrl = 'http://139.196.87.48:8001'
// export const baseUrl = 'http://hotel.chishengwei.cn:8080/hotel'
// export const baseUrl = 'http://localhost:8080/hotel'
export const baseUrl = 'http://47.75.55.221:8080/hotel'

    // 系统数据备份还原服务器地址
// export const backupBaseUrl = 'http://139.196.87.48:8002'
//export const backupBaseUrl = 'http://localhost:8002'
export const backupBaseUrl = 'http://47.75.55.221:8002'

//报表访问地址
//export const reportBaseUrl = 'http://localhost:8081'
export const reportBaseUrl = 'http://47.75.55.221:8080'
// export const reportBaseUrl = 'http://hotel.chishengwei.cn'


export default {
    baseUrl,
    backupBaseUrl,
    reportBaseUrl
}
