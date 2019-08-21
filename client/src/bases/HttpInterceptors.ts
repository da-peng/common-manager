import axios, { AxiosInstance } from 'axios'
import { BASEURL } from '../utils/Constants'
import { Message } from '../utils/Message'
import { store } from '../reducers/Store'
// import {LOGOUT} from '../reducers/Auth/ActionsType'
// import {removeToken} from '../utils/EncryptLocalStorage'
import { notice } from '../utils/Notification/Notification'
import { getUid } from '../utils/EncryptLocalStorage';

const axiosInstance = axios.create(
    {
        baseURL: BASEURL,
        timeout: 1000,
    }
)
/**
 * 从redux中 获取AuthUserInfo
 */
const getAuthFormStore = () => {
    const { auth } = store.getState()
    return auth
}

// /**
//  * 移除localStorage 中的Token信息
//  * 执行 reducer Logout action 操作
//  */
// const removeAuthFormStore = ()=>{
//     removeToken()
//     store.dispatch({
//         type: LOGOUT
//     })
// }


interface IError {
    message: string
}

// https://m.jb51.net/article/147916.htm
const errorHandle = (error: any) => {
    const { response } = error;

    if (response) {// 返回500
        return Promise.resolve(
            notice({
                noticeType: 'error',
                message: error.message,
                description: 'Oops!~Something is wrong',
                duration: 3,
            }
            )
        )
    } else {// 断网
        return Promise.reject(
            notice({
                noticeType: 'error',
                message: error.message,
                description: 'Oops!~ Something is wrong',
                duration: 3,
            }
            )
        )
    }

}

//https://www.kancloud.cn/yunye/axios/234845
// 添加请求拦截器
const CancelToken = axios.CancelToken
let cancelMaps: any = {}

const getComponentUUID = (instance: any) => {
    let componentUUID: string = ''
    if (instance.method === 'get' && instance.params) {
        componentUUID = instance.params.componentUUID
    } else if (instance.method === 'post' && instance.data) {
        componentUUID = instance.data.componentUUID
    }
    return componentUUID
}

const getResponseComponentUUID = (instance: any) => {
    let componentUUID: string = ''
    if (instance.method === 'post' && instance.data) {
        componentUUID = JSON.parse(instance.data).componentUUID
    } else if (instance.method === 'get' && instance.params) {
        componentUUID = instance.params.componentUUID
    }
    return componentUUID
}

axiosInstance.interceptors.request.use(requestConfig => {
    const auth = getAuthFormStore()
    let componentUUID = getComponentUUID(requestConfig)

    if (componentUUID) {
        requestConfig.cancelToken = new CancelToken(cancel => {
            // 这里结构 {componentUUID: cancel请求的实例}
            cancelMaps[componentUUID] = cancel
        })
    }
    // if (config.method === 'post'&& config.data){
    //     delete config.data['componentUUID']
    // }
    // 将token嵌入到 hearder中
    if (auth.token) {
        requestConfig.headers.token = auth.token
    }
    /**加入uid */
    let uid = localStorage.getItem('uid')
    if (uid) {
        if (requestConfig.method === 'get' && requestConfig.params) {
            requestConfig.params['uid'] = uid
        } else if (requestConfig.method === 'post' && requestConfig.data) {
            requestConfig.data['uid'] = uid
        }
    }
    // url 配置
    requestConfig.url = requestConfig.url ? requestConfig.url : undefined

    return requestConfig
}, errorHandle)


// 添加响应拦截器
axiosInstance.interceptors.response.use(response => {
    // 对响应数据做点什么
    let componentUUID = getResponseComponentUUID(response.config)

    if (componentUUID) {
        delete cancelMaps[componentUUID]
    }
    // 如果状态码是：未登录，鉴权失败
    if (response.data.status !== Message.get('requestOk').status) {
        // location.replace('/login')

        // removeAuthFormStore()

        notice({
            noticeType: 'warn',
            message: response.data.status,
            description: response.data.message,
            duration: 3,
        })
    }


    return response;
}, errorHandle);



interface IRequest extends AxiosInstance {
    cancel?: (key: string) => void
}

export const request: IRequest = axiosInstance

/**
 * 用一个map 维护 uuid： 对应的cancel实例； 组件卸载时，再待调用cancel实例 
 */
request.cancel = (key: string) => {
    if (cancelMaps[key]) {
        cancelMaps[key]('组件卸载,取消请求')
        // console.log('cancel:', key)
        delete cancelMaps[key]
    }
}


