import _ from 'lodash'
import {UserInfo} from '../../models/User'
import {LOGIN,LOGOUT} from './ActionsType'
import {IReducerAction} from '../IReducerAction'

export interface IReducerAuthState {
    user: UserInfo | undefined
    token: string | null
}

const initialState: IReducerAuthState = {
    user: undefined,
    token: ''
}

export const authinfoReducer = (
    state:IReducerAuthState = initialState
    , action: IReducerAction<IReducerAuthState> )=>{
        switch (action.type) {
            case LOGIN:
                return {
                    user: action.data?  _.cloneDeep(action.data.user) : undefined,
                    token: action.data?  action.data.token : '',
                    }
            case LOGOUT:
                return {
                user: undefined,
                tenantCode: '',
                token: ''
                }
            default:
                return state
        }
}