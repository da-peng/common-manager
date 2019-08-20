import {EntityRepository, Repository} from "typeorm";
import {RankVideoInfo} from "../entity/RankVideoInfo";

@EntityRepository(RankVideoInfo)
export class VideoInfoRepository extends Repository<RankVideoInfo> {

    
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