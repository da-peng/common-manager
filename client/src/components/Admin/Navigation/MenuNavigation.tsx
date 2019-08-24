import * as React from 'react'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from '../../../bases/AbstractComponent'
import { Menu, Icon } from 'antd';
import { IExRouteItem } from '../../../routes/RouterConfig'
import { RouteComponentProps } from 'react-router';
import { MenuProps } from 'antd/lib/menu'
import { Link } from 'react-router-dom';
import { findRouterByPath } from './NavigationUtils'
const { SubMenu, Item } = Menu;

interface IProps extends IAbstractComponentProps, RouteComponentProps<any> {

}

interface IState extends IAbstractComponentState {
    openKeys?:string[]
    selectedKeys?:string[]
}
// 这种写法有问题， 抽象类 泛型
// class MenuNavigation<P extends IAbstractComponentProps,S extends IAbstractComponentState>extends AbstractComponent<P,S>{
// state: S = {
// } as S


export class MenuNavigation extends AbstractComponent<IProps, IState>{
    state: IState = {
        openKeys:[]
    };

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


    componentDidMount(){
        const{path,url} = this.props.match
        // console.log(path,url)
        let { pathname }= this.props.location
        if (pathname==='/admin'){
            pathname='/admin/dashboard'
        }
        let selectedKeys: Array<string> = []
        let openKeys: Array<string> = []
        // console.log(pathname)
        this.getAdminRoutes().forEach(item => {
            // console.log(item)
            if (item.path === pathname) {
                // 选中 可以1个
                selectedKeys.push(item.path || '')
                // 展开 可以多个
                openKeys.push(item.parent || '')
            }
        })

        this.setState({
            selectedKeys:selectedKeys,
            openKeys:openKeys
        })
  
        window.onpopstate = ()=> {
            const {pathname } = this.props.location;
            this.onSelectedAndOpenKeys(pathname)
        }

    }

    onSelectedAndOpenKeys= (pathname:string)=>{
        let selectedKeys: Array<string> = []
        let openKeys: Array<string> = []
        this.getAdminRoutes().forEach(item => {
            if (item.path === pathname) {
                // 选中 可以1个
                selectedKeys.push(item.path || '')
                // 展开 可以多个
                openKeys.push(item.parent || '')
            }
        })

        this.setState({
            selectedKeys,
            openKeys
        })
    }

    onClick = (e:any) => {

        let selectedKeys: Array<string> = []
        let openKeys: Array<string> = []
        this.getAdminRoutes().forEach(item => {
            if (item.path === e.key) {
                // 选中 可以1个
                selectedKeys.push(item.path || '')
                // 展开 可以多个
                openKeys.push(item.parent || '')
            }
        })
        this.setState({
            selectedKeys,
            openKeys
        });
    }

    onOpenChange = (openKeys:any) => {
        const latestOpenKey = openKeys[1]

        let newOpenKeys: Array<string> = openKeys
        this.getAdminRoutes().forEach(item => {
            
            if (latestOpenKey===item.parent) {
                // 展开 可以多个
                newOpenKeys = latestOpenKey ? [latestOpenKey] : []
            }
        })

        this.setState({
            openKeys:newOpenKeys
        });
    }

    /**
     * 获限sider menu属性
     */
    getMenuProps(): MenuProps {

        const{selectedKeys,openKeys} =this.state
        return {
            
            theme: 'dark',
            mode: 'inline',
            onOpenChange:this.onOpenChange,
            onClick:this.onClick,
            selectedKeys:selectedKeys,
            openKeys:openKeys
          
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