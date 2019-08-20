import { EntityRepository, Repository } from "typeorm";
import { CustomTagsCollect } from "../entity/CustomTagsCollect";

@EntityRepository(CustomTagsCollect)
export class TagsCollectRepository extends Repository<CustomTagsCollect> {

 

    async  getByTags(tag: string): Promise<CustomTagsCollect> {
        return this.createQueryBuilder('tagsCollect')
            .where(`tagsCollect.tag = :tag`, { 'tag': tag })
            .getOne();
    }

}