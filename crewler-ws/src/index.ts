import 'reflect-metadata'
import * as Koa from 'koa'
import {middleware} from './middleware/middleware'
import './routers/crewler_router'
import {ConnectionManage} from './utils/connection_manage'


const app = new Koa();
app.use(middleware())

ConnectionManage.init().then(()=>{
    ConnectionManage.initData()//只能一次
})
//

// router

// app.use(crewlerRouter.routes())
// app.use(crewlerRouter.allowedMethods())
// 启动定时任务
// scheduleCronstyle();
app.listen(parseInt(process.env.PORT, 10) || 3000);