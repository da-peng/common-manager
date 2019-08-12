import * as Koa from 'koa';
import { UserService } from '../service/user_service';
import { StringUtil } from '../utils/string_utils'
import { DateUtil } from '../utils/date_utils'
import { Message } from '../utils/message';

interface AuthToken {
    date: Date,
    uid: number,
}

export class AuthTokenHandle {


    /**
     * 构造token，确保唯一
     */
    async generateToken(uid: number) {
        const tokenObj: AuthToken = { date: new Date(), uid: uid }
        return StringUtil.encrypt(JSON.stringify(tokenObj))
    }


    async decryptToken(token:string):Promise<AuthToken>{
        const tokenOfStr = StringUtil.decrypt(token)
        const tokenObj: AuthToken = JSON.parse(tokenOfStr)
        // console.log(tokenObj)
        return tokenObj
    }

    /**
     * 验证User 及Token
     * @param ctx 
     */
    async validUser(ctx: Koa.Context): Promise<boolean> {
        
        const userId = ctx.request.body.uid ||ctx.request.query.uid ;
        const token = ctx.request.header.token;
        let validUser: boolean = !!userId
        if (userId) {

            const checkUser = await UserService.checkUserById(userId);

            const tokenObj:AuthToken = await this.decryptToken(token)
            // console.log(tokenObj)

            const tokenUid = tokenObj.uid
            // console.log(typeof tokenObj.date)

            validUser = checkUser.success;

            if (validUser) {
                if (tokenUid.toString() === userId) {
                    if (DateUtil.diff(new Date(tokenObj.date), new Date()) > 24) {
                        //token时间>24h token重构造
                        ctx.header.token = this.generateToken(userId)
                    }
                } else {
                    validUser = false
                }
            }
        }
        return validUser
    }

    tokenHandle(): (ctx: Koa.Context, next: Function) => Promise<void> {
        return async (ctx, next) => {
            // console.log(ctx.url)
            if (ctx.url.match(/\/login/)) {
                return await next();
            }
            
            const validUser = await this.validUser(ctx);
            if (!validUser) {
                ctx.body = { ...Message.get('tokenInvalid') };
                // ctx.status = 200;
                // ctx.redirect(Setting.instance.host);
                return 
            }
            return await next();
        };
    }
    
}