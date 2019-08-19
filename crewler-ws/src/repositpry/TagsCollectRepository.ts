import { EntityRepository, Repository } from "typeorm";
import { CustomTagsCollect } from "../entity/CustomTagsCollect";

@EntityRepository(CustomTagsCollect)
export class TagsCollectRepository extends Repository<CustomTagsCollect> {

    /**允许重复，排行榜随时间变化，支持多行*/
    async createAndSave(authorId: number, tag: string,videoId:number) {
        const tags = await this.getByTags(tag)
        const tagsCollect = new CustomTagsCollect();
        tagsCollect.authorId = authorId
        tagsCollect.tag = tag
        if (tags!!) {
            if(tags.videoId===videoId){
                return tags
            }
        }
        tagsCollect.videoId = videoId
        return this.manager.save(tagsCollect);
    }


    async  getByTags(tag: string): Promise<CustomTagsCollect> {
        return this.createQueryBuilder('tagsCollect')
            .where(`tagsCollect.tag = :tag`, { 'tag': tag })
            .getOne();
    }

}