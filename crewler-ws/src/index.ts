import './routers/crewler_ws'
import {ConnectionManage} from './utils/connection_manage'


ConnectionManage.init().then(()=>{
    ConnectionManage.initData()//只能一次
})