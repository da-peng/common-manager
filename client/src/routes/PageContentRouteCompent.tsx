import * as React from 'react'
import { RouterConfig, IRouteItem, IExRouteItem } from './RouterConfig'
import { PrivateRoute } from './PrivateRouteComponent'
import { Route, Switch,  RouteComponentProps, Redirect } from 'react-router-dom'
import { findAdminRouterConfig } from '../components/Admin/Navigation/NavigationConfig';

interface IProps extends  RouteComponentProps{
    redirect?: string
}

/**
 * 子路由
 */
class PageContentRouteCompent extends React.Component<IProps> {

    routers:Array<IExRouteItem> = findAdminRouterConfig(this.props)
    
    routesConfig: Array<IRouteItem> = RouterConfig
    /**
     * 获取路由组件
     */
    getRoute(item: IRouteItem) {
        return (
            <PrivateRoute
                // needAuthorized={item.needAuthorized}
                // 一定要有, 只要唯一就行
                key={item.path}
                // 如果是二级路由,没有子路由了 就非精准匹配一级路由 ,精准匹配2级路由  true精准， flase
                exact={item.children && item.children.length ? false : true}
                path={item.path}
                component={item.component}
            />
        )
    }

    render() {
        
        return (
            // Switch 只命中1个,第一个命中 就不会显示后面的
            <Switch>
                {this.routers.map(v => this.getRoute(v))}
                {this.props.match.path==="/admin" && <Redirect from="/admin" to='/admin/dashboard' /> }
                {/* {redirect ?  */}
                <Route component={() => '404' as any} />
            </Switch>
        )
    }


}

export default PageContentRouteCompent