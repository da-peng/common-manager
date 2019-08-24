import {RouterConfig, IExRouteItem } from "../../../routes/RouterConfig";
import _ from "lodash";
/**
 *  从 [{一级路由[ {二级路由}]}] 有二级路由 全部转为 全是一级路由 [{一级路由}] 的形式
 */

export function convertRouterList(){
    let routerList: Array<IExRouteItem> = _.cloneDeep(RouterConfig)
    let i = 0
    while (i < routerList.length) {
        const { children = [] } = routerList[i]
        if (children.length) {
            children.forEach(item => {
                routerList.push(
                    {
                        // root 根路径
                        root: routerList[i].root || routerList[i].path,
                        // parent 父节点路径
                        parent: routerList[i].path,
                        ...item,
                        path: routerList[i].path + '/' + item.path
                    }
                )
            })
            delete routerList[i].children
        }
        i++
    }
    // console.log(routerList)
    return routerList
}

/**
 * 获取admin路由下子菜单
 * 用于面包屑 ,自己实现的查找当前的path对应相关的节点
 * @param path 
 */
export function findAdminRouterConfig(props:any):Array<IExRouteItem> {
    let routes = findRouterByPath(props.match.path)
    return routes
}

/**
 * 用于查找所有的 根目录，父节点，目录是path的 RouterItem
 * @param path 
 */
export function findRouterByPath(path: string) {
    // console.log(path)// admin 渲染之后
    let pathOfRouter = convertRouterList().filter((item) => {
       return item.root === path || item.parent === path 
    })
    return pathOfRouter
}