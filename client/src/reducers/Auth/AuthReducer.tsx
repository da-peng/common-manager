import _ from 'lodash'
import {LOGIN,LOGOUT} from './ActionsType'
import {IReducerAction} from '../IReducerAction'

export interface IReducerAuthState {
    uid: number
    token: string
}

const initialState: IReducerAuthState = {
    uid: 0,
    token: ''
}
/**
 * 取的时候
 * @param state 
 * @param action 
 */
export const authinfoReducer = (
    state:IReducerAuthState = initialState
    , action: IReducerAction<IReducerAuthState> )=>{
        switch (action.type) {
            case LOGIN:
                return {
                    uid: action.data?  _.cloneDeep(action.data.uid) : 0,
                    token: action.data?  action.data.token : '',
                    }
            case LOGOUT:
                return {
                uid: 0,
                token: ''
                }
            default:
                return state
        }
}