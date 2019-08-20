import {EntityRepository, Repository} from "typeorm";
import {RankVideoWeekHotInfo} from "../entity/RankVideoWeekHotInfo";
import {IVideoHotInfo} from '../interface/VideoHotInfo'

@EntityRepository(RankVideoWeekHotInfo)
export class VideoHotInfoRepository extends Repository<RankVideoWeekHotInfo> {

   

    async getFormatDate(date:Date) {
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        let m:string,d:string
        if (month >= 1 && month <= 9) {
            m = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            d = "0" + strDate;
        }
        var currentdate = year + seperator1 + m + seperator1 + d;
        return currentdate;
    }

    getByVideoId(videoId:number){
        return  this.createQueryBuilder('videoHotInfo')
        .where(`videoHotInfo.videoId = :videoId`, { 'videoId': videoId})
        .getOne();
    }

}