import * as Router from 'koa-router'
import { UserService } from '../service/user_service'
import {AuthTokenHandle} from '../middleware/token_handle'
import {ResponseObject} from '../interface/ResponseObj'
import { User } from '../entity/User';

export const userRouter = new Router()


userRouter.post('/login', async ctx => {
    let username = ctx.request.body.username
    let pwd = ctx.request.body.password

    const checkUser = await UserService.checkUserByAcount(username, pwd)

    const responseObj:ResponseObject = {
        message:checkUser.message,
        status:checkUser.status,
    }
    if(checkUser.success){
        const authToken = new AuthTokenHandle()
        const uid = checkUser.result.id
        const token: string = await authToken.generateToken(uid)
        responseObj.data = {
            uid:uid,
            token:token
        }
    }
    ctx.body = responseObj
})

userRouter.get('/userinfo', async ctx => {

    let uid:number = ctx.request.query.uid

    const checkUser  = await UserService.checkUserById(uid)
    
    const responseObj:ResponseObject = {
        message:checkUser.message,
        status:checkUser.status,
    }

    if(checkUser.success){
        const user:User = checkUser.result

        responseObj.data = {
            username:user.username
        }
    }
    ctx.body = responseObj
})