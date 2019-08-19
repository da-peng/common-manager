import { getConnection } from "typeorm";
import { AnchorRepository } from '../repositpry/AnchorRepository'
import { AnchorFansWeekStatisticsRepositpry } from '../repositpry/AnchorFansWeekStatisticsRepositpry'
import { SpaceVideoInfoRepository } from '../repositpry/SpaceVideoInfoRepository'
import { SpaceVideoWeekHotInfo } from "../entity/SpaceVideoWeekHotInfo";

export class SpaceService {

    static async getTablePageNumber(pageSize: number) {
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

    static async getLimitAnthorLinks(pageSize: number, pageIndex: number) {
        const connection = await getConnection()
        let anchorRepository = connection.getCustomRepository(AnchorRepository)
        let count = await anchorRepository.getRows()
        let anchor = await anchorRepository.getByAuchorLinks(pageSize, pageIndex)
        return anchor
    }

    static async saveAnchorFansWeekStatistics(anchorId: number, followOther: number, fansFollow: number, totalPlay: number) {
        const connection = await getConnection()
        let anchorRepository = connection.getCustomRepository(AnchorFansWeekStatisticsRepositpry)
        anchorRepository.createAndSave(anchorId, followOther, fansFollow, totalPlay)
    }

    static async saveSpaceVideInfo(anchorId: number, videoLink: string, videoTitle: string, videoCreateTime: Date) {
        const connection = await getConnection()
        let spaceVideoInfoRepository = connection.getCustomRepository(SpaceVideoInfoRepository)

        return spaceVideoInfoRepository.createAndSave(anchorId, videoLink, videoTitle, videoCreateTime)
    }

    static async saveSpaceVideHotInfo(anchorId: number, videoId: number, play: number) {
        const connection = await getConnection()
        let spaceVideoInfoRepository = connection.getRepository(SpaceVideoWeekHotInfo)
        let spaceVideoWeekHotInfo = new SpaceVideoWeekHotInfo()
        spaceVideoWeekHotInfo.anchorId = anchorId
        spaceVideoWeekHotInfo.videoId = videoId
        spaceVideoWeekHotInfo.play = play
        return spaceVideoInfoRepository.save(spaceVideoWeekHotInfo)
    }
}