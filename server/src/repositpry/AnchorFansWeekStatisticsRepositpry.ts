import {EntityRepository, Repository} from "typeorm";
import {AnchorFansWeekStatistics} from "../entity/AnchorFansWeekStatistics";

@EntityRepository(AnchorFansWeekStatistics)
export class AnchorFansWeekStatisticsRepositpry extends Repository<AnchorFansWeekStatistics> {
    /**
     * 依据关注时间去重
     * @param anchorId 
     */
    getByAnthorId(anchorId:number){
        return this.createQueryBuilder('fans')
            .where(`fans.id= :anchorId`, { 'anchorId': anchorId })
            .getMany()
    }

}