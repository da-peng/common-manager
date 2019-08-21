export interface IResponseBase<T> {
    status: number
    message: string
    data: T
}

export interface IResponseListBase<T> {
    status: number
    message: string
    page: number
    totalPage: number
    data: {
        [index:number]: T
    }
}

export interface IReuqestBase {
    uid?:number
    page?: number
    pageSize?: number
    componentUUID: string //为什么必须要有这个呢？ 这个是UI组件，传到 异步请求的过度
}