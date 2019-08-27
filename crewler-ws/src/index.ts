import './routers/crewler_ws'
import {ConnectionManage} from './utils/connection_manage'
import {ScheduleRun} from './schedule/Schedule'




ConnectionManage.init().then(()=>{
    ConnectionManage.initData()//只能一次
})


ScheduleRun.run()