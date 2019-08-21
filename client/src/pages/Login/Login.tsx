import styles from './Login.less'; //CSS moudel
import * as React from 'react';
import { ADMIN } from '../../utils/Constants'
import { Form, Col, Row } from 'antd'
import Login from '../../components/Login/Login'
import { AbstractPage, IAbstractPageProps, IAbstractPageState } from '../../bases/AbstractPage';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';
import { AuthService, IAuthLogin } from '../../services/Auth'
import { setToken, setUid } from '../../utils/EncryptLocalStorage'
import LoginBackground from '../../asset/media/login-bg.jpg'


interface IProps extends IAbstractPageProps, FormComponentProps, RouteComponentProps<any> { }

interface IState extends IAbstractPageState {
  collapsed?: boolean,
}
// const { 
//   Content,
//     // Sider
//   } = Layout


// const backgroundImage = {
//   width: "100%",
//   height: "100%",
// // makesure here is String确保这里是一个字符串，以下是es6写法
//   backgroundImage: `url(${LoginBackground})` 
// };

class LoginPageClass extends AbstractPage<IProps, IState>{

  displayName = 'LoginPageClass'

  state: IState = {
    collapsed: false
  }




  /**
   * 登录成功之后，token和用户信息全部存在redux中，不用state传递
   */

  /**
 * 跳转到管理后台页面
 */
  gotoAdminPage() {
    this.props.history.replace(ADMIN)
  }

  async onLoginSuccess(data: IAuthLogin) {
    setToken(data.token)
    setUid(data.uid.toString())
    AuthService.dispatchAuthToStore()
    this.gotoAdminPage()
  }

  getRenderContent() {
    return (
      <Row className={styles.loginPage}>
        <Col className={styles.loginForm}>
          <Login   {...this.props} onLoginSuccess={(d) => this.onLoginSuccess(d)} />
        </Col>
        <Col className={styles.loginBackground}>
          <img className={styles.img} src={LoginBackground} alt='' />
        </Col>
      </Row>
    )
  }
}

export default Form.create()(LoginPageClass);
