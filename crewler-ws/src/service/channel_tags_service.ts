import {SpaceChannelStatistics} from '../entity/SpaceChannelStatistics'
import {SpaceVideoTags} from '../entity/SpaceVideoTags'
import { getConnection } from 'typeorm';
export class ChannelAndTagsService{

    static async saveChannel(anchorId:number,channelName:string,videoNum:number,createTime:Date){
        let connection = await getConnection()
        let repository = await connection.getRepository(SpaceChannelStatistics)
        let spaceChannelStatistics=  new SpaceChannelStatistics()
        spaceChannelStatistics.anchorId = anchorId
        spaceChannelStatistics.channelName = channelName
        spaceChannelStatistics.videoNumber = videoNum
        spaceChannelStatistics.channelCreateDate = createTime
        await repository.save(spaceChannelStatistics)
    }

    static async saveTags(anchorId:number,tagName:string,videoNum:number){
        let connection = await getConnection()
        let repository = await connection.getRepository(SpaceVideoTags)
        let spaceVideoTags=  new SpaceVideoTags()
        spaceVideoTags.anchorId = anchorId
        spaceVideoTags.tagName = tagName
        spaceVideoTags.videoNum = videoNum
        await repository.save(spaceVideoTags)
    }
}