import { AsyncLogin, AsyncAdmin, AsyncAnchor, AsyncDashboard, AsyncAnchorDetail, AsyncCrewlerManage } from '../dynamicLoad/DynamicLoad'
/**
 * 用于对「对象的形状（Shape）」进行描述,路由配置中 需要哪些
 */
export interface IRouteItem {
    title: string
    path: string
    component?: any
    children?: Array<IRouteItem>
    showMenu?: boolean
    menuIcon?: string
    remark: string
    needAuthorized?: boolean
    breadcrumbName?: string
    // exec: boolean
}
/**
 *  路由配置形态 扩展 根节点，父节点
 */
export interface IExRouteItem extends IRouteItem {
    root?: string
    parent?: string
}
/**
 * 路由配置，最多支持3级路由
 */
export const RouterConfig: Array<IRouteItem> = [
    {
        title: '登录',
        path: '/login',
        component: AsyncLogin,
        remark: '一级路由'
    },
    {
        needAuthorized: true,// 还没做，所有直接跳转login
        title: '首页',
        path: '/',
        remark: '一级路由',
        // component: AsyncLogin
    },
    {
        title: '管理系统首页',
        path: '/admin',
        needAuthorized: true,
        remark: '一级路由',
        component: AsyncAdmin,
        children: [
            {
                title: '仪表盘',
                showMenu: true,
                menuIcon: 'dashboard',
                component: AsyncDashboard,
                path: 'dashboard',
                remark: '一级菜单',
                breadcrumbName: '仪表盘',
            },
            {
                title: '内容创作者',
                showMenu: true,
                menuIcon: 'crown',
                path: 'creators',
                remark: '一级菜单',
                breadcrumbName: '内容创作者',
                children: [
                    {
                        title: '热度主播',
                        path: 'anchor',
                        component: AsyncAnchor,
                        showMenu: true,
                        menuIcon: 'smile',
                        remark: '子菜单',
                        breadcrumbName: '热度主播',
                        children: [
                            {
                                title: '详情',
                                path: 'detail',
                                component: AsyncAnchorDetail,
                                showMenu: false,
                                remark: '展示详情',
                                breadcrumbName: '详情1'
                            }
                        ]
                    },
                ]
            },
            {
                title: '任务管理',
                showMenu: true,
                menuIcon: 'setting',
                path: 'crewlerManage',
                remark: '一级菜单',
                breadcrumbName: '任务管理',
                children: [
                    {
                        title: '爬虫RoadMap',
                        path: 'roadMap',
                        component: AsyncCrewlerManage,
                        showMenu: true,
                        menuIcon: 'schedule',
                        remark: '二级路由',
                        breadcrumbName: '爬虫RoadMap'
                    },
                    {
                        title: '定时任务',
                        path: 'schedule',
                        // component: AsyncWorkplace,
                        showMenu: true,
                        menuIcon: 'schedule',
                        remark: '二级路由',
                        breadcrumbName: '定时任务'
                    }
                ]
            }
        ]
    }

    // {
    //     title: '后台管理',
    //     path: '/admin',
    //     component: AsyncAdmin,
    //     needAuthorized: true,
    // children: [
    //     {
    //         title: '数据面版',
    //         path: 'dashboard',
    //         showMenu: true,
    //         menuIcon: 'calendar',
    //         children: [
    //                 {
    //                     title: '工作台',
    //                     path: 'workplace',
    //                     component: AsyncWorkplace,
    //                     showMenu: true,
    //                     remark: '工作台'
    //                 },
    //                 {
    //                     title: '数据分析',
    //                     path: 'analysis',
    //                     component: AsyncAnalysis,
    //                     showMenu: true,
    //                     remark: '数据分析'
    //                 }
    //             ],
    //             remark: '数据面版'
    //         },
    //         {
    //             title: '工作台',
    //             path: 'workplace1',
    //             component: AsyncWorkplace,
    //             menuIcon: 'calendar',
    //             showMenu: true,
    //             remark: '工作台'
    //         }
    //     ],
    //     remark: '后台管理'
    // }
]