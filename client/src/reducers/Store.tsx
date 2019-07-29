import { createStore, combineReducers } from 'redux'
import { authinfoReducer, IReducerAuthState } from './Auth/AuthReducer'
import { loadingReducer, IReducerLoadingState } from './Loading/ActionsReducer'
// 开发工具 redux 调试工具
import { composeWithDevTools } from 'redux-devtools-extension'

export interface IReduxState {
    spin: IReducerLoadingState
    auth: IReducerAuthState
    // offlineStoreSelect: IReducerOfflineStoreSelectState
}
// combineReducers  合并
export const store = createStore(combineReducers<IReduxState>({
    auth: authinfoReducer,
    spin: loadingReducer
}), composeWithDevTools())
