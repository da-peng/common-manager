import { Repository, Entity, EntityRepository } from "typeorm";
import { SpaceChannelStatistics } from "../entity/SpaceChannelStatistics";

@EntityRepository(SpaceChannelStatistics)
export class SpaceChannelRepository extends Repository<SpaceChannelStatistics>{

  

    getChannelById(anchorId:number){
        return  this.createQueryBuilder('spaceChannel')
        .where(`spaceChannel.anchorId = :anchorId`, { 'anchorId': anchorId})
        .getMany()
    }

    getChannelByIdAndChannel(anchorId:number,channelName:string){
        return  this.createQueryBuilder('spaceChannel')
        .where(`spaceChannel.anchorId = :anchorId And spaceChannel.channelName =:channelName`, {'anchorId': anchorId,'channelName':channelName})
        .getOne()
    }

}