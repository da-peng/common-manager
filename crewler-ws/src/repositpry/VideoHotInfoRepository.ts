import {EntityRepository, Repository} from "typeorm";
import {RankVideoWeekHotInfo} from "../entity/RankVideoWeekHotInfo";
import {IVideoHotInfo} from '../interface/VideoHotInfo'

@EntityRepository(RankVideoWeekHotInfo)
export class VideoHotInfoRepository extends Repository<RankVideoWeekHotInfo> {

    /**视频的热度信息是随时间变化的，这种允许重复 支持多行*/
    async createAndSave(videoHot:IVideoHotInfo) {
        
        let videoHotInfo = await this.getByVideoId(videoHot.videoId)
        if (!!videoHotInfo){
          let  currentDate =   await this.getFormatDate(new Date())
          let  updateDate =  await this.getFormatDate(videoHotInfo.updateDate)
          if (currentDate===updateDate){
              return videoHotInfo
          }
        }
        videoHotInfo = new RankVideoWeekHotInfo();
        videoHotInfo.anchorId = videoHot.anchorId;
        videoHotInfo.danMuNum = videoHot.danMuNum;
        videoHotInfo.videoId = videoHot.videoId;
        videoHotInfo.like = videoHot.like;
        videoHotInfo.play = videoHot.play
        videoHotInfo.pts =videoHot.pts
        videoHotInfo.totalCoins=videoHot.totalCoins
        videoHotInfo.view = videoHot.view
        return this.manager.save(videoHotInfo)
    }

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