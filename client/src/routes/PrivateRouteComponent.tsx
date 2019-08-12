import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { getToken } from '../utils/EncryptLocalStorage'


interface IProps extends RouteProps {
    needAuthorized?: boolean
}

class PrivateRouteComponent extends React.Component<IProps> {

    /**
     * 判断是否需要登录
     */
    getRenderContent() {
        const { needAuthorized, path } = this.props
        const token = getToken()
        let authorized = true
        if (needAuthorized && (token === '' || token === null)) {
            authorized = false
        }
        if (path==='/'){
            return <Redirect from={path as string} to="/login" />
        }
        return authorized ? <Route {...this.props} /> : <Redirect from={path as string} to="/login" />
    }

    render() {
        return this.getRenderContent()
    }
}

/**
 * 路由组件，增加登录权限判断
 */
// export default   PrivateRouteClass

export const PrivateRoute = PrivateRouteComponent