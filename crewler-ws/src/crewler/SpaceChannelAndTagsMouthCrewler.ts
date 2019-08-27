import { AbstractBaseCrewler } from "./AbstractBaseCrewler";
import { SpaceService } from "../service/space_service";
import {ChannelAndTagsService} from '../service/channel_tags_service'
import * as util from 'util'
import { Anchor } from "../entity/Anchor";
import { StringUtil } from "../utils/string_utils";
import { retry } from "../utils/crewler_utils";
/**
 * 主播空间 的爬虫，爬去空间下的频道， 一级所有视频分类（数量）视频热度信息
 */

export class SpaceChannelAndTagsMouthCrewler extends AbstractBaseCrewler {

    /**
     * 
     * @param isHeadless 是否是无头模式
     * @param crewlerTransform 记录执行过程
     * @param args 其它参数
     */
    init(isHeadless: boolean, crewlerTransform: any, ...args: any) {
        super.runWithOutUrl(isHeadless, crewlerTransform, ...args)
    }

    async parse(...args: any) {
        let pageSize = 10
        let pageIndex = await SpaceService.getTablePageNumber(pageSize)
        for (let i = 0; i < pageIndex; i++) {
            this.j = 0
            let anchorLinks = await SpaceService.getLimitAnchorLinks(pageSize, i)
            await this.parseChannle(anchorLinks)
        }

    }
    j:number=0
    async parseChannle(anchorLinks){
            let anchor = anchorLinks[this.j]
            let anthorId = anchor.id
            let anchorLink = anchor.anchorLink
            let videoUrl = anchorLink + '/video'
            let channelUrl = anchorLink + '/channel/index'
            await this.page.goto(channelUrl, { waitUntil: 'domcontentloaded' })
            
            this.Log.info(`page navigation to ${channelUrl}`)
            await this.page.waitFor(5000)
            
            let channelItems:any = await retry(async()=>{
                return await this.page.$$eval('#page-channel-index > div.col-full > div > div.content > div > div'
                , (items) => items.map((i) => {
                    let videoNum = parseInt(i.querySelector('div.video-num-inner > strong').textContent)
                    let channelTitle = i.querySelector('div.channel-meta > h4').textContent
                    let channelCreateTime = i.querySelector('div.channel-meta > div.channel-update-time').textContent
                    return {
                        channelTitle: channelTitle.replace('\n','').trim(),
                        videoNum: videoNum,
                        channelCreateTime: channelCreateTime.replace('\n','').trim()
                    }
                }))
            },2,100)

            this.Log.info(channelItems)
            /**
             * 存储数据
             */
            let i :any
            if(channelItems!=[]){
                for (i of channelItems) {
                    let channelCreateTime = StringUtil.timeFormat(i.channelCreateTime)//转换时间通用方法
                    await ChannelAndTagsService.saveChannel(anthorId,i.channelTitle,i.videoNum,channelCreateTime)
                }
            }

            await this.page.goto(videoUrl, { waitUntil: 'domcontentloaded' })
            await this.page.waitFor(5000)//必须要加一个等待时间
            this.Log.info(`page navigation to ${videoUrl}`)
            
            let tags = await this.page.$$eval('#submit-video-type-filter > a'
                , (item) => item.map((i)=>{
                    let tagName = (i.textContent).replace('\n','').replace(/\d+/g,'').trim()
                    let videoNum = parseInt(i.querySelector('span').textContent)
                    return {
                        tagName: tagName,
                        videoNum: videoNum
                    }
                })
            )
            // this.crewlerTransform.write(`tags include: \n ${util.inspect(tags,{colors:true})}`)
            this.Log.info(tags)
            // this.crewlerTransform.write(`tags include: \n ${util.inspect(tags,{colors:true})}`)
            for (i of tags) {
                await ChannelAndTagsService.saveTags(anthorId,i.tagName,i.videoNum)
            }
            if(this.j>=anchorLinks.length-1){
                return 
            }
            this.j++
            return await this.parseChannle(anchorLinks) //返回的也要是await 不然就异步了

    }
    

    storeData(...args: any) {

    }

}