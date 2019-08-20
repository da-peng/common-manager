import { Repository, Entity, EntityRepository } from "typeorm";
import { SpaceVideoInfo } from "../entity/SpaceVideoInfo";


@EntityRepository(SpaceVideoInfo)
export class SpaceVideoInfoRepository extends Repository<SpaceVideoInfo>{
    async createAndSave(anchorId: number,videoLink:string,videoTitle:string,videoCreateDate:Date) {
        const videoInfo = new SpaceVideoInfo();
        videoInfo.anchorId = anchorId;
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