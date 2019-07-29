import React from 'react'
import { ErrorInfo } from 'react'
import { IAbstractComponentProps, IAbstractComponentState, AbstractComponent } from '../../bases/AbstractComponent'

interface IProps extends IAbstractComponentProps {}
interface IState extends IAbstractComponentState {
    error: Error | null
    errorInfo: ErrorInfo | null
}


class ErrorHandlerClass extends AbstractComponent<IProps, IState> {

    displayName = 'ErrorHandlerClass'
    
    state: IState = {
        error: null,
        errorInfo: null
    }
    
    /**
     * 捕捉组件中render错误
     */
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo
        })
    }

    getRenderContent() {
        const { error } = this.state
        return error ? <div>{error.message.toString()}</div> : this.props.children
    }
}

/**
 * 错误处理组件
 */
export const ErrorHandler = ErrorHandlerClass