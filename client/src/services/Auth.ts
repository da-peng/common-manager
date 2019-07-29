import { IAuthInfo } from '../models/User'
import { request } from '../bases/HttpInterceptors'
import { IResponseBase, IReuqestBase } from '../bases/HttpModel'
import { store } from '../reducers/Store'
import { LOGIN,LOGOUT } from '../reducers/Auth/ActionsType'
import { getToken,  getUserinfo, removeToken } from '../utils/EncryptLocalStorage'
import { IReducerAuthState } from '../reducers/Auth/AuthReducer'
// mock数据

process.env.NODE_ENV === 'development' && require( '../mock/mock_dev')

/**
 * 登录接口参数
 */
export interface IAuthServiceLogin extends IReuqestBase {
    username: string   
    password: string
}


/**
 * 获取用户信息接口参数
 */
export interface IAuthinfos extends IReuqestBase {
}


export interface IAuthLogin {
    token: string
}

/**
 * 用户相关服务接口
 */
export class authService {
    /**
     * 登录
     */
    static login=(params: IAuthServiceLogin)=> {
        return request.post<IResponseBase<IAuthLogin>>('/auth/login', params)
    }

    /**
     * 退出登录
     */
    static logout=()=> {
        return request.post<IResponseBase<IAuthLogin>>('/auth/logout')
    }

     /**
     * 获取用户信息
     */
    static getAuthinfos=(params: IAuthinfos)=> {
        return request.get<IResponseBase<IAuthInfo>>(`/users/authinfos`)
    }

    /**
     * 将local storage中的用户信息、租户code，存至store
     */
    static dispatchAuthToStore=()=> {
        const token = getToken()
        const userinfo = getUserinfo()
        const data: IReducerAuthState = {
            user: userinfo ? JSON.parse(userinfo) : undefined,
            token
        }
        store.dispatch({
            type: LOGIN,
            data
        })
    }

    /**
     * 从store中读取用户信息、租户code、token
     */
    static getAuthFormStore=()=> {
        const { auth } = store.getState()
        return auth
    }

    /**
     * 删除store中的用户信息、租户code、token
     */
    static removeAuthFormStore=()=> {
        removeToken()
        store.dispatch({
            type: LOGOUT
        })
    }

}