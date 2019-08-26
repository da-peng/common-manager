import './routers/crewler_ws'
import {ConnectionManage} from './utils/connection_manage'
import {scheduleCronstyle} from './schedule/Schedule'

// 启动定时任务
// scheduleCronstyle();

ConnectionManage.init().then(()=>{
    ConnectionManage.initData()//只能一次
})