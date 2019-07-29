/**
 * 管理首页地址,首页直接展示仪表盘
 */
export const ADMIN = '/admin'
/**
 * 登录页页地址
 */
export const LOGIN = '/login'
/**
 * Api baseURL
 */
export const BASEURL = 'https://127.0.0.1:8080'
/**
 * 接口返回状态码
 */
export const REQUEST_STATUSCODE =  {
    SUCCESS: {
        code: '20000',
        text: '请求成功'
    },
    UNAUTHORIZED: {
        code: '20401',
        text: '身份验证失败'
    }
}
/**
 * localStorage 数据加密密钥
 */
export const ENCRYPTO_SECRET_KEY = '3.1415926'