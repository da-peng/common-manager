export interface IResponseBase<T> {
    status: number
    message: string
    data: T
}

export interface IResponseListBase<T> {
    status: number
    message: string
    data: {
        list: Array<T>
        total: number
        pageNum: number
        pages: number
        pageSize: number
    }
}

export interface IReuqestBase {
    pageNum?: number
    pageSize?: number
    componentUUID: string //为什么必须要有这个呢？ 这个是UI组件，传到 异步请求的过度
}