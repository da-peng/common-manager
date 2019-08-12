import * as React from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from '../../bases/AbstractComponent'
import { IReducerLoadingState } from '../../reducers/Loading/ActionsReducer'
import { IReduxState } from '../../reducers/Store'

export const spinMapStateToProps = (state: IReduxState) => {
    return { 
      reduxStore: { ...state.spin }
    }
}
/**
 * reduxStore redux中的数据
 */
interface IProps extends IAbstractComponentProps {
    reduxStore?: IReducerLoadingState
}

interface IState extends IAbstractComponentState {}

class GlobalSpinClass extends AbstractComponent<IProps, IState> {
    
    displayName = 'GlobalSpinClass'

    state: IState = {}

    getRenderContent() {
        const { reduxStore } = this.props
        return (
            reduxStore && reduxStore.loading && <Spin size="large" className="global-spin-full"/>
        )
    }
    /**
     * 应用需要更新的情况
     * @param nextProps 
     */
    shouldComponentUpdate(nextProps: IProps) {
        const { loading } = nextProps.reduxStore || { loading: false}
        if (this.props.reduxStore && loading === this.props.reduxStore.loading) {
            return false
        }
        return true
    }
}

/**
 * 基于redux的全局spin组件
 */
export const GlobalSpin = connect(spinMapStateToProps)(GlobalSpinClass)