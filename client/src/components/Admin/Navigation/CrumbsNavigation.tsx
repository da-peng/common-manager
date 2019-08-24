import * as React from 'react'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from '../../../bases/AbstractComponent'
import { RouterConfig, IRouteItem, IExRouteItem} from '../../../routes/RouterConfig'
import { RouteComponentProps } from 'react-router';
import { findAdminRouterConfig } from './NavigationUtils';
import { Breadcrumb } from 'antd';
import styles from './Navigation.less'

interface IProps extends IAbstractComponentProps, RouteComponentProps {

}

interface IState extends IAbstractComponentState {

}
const {Item} = Breadcrumb

export class CrumbsNavigation extends AbstractComponent<IProps, IState>{
    state: IState = {};

    displayName: string = 'CrumbsNavigation'

    routesConfig: Array<IRouteItem> = RouterConfig

    routers:Array<IExRouteItem> = findAdminRouterConfig(this.props)
    
    getBreadcrumb(): Array<IRouteItem> {
        const { history } = this.props
        const breadcrumb: Array<IRouteItem> = []
        this.routers.forEach(item => {
            let reg = new RegExp(item.path)
            // item.path === match.path
            if (reg.test(history.location.pathname)) {
                breadcrumb.push(item) 
            }
        })
        // console.log(breadcrumb)
        return breadcrumb
    }
    
    getRenderContent() {
       
        // console.log(this.routers)

        return (
            <Breadcrumb  className={styles.CrumbsNavigation}>
                {this.getBreadcrumb().map(item => 
                <Item key={item.path}>{item.title}</Item>)}
            </Breadcrumb>
        )
    }

}