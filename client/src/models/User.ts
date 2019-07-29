/**
 *  用户登录状态
 */
export interface IAuthInfo {
    user: UserInfo | undefined
    token: string | undefined
}

/**
 * 用户信息
 */
export interface UserInfo {
    firstName: string
    fullName: string
    sex: string
    icon: string
    id: number
    lastName: string
    mobile: string
    nickName: string
    username: string
}
