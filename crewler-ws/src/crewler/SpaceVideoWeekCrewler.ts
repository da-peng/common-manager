import { AbstractBaseCrewler } from "./AbstractBaseCrewler";
import { SpaceService } from "../service/space_service";
import { StringUtil } from '../utils/string_utils'
import * as util from 'util'
import { retry } from "../utils/crewler_utils";
/**
 * 主播空间 的爬虫，爬去空间下的频道， 一级所有视频分类（数量）视频热度信息
 */

export class SpaceVideoWeekCrewler extends AbstractBaseCrewler {

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
            let anchorLinks = await SpaceService.getLimitAnchorLinks(pageSize, i)
            this.i = 0
            await this.parseAnchorLinks(anchorLinks)
        }

    }

    i: number = 0
    async parseAnchorLinks(anchorLinks: any) {
        // 使用一个 for await 循环，不能一个时间打开多个网络请求，这样容易因为内存过大而挂掉
        //感觉要递归实现了
        const anchor = anchorLinks[this.i];
        let anchorId = anchor.id
        let anchorLink = anchor.anchorLink
        let videoUrl = anchorLink + '/video'
        await this.page.goto(videoUrl, { waitUntil: 'domcontentloaded' })
        this.Log.info(`page navigation to ${videoUrl}`)
        await this.page.waitFor(5000)
        let pageNums = await this.page.$eval('#submit-video-list > ul.be-pager > span.be-pager-total', (i) => {
            let pageNums = parseInt(i.textContent.replace('共', '').replace('页', '').trim())
            return pageNums
        })

        // console.log('pageNums'+pageNums)
        this.j = 0
        await this.parsePage(pageNums, anchorId)
        // console.log(this.i)
        // console.log(anchorLinks.length)
        if (this.i >= anchorLinks.length - 1) {
            return
        }
        this.i++
        return await this.parseAnchorLinks(anchorLinks)
    }
    j: number = 0
    async parsePage(pageNums, anchorId) {

        let videoItems:any = await retry(async ()=>{
            return  await this.page.$$eval('#submit-video-list > ul.clearfix.cube-list > li', (items) => items.map((item) => {
                let videoLink = item.querySelector('a').href
                let videoTitle = item.querySelector('a.title').textContent
                let play = item.querySelector('div > span.play').textContent
                let time = item.querySelector('div > span.time').textContent
                return {
                    videoLink: videoLink,
                    videoTitle: videoTitle,
                    play: (play.replace('\n', '')).trim(),
                    time: time.replace('\n', '').trim()
                }
            }))
        },2,100)
        this.Log.info(videoItems)
        // this.crewlerTransform.write(`channel include: \n ${util.inspect(videoItems, { colors: true })}`)
        this.k = 0
        await this.parseItem(videoItems, anchorId)
        await this.page.waitFor(5000)
        if (this.j < pageNums - 2) {// 最后一次不点击切换页面 例如：9页，只需要点8次
            await this.page.click('#submit-video-list > ul.be-pager > li.be-pager-next')
        }
        if (this.j >= pageNums - 1) {
            return
        }
        this.j++
        return this.parsePage(pageNums, anchorId)

    }

    k: number = 0
    async parseItem(videoItems: any, anchorId: any) {//用递归实现同步，因为for循环异步了
        let item = videoItems[this.k]

        let time = item.time
        let createTime = StringUtil.timeFormat(time)

        let videoInfo = await SpaceService.saveSpaceVideInfo(anchorId, item.videoLink, item.videoTitle, createTime)
        let videoId = videoInfo.id
        let play = StringUtil.unitConvertToInt(item.play)
        await SpaceService.saveSpaceVideHotInfo(anchorId, videoId, play)

        if (this.k >= videoItems.length - 1) {
            return
        }
        this.k++
        return this.parseItem(videoItems, anchorId)
    }

    storeData(...args: any) {

    }

}