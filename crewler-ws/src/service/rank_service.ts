import {AnchorRepository} from '../repositpry/AnchorRepository'
import {AnchorDailyRankRepository} from '../repositpry/AnchorDailyRankRepository'
import {TagsCollectRepository} from '../repositpry/TagsCollectRepository'
import { Connection, getConnection } from 'typeorm';
import {VideoService} from './video_service'
import { RankItemInfo } from '../interface/RankInfo';
import { IVideoHotInfo } from '../interface/VideoHotInfo';

export class RankService{

    static async saveAnchorDailyRanking(rankItemInfo:RankItemInfo){
        const connection: Connection = await getConnection();
        let anchorRepository= connection.getCustomRepository(AnchorRepository)
        let anchorDailyRankRepository = connection.getCustomRepository(AnchorDailyRankRepository)
        let tagsCollectRepository= connection.getCustomRepository(TagsCollectRepository)
        /**createAndSave 存在返回已有的，不存在则创建返回新的 */
        

        /**IO密集型 */
        /**保存更/新用户信息 唯一*/
        const anchor = await anchorRepository.createAndSave(rankItemInfo.nickname, rankItemInfo.authorLink)

        const detail =rankItemInfo.detail
        /**保存更新主播视频基本信息，唯一 */
        const videoInfo = await VideoService.saveVideoInfo(anchor.id, detail.tags,detail.videoLink,detail.title,detail.videoCreateTime)

        let videoHotInfo:IVideoHotInfo={
            anchorId : anchor.id,
            danMuNum :detail.danmu,
            like : detail.like,
            play : detail.play,
            pts : detail.pts,
            totalCoins : detail.coin,
            videoId : videoInfo.id,
            view : detail.view
        }

        /**保存更新主播视频热度信息 不唯一（时间性） */
        await VideoService.saveVideoHotInfo(videoHotInfo)
        /**保存用户排行榜信息 不唯一（时间性） */
        await anchorDailyRankRepository.createAndSave(anchor.id, rankItemInfo.num,videoInfo.id)
        /**保存tag */
        let tags = detail.tags.split(',')

        for (let index = 0; index < tags.length; index++) {
            const tag = tags[index];
            await tagsCollectRepository.createAndSave(anchor.id,tag,videoInfo.id)
        }
    }

}