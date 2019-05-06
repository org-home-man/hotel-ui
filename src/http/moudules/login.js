import request from '../axios'

/* 
 * 系统登录模块
 */

export const login = data => {
    return request.post('/login',data);
}

// // 登出
export const logout = () => {
    return request.get('/logout')
}
