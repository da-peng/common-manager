export interface IReducerAction<T> {
    type: string
    data?: T
}