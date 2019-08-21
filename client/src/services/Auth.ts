import { IAuthInfo } from '../models/User'
import { request } from '../bases/HttpInterceptors'
import { IResponseBase, IReuqestBase } from '../bases/HttpModel'
import { store } from '../reducers/Store'
import { LOGIN,LOGOUT } from '../reducers/Auth/ActionsType'
import { getToken,   removeToken as removeTokenAndUid, getUid } from '../utils/EncryptLocalStorage'
import { IReducerAuthState } from '../reducers/Auth/AuthReducer'
// mock数据

// process.env.NODE_ENV === 'development' && require( '../mock/mock_dev')

/**
 * 登录接口参数
 */
export interface IAuthServiceLogin extends IReuqestBase {
    username: string   
    password: string
}


/**
 * 获取登录用户信息接口参数
 */

export interface IAuthLogin {
    uid: number;
    token: string
}

/**
 * 用户相关服务接口
 */
export class AuthService {
    /**
     * 登录
     */
    static login=(params: IAuthServiceLogin)=> {
        return request.post<IResponseBase<IAuthLogin>>('/login', params)
    }

    /**
     * 退出登录
     */
    static logout=()=> {
        return request.post<IResponseBase<IAuthLogin>>('/logout')
    }

     /**
     * 获取用户信息
     */
    static getAuthinfos=(params: IReuqestBase)=> {
        return request.get<IResponseBase<IAuthInfo>>('/userinfo',{
        params:{
            ...params
        }
        })
    }

    /**
     * 将local storage中的用户信息、存至Redux
     */
    static  dispatchAuthToStore=  ()=> {
        const token = getToken()
        const uid = getUid()
        const data: IReducerAuthState = {
            uid: uid,
            token: token
        }
        store.dispatch({
            type: LOGIN,
            data: data
        })
    }

    /**
     * 从store中读取用户uid,token
     */
    static getAuthFormStore=()=> {
        const {auth} = store.getState()

        return auth
    }

    /**
     * 删除store中的用户uid,token
     */
    static removeAuthFormStore=()=> {
        removeTokenAndUid()
        store.dispatch({
            type: LOGOUT
        })
    }

}