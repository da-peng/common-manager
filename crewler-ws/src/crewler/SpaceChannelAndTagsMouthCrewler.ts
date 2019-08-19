import { AbstractBaseCrewler } from "./AbstractBaseCrewler";
import { SpaceService } from "../service/space_service";
import {ChannelAndTagsService} from '../service/channel_tags_service'
import * as util from 'util'
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
            let anthorLinks = await SpaceService.getLimitAnthorLinks(pageSize, i)
            for (let i of anthorLinks) {
                let anthorId = i.id
                let anthorLink = i.anthorLink
                let videoUrl = anthorLink + '/video'
                let channelUrl = anthorLink + '/channel/index'
                await this.page.goto(channelUrl, { waitUntil: 'domcontentloaded' })
                this.crewlerTransform.write(`page navigation to ${channelUrl}`)

                let channelItems = await this.page.$$eval('#page-channel-index > div.col-full > div > div.content > div > div'
                    , (items) => items.map((i) => {
                        let videoNum = parseInt(i.querySelector('div.video-num-inner > strong').textContent)
                        let channelTitle = i.querySelector('div.channel-meta > h4').textContent
                        let channelCreateTime = new Date(i.querySelector('div.channel-meta > div.channel-update-time').textContent)
                        return {
                            channelTitle: channelTitle,
                            videoNum: videoNum,
                            channelCreateTime: channelCreateTime
                        }
                    }))
                this.crewlerTransform.write(`channel include: \n ${util.inspect(channelItems,{colors:true})}`)
                /**
                 * 存储数据
                 */
                for (i of channelItems) {
                    await ChannelAndTagsService.saveChannel(anthorId,i.channelTitle,i.videoNum,i.channelCreateTime)
                }


                await this.page.goto(videoUrl, { waitUntil: 'domcontentloaded' })
                let tags = await this.page.$$eval('#submit-video-type-filter > a'
                    , (item) => item.map((i)=>{
                        let tagName = i.textContent
                        let videoNum = parseInt(i.querySelector('span').textContent)
                        return {
                            tagName: tagName,
                            videoNum: videoNum
                        }
                    })
                )
                for (i of tags) {
                    await ChannelAndTagsService.saveTags(anthorId,i.tagName,i.videoNum)
                }

            }
        }

    }

    storeData(...args: any) {

    }

}