import {EntityRepository, Repository} from "typeorm";
import {VideoInfo} from "../entity/VideoInfo";

@EntityRepository(VideoInfo)
export class VideoInfoRepository extends Repository<VideoInfo> {

    async createAndSave(anchorId: number, tags:string,videoLink:string,videoTitle:string,videoCreateDate:Date) {
        const videoInfo = new VideoInfo();
        videoInfo.anchorId = anchorId;
        videoInfo.tags = tags;
        videoInfo.videoLink = videoLink;
        videoInfo.videoTitle = videoTitle
        videoInfo.videoCreateDate=videoCreateDate

        const isExist = await this.getByVideoLinkAndAnchorId(anchorId,videoLink)
        if(isExist!!){
                return isExist
        }else{
            return this.manager.save(videoInfo);/**插入新的 */
        }
    }

    getByVideoLinkAndAnchorId(anchorId: number,videoLink:string){
        return  this.createQueryBuilder('videoInfo')
        .where(`videoInfo.anchorId = :anchorId And videoInfo.videoLink= :videoLink`, { 'anchorId': anchorId, 'videoLink':videoLink})
        .getOne();
    }

    getByVideoLink(videoLink:string){
        return  this.createQueryBuilder('videoInfo')
        .where(`videoInfo.videoLink= :videoLink`, {'videoLink':videoLink})
        .getOne();
    }


}