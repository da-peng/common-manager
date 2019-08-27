import { AbstractBaseCrewler } from "./AbstractBaseCrewler";
import { SpaceService } from '../service/space_service'
import { StringUtil } from '../utils/string_utils'
import * as util from 'util'
import {retry} from '../utils/crewler_utils'
/**
 * 主播关注数，粉丝数，播放数周统计(上到排行榜的主播)
 */

export class AnchorFansWeekCrewler extends AbstractBaseCrewler {

    /**
     * 
     * @param isHeadless 是否是无头模式
     * @param crewlerTransform 记录执行过程
     * @param args 其它参数
     */
    init(isHeadless: boolean, crewlerTransform: any, ...args: any) {
        super.runWithOutUrl(isHeadless, crewlerTransform, ...args)
    }

    async  parse(...args: any) {
        /**从数据库中分页拿到主播的空间地址*/
        let pageSize = 10
        let pageIndex = await SpaceService.getTablePageNumber(pageSize)
        for (let i = 0; i < pageIndex; i++) {
            let anchorLinks = await SpaceService.getLimitAnchorLinks(pageSize, i)
            this.j = 0
            await this.parseFans(anchorLinks)
        }
    }
    j: number = 0
    async parseFans(anchorLinks) {
        let anchor = anchorLinks[this.j]
        let anchorId = anchor.id
        let anchorLink = anchor.anchorLink
        await this.page.goto(anchorLink, { waitUntil: 'domcontentloaded' })
        this.Log.info(`page navigation to ${anchorLink}`)
        await this.page.waitFor(5000)

        let statistics:any = await retry(async ()=>{
            return await this.page.$eval('#navigator > div > div.n-inner.clearfix > div.n-statistics', (i) => {
                let followOther = i.querySelector('#n-gz').textContent
                let fansFollow = i.querySelector('#n-fs').textContent
                let totalPlay = i.querySelector('#n-bf').textContent
                return {
                    followOther: followOther,
                    fansFollow: fansFollow,
                    totalPlay: totalPlay
                }
            })
        },3,100)
        this.Log.info(statistics)
        // this.crewlerTransform.write(`anchor fans statistics:\n ${util.inspect(statistics, { colors: true })}`)

        let followOther = parseInt(statistics.followOther)
        let fansFollow = StringUtil.unitConvertToInt(statistics.fansFollow)
        let totalPlay = StringUtil.unitConvertToInt(statistics.totalPlay)
        /**
         * 实现up主粉丝，播放，follow的信息
         */
        await SpaceService.saveAnchorFansWeekStatistics(anchorId, followOther, fansFollow, totalPlay)
        if (this.j >= anchorLinks.length - 1) {
            return
        }
        this.j++
        return await this.parseFans(anchorLinks)
    }

    storeData(...args: any) {

    }

}