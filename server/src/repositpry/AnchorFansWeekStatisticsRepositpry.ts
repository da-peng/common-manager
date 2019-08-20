import {EntityRepository, Repository} from "typeorm";
import {AnchorFansWeekStatistics} from "../entity/AnchorFansWeekStatistics";

@EntityRepository(AnchorFansWeekStatistics)
export class AnchorFansWeekStatisticsRepositpry extends Repository<AnchorFansWeekStatistics> {

    /**允许重复，粉丝关注数随时间变化，每周统计*/
    async createAndSave(anchorId: number, followOther:number,fansFollow:number,totalPlay:number) {

        const anchorFansWeekStatistics = new AnchorFansWeekStatistics();
        anchorFansWeekStatistics.authorId= anchorId
        anchorFansWeekStatistics.followOther = followOther
        anchorFansWeekStatistics.fansFollow = fansFollow
        anchorFansWeekStatistics.totalPlay = totalPlay
        return this.manager.save(anchorFansWeekStatistics);
    }

}