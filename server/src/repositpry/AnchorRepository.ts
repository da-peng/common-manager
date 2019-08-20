import { EntityRepository, Repository } from "typeorm";
import { Anchor } from "../entity/Anchor";

@EntityRepository(Anchor)
export class AnchorRepository extends Repository<Anchor> {

   

    getByNickNameAndAnchorLink(nickName: string, anchorLink: string): Promise<Anchor> {
        return this.createQueryBuilder('anchor')
            .where(`anchor.nickName = :nickName OR anchor.anchorLink= :anchorLink`, { 'nickName': nickName, 'anchorLink': anchorLink })
            .getOne();
    }

    getByanchorLink(anchorLink: string): Promise<Anchor> {
        return this.createQueryBuilder('anchor')
            .where(`anchor.authorLink= :anchorLink`, { 'anchorLink': anchorLink })
            .getOne();
    }



    getByanchorId(anchorId: number) {
        return this.createQueryBuilder('anchor')
            .where(`anchor.id = :anchorId`, { 'anchorId': anchorId })
            .getOne();
    }
    /**
     * 查询出所有anchorLinks
     * @param pageSize 
     * @param pageIndex 
     */
    getByPageAnchor(pageSize: number, pageIndex: number) {
        return this.createQueryBuilder('anchor')
            .select('*')
            .limit(pageSize)
            .offset(pageIndex * pageSize)
            .getRawMany()
    }
    /**
     * 查询表的记录数
     */
    getRows() {
        return this.createQueryBuilder('anchor').getCount()
    }
}