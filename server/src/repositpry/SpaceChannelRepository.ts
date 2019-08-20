import { Repository, Entity, EntityRepository } from "typeorm";
import { SpaceChannelStatistics } from "../entity/SpaceChannelStatistics";

@EntityRepository(SpaceChannelStatistics)
export class SpaceChannelRepository extends Repository<SpaceChannelStatistics>{

    async createAndSave(channelName:string,videoNumber:number,anchorId:number){
        let spaceChannel = await this.getChannelByIdAndChannel(anchorId,channelName)
        if(spaceChannel){
            return spaceChannel
        }else{
            let spaceChannel = new SpaceChannelStatistics()
            spaceChannel.anchorId = anchorId
            spaceChannel.channelName = channelName
            spaceChannel.videoNumber = videoNumber
            return this.manager.save(spaceChannel)
        }
    }

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