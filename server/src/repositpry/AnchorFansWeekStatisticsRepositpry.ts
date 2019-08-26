import {EntityRepository, Repository} from "typeorm";
import {AnchorFansWeekStatistics} from "../entity/AnchorFansWeekStatistics";

@EntityRepository(AnchorFansWeekStatistics)
export class AnchorFansWeekStatisticsRepositpry extends Repository<AnchorFansWeekStatistics> {
    /**
     * 
     * @param anchorId 
     */
    getFansByAnthorId(anchorId:number){
        return this.createQueryBuilder('fans')
            .select('fans.fansFollow,fans.totalPlay,fans.updateDate')
            .where(`fans.anchorId= :anchorId`, { 'anchorId': anchorId })
            .orderBy("fans.createDate", "DESC")
            .getRawOne()
    }

    getFansOrderByFollow(pageIndex:number,pageSize:number){
        return this.createQueryBuilder('fans')
        .select("fans.anchorId, MAX(fans.totalPlay) as totalPlay, MAX(fans.fansFollow) as fansFollow")
        .groupBy('fans.anchorId')
        .orderBy("fansFollow",'DESC')
        .limit(pageSize)
        .offset(pageIndex * pageSize)
        .getRawMany()
    }

    getFansOrderByFollowCount(){
        return this.createQueryBuilder('fans')
        .select("fans.anchorId, MAX(fans.totalPlay) as totalPlay, MAX(fans.fansFollow) as fansFollow")
        .groupBy('fans.anchorId')
        .orderBy("fansFollow",'DESC')
        .getRawMany()
    }


    /**
     * 
     * @param anchorId 
     */
    getDynamicFansByAnthorId(anchorId:number,startDate:Date,endDate:Date){
        console.log(anchorId,startDate,endDate)
        return this.createQueryBuilder('fans')
        .select('fans.fansFollow,fans.totalPlay,fans.createDate')
        .where(`fans.anchorId = :anchorId`, { 'anchorId': anchorId })
        .andWhere(`fans.createDate >= :startDate AND fans.createDate <= :endDate`,{'startDate':startDate,'endDate':endDate})
        .orderBy("fans.createDate", "ASC")
        .getRawMany()
    }

}