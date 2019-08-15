
import { AbstractBaseCrewler } from './AbstractBaseCrewler'
import { VideoDetail, RankItemInfo } from '../interface/RankInfo';
import { StringUtil } from '../utils/string_utils'
import { RankService } from '../service/rank_service'
const unitConvertToInt = StringUtil.unitConvertToInt
/**
 * 排行榜的爬虫
 */
export class RankCrewler extends AbstractBaseCrewler {


    init(isHeadless: boolean, ...args: any) {
        super.run(isHeadless, ...args)
    }

    url = 'https://www.bilibili.com/ranking'
    /**切换url实现不同分类的爬取 */
    rankInfo: any

    async parse(...args: any) {
        const list = '#app > div.b-page-body > div > div.rank-container > div.rank-body > div.rank-list-wrap > ul > li'

        this.rankInfo = await this.page.$$eval(list,
            items => {
                return items.map((i) => {

                    let num: any = i.querySelector('div.num').textContent
                    let detail = i.querySelector('div.info > div.detail')
                    let videoLink = i.querySelector('div.info').querySelector('a').href
                    let title = i.querySelector('div.info').querySelector('a').textContent
                    let pts: any = i.querySelector('div.info > div.pts').textContent.replace('/\n', '').trim()
                    let play: any = detail.querySelector('span:nth-child(1)').textContent
                    let view: any = detail.querySelector('span:nth-child(2)').textContent
                    let nickname = detail.querySelector('a > span').textContent
                    let authorLink = detail.querySelector('a').href

                    return {
                        nickname: nickname,
                        num: num,
                        authorLink: authorLink,
                        detail: {
                            title: title,
                            videoLink: videoLink,
                            play: play,
                            view: view,
                            pts: pts.replace('综合得分', ''),
                        }
                    }
                })
            }
        )

        /**
         * 解析视频页,补充视频信息
         */
        for (let index = 0; index < this.rankInfo.length; index++) {
            let item = this.rankInfo[index];
            let videoLink = item.detail.videoLink
            try {
                await this.page.goto(videoLink)
            } catch (e) {
                await this.config(true)
                await this.page.goto(videoLink)
            }
            const danmu = '#viewbox_report > div:nth-child(3) > span.dm'
            const ops = '#arc_toolbar_report > div.ops'
            const createTime = '#viewbox_report > div:nth-child(2) > span:nth-child(2)'

            let danmuCount: string = '', like: string = '', coin: string = '', collect: string = '', videoCreateTime: Date
            await this.page.waitFor(2000)

            let count = 0
            while (like == '' || like == '--' || danmuCount == '--弹幕') {
                await this.page.waitFor(1000)
                videoCreateTime = new Date((await (await (await this.page.$(createTime)).getProperty('innerText')).jsonValue()).toString())

                danmuCount = (await (await (await this.page.$(danmu)).getProperty('innerText')).jsonValue()).toString()
                like = (await (await (await this.page.$(ops + '> span.like')).getProperty('innerText')).jsonValue()).toString()
                coin = (await (await (await this.page.$(ops + '> span.coin')).getProperty('innerText')).jsonValue()).toString()
                collect = (await (await (await this.page.$(ops + '> span.collect')).getProperty('innerText')).jsonValue()).toString()
                if (count >= 10) {
                    throw '循环等待次数超过10次'
                }
                count++
            }
            const tag = '#v_tag > ul > li'
            let tags = await this.page.$$eval(tag, items => items.map((i) => {
                return i.querySelector('a').textContent
            }))
            /**
             * save tags
             */

            // await this.page.$eval(ops, async (ops) => {
            //     like = ops.querySelector('span.like').textContent
            //     coin = ops.querySelector('span.coin').textContent
            //     collect = ops.querySelector('span.collect').textContent
            // })
            /**把需要转化为int的进行转化 */
            item.num = unitConvertToInt(item.num)

            item.detail.play = unitConvertToInt(item.detail.play)
            item.detail.view = unitConvertToInt(item.detail.view)
            item.detail.pts = unitConvertToInt(item.detail.pts)

            let detail: VideoDetail = item.detail
            detail.videoCreateTime = videoCreateTime
            detail.like = unitConvertToInt(like)
            detail.coin = unitConvertToInt(coin)
            detail.collect = unitConvertToInt(collect)
            detail.danmu = unitConvertToInt(danmuCount.replace('弹幕', ''))
            detail.tags = tags.join(',')

            console.log(item)
            let rankItem: RankItemInfo = item

            RankService.saveAnchorDailyRanking(rankItem)

        }

    }



    async storeData(...args: any) {

        // throw new Error("Method not implemented.");

    }


}