import * as React from 'react'
import { RouterConfig, IRouteItem} from './RouterConfig'
import {PrivateRoute}  from './PrivateRouteComponent'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

interface IProps  {
    redirect?: string
}
/**
 * 主路由
 */
class RoutesComponent extends React.Component<IProps> {


    routesConfig: Array<IRouteItem>  = RouterConfig
    /**
     * 获取路由组件
     */
    getRoute(item: IRouteItem) {
        return (
            <PrivateRoute 
                needAuthorized={item.needAuthorized}
                // 一定要有, 只要唯一就行
                key={item.path} 
                // 如果是二级路由,没有子路由了 就非精准匹配一级路由 ,精准匹配2级路由  true精准， flase
                exact={item.children && item.children.length ? false : true} 
                path={item.path}
                component={item.component}
            />
        )
    }

    render(){
        // const {redirect} = this.props
        return (
            
            // Switch 只命中1个,第一个命中 就不会显示后面的
            <BrowserRouter>
                <Switch> 
                    {this.routesConfig.map(v => this.getRoute(v))}
                    {/* {redirect ? <Redirect from="/" to={redirect} /> : null} */}
                    <Route component={()=>'404' as any} />
                </Switch>
            </BrowserRouter>
        )
    }


}

export default RoutesComponent