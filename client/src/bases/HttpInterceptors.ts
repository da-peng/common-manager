import axios, { AxiosInstance } from 'axios'
import { BASEURL, REQUEST_STATUSCODE } from '../utils/Constants'
import { store } from '../reducers/Store'
import {LOGOUT} from '../reducers/Auth/ActionsType'
import {removeToken} from '../utils/EncryptLocalStorage'

const axiosInstance = axios.create(
    {
        baseURL: BASEURL
    }
)
/**
 * 从redux中 获取AuthUserInfo
 */
const getAuthFormStore = () => {
    const { auth } = store.getState()
    return auth
}
/**
 * 移除localStorage 中的Token信息
 * 执行 reducer Logout action 操作
 */
const removeAuthFormStore = ()=>{
    removeToken()
    store.dispatch({
        type: LOGOUT
    })
}


interface IError {
    message: string
}

const errorHandle = (error: IError) => {
    return Promise.resolve(
        {
            status: 0,
            statusMessage: error.message,
            data: {
                responseContent: error.message,
            }
        }
    )
}

//https://www.kancloud.cn/yunye/axios/234845
// 添加请求拦截器
const CancelToken = axios.CancelToken
let cancelMaps: any = {}

const getComponentUUID = (instance:any)=>{
    let componentUUID: string = ''
    if (instance.method === 'get' && instance.params) {
        componentUUID = instance.params.componentUUID
    } else if (instance.method === 'post' && instance.data) {
        componentUUID = instance.data.componentUUID
    }
    return componentUUID
}

axiosInstance.interceptors.request.use(config => {
    const auth = getAuthFormStore()
    const componentUUID = getComponentUUID(config)
    if (componentUUID) {
        config.cancelToken = new CancelToken(cancel => {
            // 这里结构 {componentUUID: cancel请求的实例}
            cancelMaps[componentUUID] = cancel
        })
    }
    // 将token渐入到 hearder中
    config.headers.token = auth.token ? auth.token : undefined
    // url 配置
    config.url = config.url ? config.url : undefined

    return config
}, errorHandle)


// 添加响应拦截器
axios.interceptors.response.use( response=> {
    // 对响应数据做点什么
    const componentUUID = getComponentUUID(response.config)
    if (componentUUID) {
        delete cancelMaps[componentUUID]
    }
    // 如果状态码是：未登录，鉴权失败
    if (response.data.statusCode === REQUEST_STATUSCODE.UNAUTHORIZED.code) {

        // location.replace('/login')
        removeAuthFormStore()
        // notice({
        //     type: 'warning',
        //     message: '信息提示',
        //     description: response.data.statusMessage,
        //     onClose: () => {
        //         location.replace('/login')
        //     }
        // })
    }
    return response;
}, errorHandle);



interface IRequest extends AxiosInstance {
    cancel?: (key: string) => void
}

export const request: IRequest = axiosInstance

request.cancel = (key: string) => {
    if (cancelMaps[key]) {
        cancelMaps[key]('cancel')
        // console.log('cancel:', key)
        delete cancelMaps[key]
    }
}
