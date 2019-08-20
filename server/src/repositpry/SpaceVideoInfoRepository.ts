import { Repository, Entity, EntityRepository } from "typeorm";
import { SpaceVideoInfo } from "../entity/SpaceVideoInfo";


@EntityRepository(SpaceVideoInfo)
export class SpaceVideoInfoRepository extends Repository<SpaceVideoInfo>{
    
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