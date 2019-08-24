import { getConnection } from "typeorm";
import { AnchorRepository } from '../repositpry/AnchorRepository'
import { AnchorFansWeekStatisticsRepositpry } from '../repositpry/AnchorFansWeekStatisticsRepositpry'
import { Message } from '../utils/message'
import { Anchor } from "../entity/Anchor";
import { AnchorFansWeekStatistics } from "../entity/AnchorFansWeekStatistics";

export class AnchorService {



      /**
     * 更新主播信息（只限年龄，性别）{ uid:,anchorId:,sex:,ageGroup:,}
     */
    static async updateAnchorUserInfoByLink(anchorLink:string,sex:string,ageGroup:string){
        const connection = await getConnection()
        let anchorRepository = connection.getCustomRepository(AnchorRepository)
        const ret = await anchorRepository.createQueryBuilder().update(Anchor)
                                .set({ sex:sex,ageGroup:ageGroup })
                                .where("anchorLink = :anchorLink", { anchorLink: anchorLink })
                                .execute();
        console.log(ret)
        return {success:ret!! , ...!!ret ? Message.get('requestOk'): Message.get('authorIsNotExist'),data:ret}
    }


    /**
     * 更新主播信息（只限年龄，性别）{ uid:,anchorId:,sex:,ageGroup:,}
     */
    static async updateAnchorUserInfo(anchorId:number,sex:string,ageGroup:string){
        const connection = await getConnection()
        let anchorRepository = connection.getCustomRepository(AnchorRepository)
        const ret = await anchorRepository.createQueryBuilder().update(Anchor)
                                .set({ sex:sex,ageGroup:ageGroup })
                                .where("id = :id", { id: anchorId })
                                .execute();
        console.log(ret)
        return {success:ret!! , ...!!ret ? Message.get('requestOk'): Message.get('authorIsNotExist'),data:ret}
    }

    /**
     * 获得单页的主播 列表,列表Total页数
     * @param pageSize 
     * @param pageIndex 
     */
    static async getLimitAnchorByPageIndex(pageSize: number, pageIndex: number) {
        const connection = await getConnection()
        let anchorRepository = connection.getCustomRepository(AnchorRepository)
        let anchors = await anchorRepository.getByPageAnchor(pageSize, pageIndex)
        let count = await anchorRepository.getRows()

        let pageCount: number
        if (count > pageSize) {
            pageCount = Math.ceil(count / pageSize)//向上取整
        } else {
            pageCount = 1
        }

        return {
            anchors:anchors,
            pageIndex:pageCount
        }

    }

    /**
     * getfansOrderByFollow
     * @param pageSize 
     * @param pageIndex 
     */
    static async getfansOrderByFollow(pageSize:number,pageIndex:number){
        const connection = await getConnection()
        let anchorFansWeekStatisticsRepositpry = connection.getCustomRepository(AnchorFansWeekStatisticsRepositpry)
        let anchorRepository = connection.getCustomRepository(AnchorRepository)
        let fans = await anchorFansWeekStatisticsRepositpry.getFansOrderByFollow(pageIndex==0?pageIndex:pageIndex-1,pageSize)
        let count = await anchorFansWeekStatisticsRepositpry.getFansOrderByFollowCount()
        // let pageTotal:number
        // if (count > pageSize) {
        //     pageTotal = Math.ceil(count / pageSize)//向上取整
        // } else {
        //     pageTotal = 1
        // }
        let ret = []
        for (let index = 0; index < fans.length; index++) {
            const fan =  fans[index]
            let anchor = await anchorRepository.getByanchorId(fan.anchorId)

            delete anchor['id']
            delete anchor['createDate']
            delete anchor['updateDate']
            ret.push({
                ...anchor,
                ...fan
            })
        }
        return {success:ret!! , ...!!ret ? Message.get('requestOk'): Message.get('dataNull'),page:pageIndex,total:count,data:ret}
    }

    /**
     * 非时许数据，当下链表查询，主播最新信息，主播fans（最新的）
     */
    static async getAnchorsListInfo(pageSize:number,pageIndex:number) {

        const connection = await getConnection()
        let anchorFansWeekStatisticsRepositpry = connection.getCustomRepository(AnchorFansWeekStatisticsRepositpry)
        
        let anchorRepository = connection.getCustomRepository(AnchorRepository)
        let count = await anchorRepository.getRows()
        
        let pageCount: number
        if (count > pageSize) {
            pageCount = Math.ceil(count / pageSize)//向上取整
        } else {
            pageCount = 1
        }
        // console.log(count,pageSize,pageIndex,pageCount)
        let anchors = await anchorRepository.getByPageAnchor(pageSize, pageIndex==0?pageIndex:pageIndex-1)
        // console.log(anchors)
        let ret = []
        for (let index = 0; index < anchors.length; index++) {
            const anchor = anchors[index];
            let fans= await anchorFansWeekStatisticsRepositpry.getFansByAnthorId(anchor.id)
            delete anchor['createDate']
            delete anchor['updateDate']
            ret.push({
                ...anchor,
                ...fans
            })
        }
        // console.log(ret)
        return {success:ret!! , ...!!ret ? Message.get('requestOk'): Message.get('dataNull'),data:ret}
    }

    /**列表 |主播名称| 主播的空间地址 | （性别|预估年龄段）-人工编辑 |主播粉丝信息（播放数/粉丝关注数/关注其它人数量）|-> 点击进入查看详情（主播fans的时序变更记录） */
    /**注意空处理 */
    /**
     * 获得当前用户的 粉丝统计 时序动态数据 多日来fans的变化
     */
    static async getAnchorFansWeekStatisticsById(anchorLink:string,startDate:Date,endDate:Date) {

        const connection = await getConnection()
        const anchorRepository = connection.getCustomRepository(AnchorRepository)
        const anchorFansWeekStatisticsRepositpry = connection.getCustomRepository(AnchorFansWeekStatisticsRepositpry)
        const anchor = await anchorRepository.getByanchorLink(anchorLink)
        const anchorId = anchor.id
        let fans = await anchorFansWeekStatisticsRepositpry.getDynamicFansByAnthorId(anchorId,startDate,endDate)
        console.log(fans)
        return {success:fans!! , ...!!fans ? Message.get('requestOk'): Message.get('dataNull'),data:fans}
    }

    /**
     * 主播视频上榜信息
     */


}