import styles from './Login.less'
import * as React from 'react'
import { Form, Button, Input, Icon, Row } from 'antd'
import { IAbstractComponentProps, AbstractComponent, IAbstractComponentState } from '../../bases/AbstractComponent'
import { AuthService, IAuthLogin } from '../../services/Auth'
import { Message } from '../../utils/Message'
import { FormComponentProps } from 'antd/lib/form';
import logo from '../../asset/svg/logo.svg'


interface IProps extends IAbstractComponentProps, FormComponentProps {
    /**
     * 登录成功事件
     */
    onLoginSuccess: (d: IAuthLogin) => void
}

interface IState extends IAbstractComponentState { }


/**
 * 登录组件表单字段
 */
interface ILoginFormFileds {
    username: string
    password: string
}

class LoginClass extends AbstractComponent<IProps, IState> {
    state: IState = {}

    displayName = 'LoginClass'
    async onLogin() {

        const { form } = this.props

        form.validateFields(async (error, values: ILoginFormFileds) => {
            if (error) {
                return
            }
            this.showLoading()
            // 发送请求 //await 拿到 promise 的数据 如果不用await需要用then拿到数据

            try {
                const { data } = await AuthService.login({
                    username: values.username,
                    password: values.password,
                    componentUUID: this.getUUID()
                })
                //解决 1 网络断网， 2. 网络请求数据失败（后端数据库连接失败 ,不能去掉 data 空/undefined 判断
                if (data && data.status === Message.get('requestOk').status) {
                    this.props.onLoginSuccess(data.data)
                }
            } catch (error) {

            }

            this.hidenLoading()
        })


    }

    getRenderContent() {
        const { getFieldDecorator } = this.props.form
        return (
            // <Row className={`${styles.loginForm} ${styles.loginSider}`}>
            <Row className={styles.loginComponent}>

                <div className={styles.loginFormTitle}>
                    <img className={styles.loginFormLogo} src={logo} alt='' />
                </div>
                <div className={styles.loginFormDesc}>通用管理后台</div>
                <Form>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input className="ant-input-lg" autoComplete="off" prefix={<Icon type="user" />} placeholder="用户名" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input className="ant-input-lg" autoComplete="off" prefix={<Icon type="lock" />} type="password" placeholder="密码" />
                        )}
                    </Form.Item>
                    <Button onClick={() => this.onLogin()} type="primary" className={styles.loginFormButton}>登录</Button>
                </Form>
            </Row>
        )
    }


}

export default LoginClass
