import * as React from 'react'
import { IAbstractComponentProps, IAbstractComponentState, AbstractComponent } from '../../bases/AbstractComponent'
// import { IReducerAuthState } from '../../reducers/Auth/AuthReducer';
import { AuthService } from '../../services/Auth';
import { Message } from '../../utils/Message';
import { Dropdown,  Menu, Icon } from 'antd';
// import { IReduxState } from '../../reducers/Store';
// import { connect } from 'react-redux';
import styles from './UserDropdown.less'
import { RouteComponentProps } from 'react-router';


// const authStateToProps = (state:IReduxState ) => {
//     return { 
//       reduxStore: { ...state.auth }
//     }
// }

interface IProps extends IAbstractComponentProps,RouteComponentProps<any> {
    // reduxStore?: IReducerAuthState
}

interface IState extends IAbstractComponentState {
    username: string
}

class UserDropdownClass extends AbstractComponent<IProps, IState> {
    displayName: string = 'UserDropdownClass';
    state: IState = { username: '' };

    componentDidMount() {
        this.componentStateChange('pending')
        this.getUserInfo()
    }

    async getUserInfo() {
        // const { reduxStore } = this.props
        try {
            
            const { data } = await AuthService.getAuthinfos({
                componentUUID: this.getUUID()
            })
            // console.log(data)
            
            if (data && data.status === Message.get('requestOk').status) {
                this.componentStateChange('complete')
                this.setState({
                    username: data.data.username
                })
            }
            // let uid = reduxStore.uid
            // if (reduxStore && reduxStore.uid && reduxStore.uid !== 0) {
            //     let uid = reduxStore.uid
            //     const { data } = await AuthService.getAuthinfos({
            //         uid: uid,
            //         componentUUID: this.getUUID()
            //     })
            //     // console.log(data)
                
            //     if (data && data.status === Message.get('requestOk').status) {
            //         this.componentStateChange('complete')
            //         this.setState({
            //             username: data.data.username
            //         })
            //     }
            // }
        } catch (e) {
            console.log(e)

        }
    }

    onLogout =()=> { // bind.this，箭头函数可以直接bind.this
        AuthService.removeAuthFormStore()
        // console.log(this.props)
        this.props.history.replace('/login')
    }

    gotoLoginPage() {

    }

    getMenu() {//px 像素点 
        return (
            <Menu>
                <Menu.Item onClick={this.onLogout}>
                    <span>
                    <Icon type="logout" style={{marginRight:'10px'}}/>
                    Login
                    </span>
                </Menu.Item>
            </Menu>
        )
    }

    getRenderContent() {
        return (
            
            <Dropdown className={styles.Dropdown} overlay={this.getMenu()}>
                {/* {console.log(this.getMenu())} */}
                <div>
                    <span className={`${styles.headerAvatar} ant-avatar-icon`}>
                        <Icon type="user" />
                    </span>
                    <span className={styles.headerUsername}>
                        {this.state.username}
                    </span>
                </div>
            </Dropdown>
        )
    }
}


/**
 * 基于redux的全局spin组件
 */

export const DropdownClass = UserDropdownClass
// export const DropdownClass = connect(authStateToProps)(UserDropdownClass)