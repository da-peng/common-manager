import * as React from 'react'
import { Spin } from 'antd'

interface IProps {}

/**
 * 分包加载的loading组件
 * 动态加载组件loading组件 SFC,FC貌似都是一样的,只有版本的差别, 用于动态记载的，跟网络请求的loading不一样
 */
export const DynamicPageLoading: React.FC<IProps> = () => {
    return (
        <Spin size="large" className="global-spin-full"/>
    )
}