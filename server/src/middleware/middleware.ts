import *  as Router from "koa-router"
import *  as Compose from "koa-compose"
import *  as Bodyparser from "koa-bodyparser"
import errorHandle from "./error_handle";
import {AuthTokenHandle} from './token_handle'
import * as Json from 'koa-json';// 美观的输出JSON  response
import * as cors from 'koa2-cors'

export function middleware() {
    let token = new  AuthTokenHandle();
    return Compose([ //这里的排版有优先的控制，所以不能轻易调整顺序
        cors({
            origin: '*',
            maxAge: 5,
            allowMethods: ['GET', 'POST'],
            allowHeaders: ['Content-Type', 'Token', 'Accept'],
        }),//1
        errorHandle(),
        Bodyparser({
            enableTypes:['json'], 
            extendTypes: {
                json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
              },
            jsonLimit: '50mb' }),
        token.tokenHandle(),
        Json(),
    ]
    )
}