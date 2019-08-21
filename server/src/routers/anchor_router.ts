import * as Router from 'koa-router'
import { AnchorService } from '../service/anchor_service'
import {ResponseObject} from '../interface/ResponseObj'
import { UserService } from '../service/user_service';



export const anchorRouter = new Router()
/**
 * {
 * uid:
 * page:
 * pageSize:
 * }
 */
anchorRouter.post('/anchorList',async (ctx)=>{
    let page = ctx.request.body.page
    let pageSize = ctx.request.body.pageSize
    let sort = ctx.request.body.sort
    if (!sort){
        sort = 1//默认升序
    }
    let result = await AnchorService.getfansOrderByFollow(pageSize,page)/**根据粉丝关注数量排序 */

    const responseObj:ResponseObject = {
        message: result.message,
        status: result.status,
        page:result.page,
        totalPage:result.pageTotal,
    }
    
    responseObj.data = {
        
        ...result.data
    }
    ctx.body = responseObj
})

/**
 * 更新主播信息
 */
anchorRouter.post('/updateAnchorInfo',async (ctx)=>{
    let anchorId = ctx.request.body.anchorId
    let sex = ctx.request.body.sex
    let ageGroup = ctx.request.body.ageGroup
    let result = await AnchorService.updateAnchorUserInfo(anchorId,sex,ageGroup)

    const responseObj:ResponseObject = {
        message: result.message,
        status: result.status
    }
    console.log(result.data)
    responseObj.data = {
        data:result.data
    }
    ctx.body = responseObj
})


/**
 * ?uid=
 */
anchorRouter.get('/anchorFansStatistics',async (ctx)=>{
    let anchorId = ctx.request.query.anchorId
    let result =await AnchorService.getAnchorFansWeekStatisticsById(anchorId)
    const responseObj:ResponseObject = {
        message: result.message,
        status:result.status
    }
    responseObj.data = {
        data:result.data
    }
    ctx.body = responseObj
})