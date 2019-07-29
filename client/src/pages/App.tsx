import * as React from 'react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import RoutesComponent from '../routes/RoutesComponent'
import { authService } from '../services/Auth'
import { GlobalSpin } from '../components/PageLoading/PageLoading'
import { ErrorHandler } from '../components/ErrorHandler/ErrorHandler';


interface IProps {}

interface IState {}

// notification.config({
//     placement: 'topRight',
//     top: 24,
//     duration: 3,
// })

class App extends React.Component<IProps, IState> {
    componentDidMount() {
        authService.dispatchAuthToStore()
    }
    
    render() {
        return (
          <LocaleProvider locale={zhCN}>
              <ErrorHandler>
                <GlobalSpin/>
                <RoutesComponent/>
              </ErrorHandler>
          </LocaleProvider>
        )
    }
}

export default App