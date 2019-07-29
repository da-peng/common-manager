import {SHOW,HIDEN} from './ActionsType'
import { IReducerAction } from '../IReducerAction'


export interface IReducerLoadingState {
    loading: boolean
    counts: number
  }
  
const initialState: IReducerLoadingState = {
    loading: false,
    counts: 0
}


export const loadingReducer = (
    state:IReducerLoadingState = initialState
    , action: IReducerAction<IReducerLoadingState> )=>{
        let {counts} = state
        switch (action.type) {
            case SHOW:
                counts = counts + 1
                return {
                  loading: true,
                  counts
                }
            case HIDEN:
                counts = Math.max(counts - 1, 0)
                return {
                    loading: counts ? true : false,
                    counts
                }
            default:
                return state
        }
}
