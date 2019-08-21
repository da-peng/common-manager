import * as React from 'react'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from '../../../bases/AbstractComponent'
import { Menu, Icon } from 'antd';
import { IExRouteItem } from '../../../routes/RouterConfig'
import { RouteComponentProps } from 'react-router';
import { MenuProps } from 'antd/lib/menu'
import { Link } from 'react-router-dom';
import { findRouterByPath } from './NavigationConfig'
const { SubMenu, Item } = Menu;

interface IProps extends IAbstractComponentProps, RouteComponentProps<any> {

}

interface IState extends IAbstractComponentState {

}
// 这种写法有问题， 抽象类 泛型
// class MenuNavigation<P extends IAbstractComponentProps,S extends IAbstractComponentState>extends AbstractComponent<P,S>{
// state: S = {
// } as S


export class MenuNavigation extends AbstractComponent<IProps, IState>{
    state: IState = {};

    displayName: string = 'MenuNavigation'

    routes: Array<IExRouteItem> = []

    /**
     * 获取admin路由下所有相关菜单
     */
    getAdminRoutes(): Array<IExRouteItem> {
        // if (this.routes.length === 0) {
            //正则匹配,跟当前的路由有关的 http://www.jianshu.com/p/8d3cf411a639
            this.routes = findRouterByPath(this.props.match.path)
        // }
        return this.routes
    }


    /**
     * 获限sider menu属性
     */
    getMenuProps(): MenuProps {
        const { pathname } = this.props.location
        let defaultSelectedKeys: Array<string> = []
        let defaultOpenKeys: Array<string> = []
        this.getAdminRoutes().forEach(item => {
            if (item.path === pathname) {
                // 选中 可以1个
                defaultSelectedKeys.push(item.path || '')
                // 展开 可以多个
                defaultOpenKeys.push(item.parent || '')
            }
        })
        return {
            theme: 'dark',
            mode: 'inline',
            defaultSelectedKeys,  //[]
            defaultOpenKeys  //[]
        }
    }

    getMenusContext() {
        const { path } = this.props.match

        return this.getAdminRoutes().map((item) => {
            // 当前是父路由
            if (item.showMenu && item.parent === path) {
                // 拿取他的子菜单
                const subMenus = this.getAdminRoutes().filter(subMenu => subMenu.parent === item.path && item.showMenu)
                if (subMenus.length) {
                    return (
                        <SubMenu
                            key={item.path}
                            title={
                                <div>
                                    <Icon type={item.menuIcon} />
                                    <span>{item.title}</span>
                                </div>
                            }
                        >
                            {subMenus.map(subMenu => {
                                return (
                                    <Item key={subMenu.path}>
                                        <Link to={subMenu.path}> 
                                        <Icon type={subMenu.menuIcon} /> 
                                        {subMenu.title}
                                        </Link>
                                    </Item>
                                )
                            })}
                        </SubMenu>
                    )

                } else {
                    return (<Item key={item.path}>
                        <Link to={item.path}>
                            <Icon type={item.menuIcon} />
                            <span>{item.title}</span>
                        </Link>
                    </Item>
                    )
                }

            } else {
                return null
            }

        })

    }

    getRenderContent() {

        return (
            <Menu {...this.getMenuProps()}>
                {this.getMenusContext()}
            </Menu>
        )
    }

}