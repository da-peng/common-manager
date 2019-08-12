import 'reflect-metadata'
import * as Koa from 'koa'
import {middleware} from './middleware/middleware'
import {ConnectionManage} from './utils/connection_manage'

import {userRouter} from './routers/user_router'
import { SSL_OP_PKCS1_CHECK_1 } from 'constants';

let app = new Koa();
app.use(middleware())

ConnectionManage.init().then(()=>{
    ConnectionManage.initData()//只能一次
})

// router

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.listen(parseInt(process.env.PORT, 10) || 3000);