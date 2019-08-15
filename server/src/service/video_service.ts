import { Connection, getConnection } from 'typeorm';
import  {VideoInfoRepository} from '../repositpry/VideoInfoRepository'
import { VideoHotInfoRepository } from '../repositpry/VideoHotInfoRepository';
import {IVideoHotInfo} from '../interface/VideoHotInfo'
export class VideoService{

    /**保存更新主播视频基本信息，唯一 */
    static async saveVideoInfo(anchorId: number, tags:string,videoLink:string,videoTitle:string,videoCreateDate:Date){
        const connection: Connection = await getConnection();
        let videoInfoRepository= connection.getCustomRepository(VideoInfoRepository)
        const videoInfo = await videoInfoRepository.createAndSave(anchorId, tags,videoLink,videoTitle,videoCreateDate)
        return videoInfo           
    }


    /**保存更新主播视频热度信息 不唯一（时间性） */
    static async saveVideoHotInfo(videoHotInfo:IVideoHotInfo){
        const connection: Connection = await getConnection();
        let videoHotInfoRepository= connection.getCustomRepository(VideoHotInfoRepository)
        const videoInfo = await videoHotInfoRepository.createAndSave(videoHotInfo)
        return videoInfo           
    }

    /**保存更新tag 唯一（时间性） */
    static async saveVideoTag(tag:string){
 
        return 
    }




}