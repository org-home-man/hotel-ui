import axios from 'axios';
import config from './config';
import Qs from 'qs';
import router from '@/router';
import i18n from '@/i18n';
import {getToken,clearToken} from '@/utils/token';
import {clearAgree} from '@/utils/agree';
import {Notification} from 'element-ui';

// 使用vuex做全局loading时使用
// import store from '@/store'

const TIMEOUT = 30000, instance = axios.create({
    baseURL : config.baseUrl,
    timeout: TIMEOUT,
    withCredentials: config.withCredentials
}), errors = {
    'Network Error': i18n.t('action.networkErr'),
    'Timeout': i18n.t('action.timeOut')
};
// instance.defaults.baseURL = config.baseUrl;
// instance.defaults.timeout = TIMEOUT;
instance.defaults.responseType = 'json';
instance.defaults.responseEncoding = 'utf8';
// instance.withCredentials = true;
instance.defaults.transformRequest = [function (data, header) {
    if (header.hasOwnProperty('Content-Type') && header["Content-Type"].indexOf('application/json') != -1) {
        data = JSON.stringify(data);// 这里必须使用内置JSON对象转换
    } else if(header.hasOwnProperty('Content-Type') && header["Content-Type"].indexOf('multipart/form-data') != -1){
        data = data;
    } else {
        data = Qs.stringify(data);// 这里必须使用qs库进行转换
    }
    return data
}];

//请求拦截器
instance.interceptors.request.use(function (config) {
    // 认证消息头
    // const token = sessionStorage.getItem('sessionId');
    const token = getToken();

    if (token) {
        config.headers.token = token
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

//响应拦截器
instance.interceptors.response.use(function (response) {
    const data = response.data;
    if(data.type && data.type === 'application/octet-stream'){
        let blob = data;
        let date = new Date();
        let filefix = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filefix +'.xlsx');
        } else {
            let link = document.createElement("a");
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);
            link.href = URL.createObjectURL(blob);
            link.download = filefix +'.xlsx';
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(link.href);
        }
        return '1';
    }
    if (data.success === true) {
        return data.data || data;
    } else if (data.code == 500) {
        Notification.error({
            title: i18n.t('action.sysErr'),
            message: i18n.t('action.requestErr')
        });
    } else if(data.code == 2001){
        Notification.error({
            title: i18n.t('action.sysErr'),
            message: i18n.t('action.loginExpired')
        });
        clearToken();
        clearAgree();
        router.push('/login')
    } else if (data.code == 10001){
        Notification.error({
            title: i18n.t('action.sysErr'),
            message: i18n.t('action.'+data.msg)
        });
    } else if (data.code == 10002){
        let num = JSON.parse(data.msg).num;
        let curNum = JSON.parse(data.msg).curNum;
        Notification.error({
            title: i18n.t('action.sysErr'),
            message: i18n.t('action.passwordErrors') + ':' + curNum + ',' + i18n.t('action.passwordErrorsNum') + num + i18n.t('action.lock')
        });
    }else {
        if (data.rows) {
            return data;
        } else if (Array.isArray(data)) {
            return data;
        } else if (data && Array.isArray(data.data)) {
            return data.data;
        }
        Notification.error({
            title: i18n.t('action.sysErr'),
            message: data.msg
        });

    }
    return Promise.reject({
        message: data.msg
    });
}, function (error) {
    if(error.response.status){
        if (+error.response.status === 403 || +error.response.status === 401) {
            // 无效的token
            Notification.error({
                title: i18n.t('action.sysErr'),
                message: i18n.t('action.noAuth')
            });
            // 重定向到登录页面
            clearToken();
            clearAgree();
            router.push('/login');
            return ;
        }
    }

    // 错误日志


    if (/^timeout/.test(error.message)) {
        error.message = i18n.t('action.timeOut');
    }
    Notification.error({
        title: i18n.t('action.sysErr'),
        message: errors[error.message] || error.message
    });


    return Promise.reject(error);
});

//instance.get(url[, config]);
//instance.post(url[, data[, config]]);

export default instance;
//
// export default function $axios(options) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: config.baseUrl,
//       headers: config.headers,
//       timeout: config.timeout,
//       withCredentials: config.withCredentials
//     })
//
//     // request 拦截器
//     instance.interceptors.request.use(
//       config => {
//         let token = Cookies.get('token')
//         // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
//         // console.log(store.state.loading)
//         // console.log('准备发送请求...')
//         // 2. 带上token
//         if (token) {
//           config.headers.token = token
//         } else {
//           // 重定向到登录页面
//           router.push('/login')
//         }
//         // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
//         if (config.method === 'post') {
//
//         }
//
//         return config
//       },
//
//       error => {
//         // 请求错误时
//         console.log('request:', error)
//         // 1. 判断请求超时
//         if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
//           console.log('timeout请求超时')
//           // return service.request(originalRequest);// 再重复请求一次
//         }
//         // 2. 需要重定向到错误页面
//         const errorInfo = error.response
//         console.log(errorInfo)
//         if (errorInfo) {
//           error = errorInfo.data  // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
//           const errorStatus = errorInfo.status; // 404 403 500 ...
//           router.push({
//             path: `/error/${errorStatus}`
//           })
//         }
//         return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
//       }
//     )
//
//     // response 拦截器
//     instance.interceptors.response.use(
//       response => {
//         let data;
//         // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
//         if (response.data == undefined) {
//           data = JSON.parse(response.request.responseText)
//         } else {
//           data = response.data
//         }
//
//         // 根据返回的code值来做不同的处理
//         switch (data.rc) {
//           case 1:
//             console.log(data.desc)
//             break;
//           case 0:
//             this.store.commit('changeState')
//             // console.log('登录成功')
//           default:
//         }
//         // 若不是正确的返回code，且已经登录，就抛出错误
//         // const err = new Error(data.desc)
//         // err.data = data
//         // err.response = response
//         // throw err
//
//         return data
//       },
//       err => {
//         if (err && err.response) {
//           switch (err.response.status) {
//             case 400:
//               err.message = '请求错误'
//               break
//             case 401:
//               err.message = '未授权，请登录'
//               break
//             case 403:
//               err.message = '拒绝访问'
//               break
//             case 404:
//               err.message = `请求地址出错: ${err.response.config.url}`
//               break
//             case 408:
//               err.message = '请求超时'
//               break
//             case 500:
//               err.message = '服务器内部错误'
//               break
//             case 501:
//               err.message = '服务未实现'
//               break
//             case 502:
//               err.message = '网关错误'
//               break
//             case 503:
//               err.message = '服务不可用'
//               break
//             case 504:
//               err.message = '网关超时'
//               break
//             case 505:
//               err.message = 'HTTP版本不受支持'
//               break
//             default:
//           }
//         }
//         console.error(err)
//         return Promise.reject(err) // 返回接口返回的错误信息
//       }
//     )
//
//     // 请求处理
//     instance(options).then(res => {
//       resolve(res)
//       return false
//     }).catch(error => {
//       reject(error)
//     })
//   })
// }
