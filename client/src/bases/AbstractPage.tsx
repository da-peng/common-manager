import * as React from 'react'
import { request } from './HttpInterceptors'
import { store } from '../reducers/Store';
import {SHOW,HIDEN} from '../reducers/Loading/ActionsType'
export interface IAbstractPageProps {
    className?: string
}

export interface IAbstractPageState {
    page?: number
    pageSize?: number
    total?: number
}

export abstract class AbstractPage<P extends IAbstractPageProps, S extends IAbstractPageState> extends React.Component<P, S> {
    /**
     * 类名
     */
    abstract displayName: string

    /**
     * state 初始化
     */
    abstract state: S

    /**
     * 组件挂载的当前时间
     */
    initTimeSpan: number = 0

    /**
     * render 内容
     */
    abstract getRenderContent(): JSX.Element | null

    constructor(props: P) {
        super(props)
        this.initTimeSpan = new Date().getTime()
    }

    /**
     * 获取组件的UUID，返回displayName_initTimeSpan
     */
    getUUID(): string {
        return `${this.displayName}_${this.initTimeSpan}`
    }

    /**
     * 获取类名
     */
    getDisplayName(): string {
        return this.displayName
    }

    /**
     * 用1个map记录当前所有的异步请求，key：组件uuid，value：请求cancel实例 （卸载后；调用cancel）
     */
    componentWillUnmount() {
        if (request.cancel) {
            request.cancel(this.getUUID())
        }
       
    }
    
    /**
     * 通过redux显示全局spin
     */
    showLoading(){
        store.dispatch({
            type: SHOW
        })
    }

    /**
     * 通过redux隐藏全局spin
     */
    hidenLoading() {
        store.dispatch({
            type: HIDEN
        })
    }
    /**
     * 不要重写，请通过实现getRenderContent
     */
    render() {
        return <div className="global-page">{this.getRenderContent()}</div>
    }


}