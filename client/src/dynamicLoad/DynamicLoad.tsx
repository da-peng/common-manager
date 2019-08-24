import * as React from 'react' // 如何有jsx 的东西就需要引入react
import Loadable from 'react-loadable'
import { DynamicPageLoading } from '../components/PageLoading/DynamicPageLoading'

export const AsyncLogin = Loadable({
    loader: () => import(/* webpackChunkName: 'pages/login' */ '../pages/Login/Login'),
    loading: () => <DynamicPageLoading />
})

export const AsyncAdmin = Loadable({
    loader: () => import(/* webpackChunkName: 'pages/admin' */ '../pages/Admin/Admin'),
    loading: () => <DynamicPageLoading />
})



export const AsyncAnchor = Loadable({
    loader: () => import(/* webpackChunkName: 'pages/anchor' */ '../pages/AnchorTable/AnchorTable'),
    loading: () => <DynamicPageLoading />
})

export const AsyncAnchorDetail = Loadable({
    loader: () => import(/* webpackChunkName: 'pages/anchor/detail' */ '../pages/AnchorTable/Detail/AnchorDetail'),
    loading: () => <DynamicPageLoading />
})

export const AsyncDashboard = Loadable({
    loader: () => import(/* webpackChunkName: 'pages/dashboard' */ '../pages/Dashboard/Dashboard'),
    loading: () => <DynamicPageLoading />
})
