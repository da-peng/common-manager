import { AbstractBaseCrewler } from "./AbstractBaseCrewler";
import { SpaceService } from "../service/space_service";
import {StringUtil} from '../utils/string_utils'
import * as util from 'util'
/**
 * 主播空间 的爬虫，爬去空间下的频道， 一级所有视频分类（数量）视频热度信息
 */

 export class SpaceVideoWeekCrewler extends AbstractBaseCrewler{

    /**
     * 
     * @param isHeadless 是否是无头模式
     * @param crewlerTransform 记录执行过程
     * @param args 其它参数
     */
    init(isHeadless: boolean,  crewlerTransform: any, ...args: any) {
        super.runWithOutUrl(isHeadless, crewlerTransform, ...args)
    }

    async parse(...args: any){
        let pageSize = 10
        let pageIndex = await SpaceService.getTablePageNumber(pageSize)
        for (let i = 0; i < pageIndex; i++) {
            let anthorLinks = await SpaceService.getLimitAnthorLinks(pageSize, i)
            for (let i of anthorLinks) {
                let anthorId = i.id
                let anthorLink = i.anthorLink
                let videoUrl = anthorLink + '/video'
                await this.page.goto(videoUrl, { waitUntil: 'domcontentloaded' })
                this.crewlerTransform.write(`page navigation to ${videoUrl}`)

                let pageNums = await this.page.$eval('#submit-video-list > ul.be-pager > span.be-pager-total',(i)=>{
                    let pageNums= parseInt(i.textContent.replace('共','').replace('页','').trim())
                    return pageNums
                })

                for(let i = 0 ;i<pageNums;i++){
                    let videoItems = await this.page.$$eval('#submit-video-list > ul.clearfix.cube-list > li',(items)=>items.map((item)=>{
                        let videoLink =item.querySelector('a').href
                        let videoTitle =item.querySelector('a.title').textContent
                        let play = item.querySelector('div > span.play').textContent
                        let time = item.querySelector('div > span.time').textContent
                        return {
                            videoLink:videoLink,
                            videoTitle:videoTitle,
                            play:play,
                            time:time
                        }
                    }))

                this.crewlerTransform.write(`channel include: \n ${util.inspect(videoItems,{colors:true})}`)

                    for (let i of videoItems) {
                        let time = i.time
                        let n = (time.split('-')).length-1

                        let createTime = new Date()
                        if(time.match(/前/)){
                            createTime = new Date()
                        }else if(n===1){
                            time = (new Date().getFullYear)+i.time
                            createTime = new Date(time)
                        }else{
                            createTime = new Date(time)
                        }
                        let videoInfo = await SpaceService.saveSpaceVideInfo(anthorId,i.videoLink,i.videoTitle,createTime)
                        let videoId = videoInfo.id
                        let play = StringUtil.unitConvertToInt(i.play)
                        await SpaceService.saveSpaceVideHotInfo(anthorId,videoId,play)
                    }
                    await (await this.page.$('#submit-video-list > ul.be-pager > li.be-pager-next')).click()
                    await this.page.waitFor(2000)
                }
            }
        }
        
    }     
     
    storeData(...args: any){
         
    }

 }