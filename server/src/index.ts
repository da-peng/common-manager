import 'reflect-metadata'
import * as Koa from 'koa'
import {middleware} from './middleware/middleware'
import {ConnectionManage} from './utils/connection_manage'

import {userRouter} from './routers/user_router'
import {anchorRouter} from './routers/anchor_router'

let app = new Koa();
app.use(middleware())

ConnectionManage.init().then(()=>{
    // ConnectionManage.initData()//只能一次
})

// userRouters
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
// anchorRouter
app.use(anchorRouter.routes())
app.use(anchorRouter.allowedMethods())

app.listen(parseInt(process.env.PORT, 10) || 3000);