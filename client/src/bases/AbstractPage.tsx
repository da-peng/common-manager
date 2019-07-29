import * as React from 'react'


export interface IAbstractPageProps {
    className?: string
}

export interface IAbstractPageState {
    pageNum?: number
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
     * 组件初始化时间
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

    componentWillUnmount() {
    }
    
    /**
     * 不要重写，请通过实现getRenderContent
     */
    render() {
        return <div className="global-page">{this.getRenderContent()}</div>
    }


}