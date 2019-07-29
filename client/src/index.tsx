import React from 'react';
import ReactDOM from 'react-dom';
import  './globalCss/Global.less'; // 这个文件不能放在globalCss 以外的目录，Css module 问题
import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {store} from './reducers/Store'

// 监听state变化
store.subscribe(()=>{
    // console.log(store.getState())
})
// 这里不能用CSS module 方式来写
ReactDOM.render(
    <Provider store ={store}>
        <App />
    </Provider>,
     document.getElementById('root'));

window.addEventListener('error', (error: any) => {
    // console.log('error:', error)
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
