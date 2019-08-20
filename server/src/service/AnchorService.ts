import { getConnection } from "typeorm";
import { AnchorRepository } from '../repositpry/AnchorRepository'
import { AnchorFansWeekStatisticsRepositpry } from '../repositpry/AnchorFansWeekStatisticsRepositpry'
import { SpaceVideoInfoRepository } from '../repositpry/SpaceVideoInfoRepository'
import { SpaceVideoWeekHotInfo } from "../entity/SpaceVideoWeekHotInfo";

export class AnchorService {

    /**
     * 获得所有已经记录的主播信息 列表Total页数
     * @param pageSize 
     */
    static async getTotalPagesNum(pageSize: number) {
        const connection = await getConnection()
        let anchorRepository = connection.getCustomRepository(AnchorRepository)
        let count = await anchorRepository.getRows()
        let pageIndex: number
        if (count > pageSize) {
            pageIndex = Math.ceil(count / pageSize)//向上取整
        } else {
            pageIndex = 1
        }
        return pageIndex
    }
    /**
     * 获得单页的主播 列表
     * @param pageSize 
     * @param pageIndex 
     */
    static async getLimitAnchorByPageIndex(pageSize: number, pageIndex: number) {
        const connection = await getConnection()
        let anchorRepository = connection.getCustomRepository(AnchorRepository)
        let anchors = await anchorRepository.getByPageAnchor(pageSize, pageIndex)
        return anchors
    }

    /**
     * 非时许数据，当下链表查询，主播最新信息，主播fans（最新的）
     */
    static async getSpaceVideoInfoAndHotInfo() {
        const connection = await getConnection()
        let spaceVideoInfoRepository = connection.getCustomRepository(SpaceVideoInfoRepository)
        let spaceVideoWeekHotInfo = connection.getRepository(SpaceVideoWeekHotInfo)
    }
/**列表 |主播名称| 主播的空间地址 | （性别|预估年龄段）-人工编辑 |主播粉丝信息（播放数/粉丝关注数/关注其它人数量）|-> 点击进入查看详情（主播fans的时序变更记录） */
/**注意空处理 */
    /**
     * 获得当前用户的 粉丝统计 时序动态数据 多日来fans的变化
     */
    static async getAnchorFansWeekStatisticsById(anchorId:number) {
        const connection = await getConnection()
        let anchorRepository = connection.getCustomRepository(AnchorFansWeekStatisticsRepositpry)
        return await anchorRepository.getByAnthorId(anchorId)
    }

  

}