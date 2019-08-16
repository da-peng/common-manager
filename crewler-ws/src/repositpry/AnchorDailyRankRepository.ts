import {EntityRepository, Repository} from "typeorm";
import {AnchorDailyRank} from "../entity/AnchorDailyRank";

@EntityRepository(AnchorDailyRank)
export class AnchorDailyRankRepository extends Repository<AnchorDailyRank> {

    /**允许重复，排行榜随时间变化，支持多行*/
    async createAndSave(anchorId: number, ranking:number,videoId:number) {

        const anchorDailyRank = new AnchorDailyRank();
        anchorDailyRank.anchorId = anchorId;
        anchorDailyRank.ranking =ranking;/**最后要拿出ranking排名随时间的变化 */
        anchorDailyRank.videoId = videoId;/** 允许videoId重复 */
        return this.manager.save(anchorDailyRank);
    }

}