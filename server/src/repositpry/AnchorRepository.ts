import { EntityRepository, Repository } from "typeorm";
import { Anchor } from "../entity/Anchor";
import { AnchorFansWeekStatistics } from "../entity/AnchorFansWeekStatistics";

@EntityRepository(Anchor)
export class AnchorRepository extends Repository<Anchor> {

   

    getByNickNameAndAnchorLink(nickName: string, anchorLink: string): Promise<Anchor> {
        return this.createQueryBuilder('anchor')
            .where(`anchor.nickName = :nickName OR anchor.anchorLink= :anchorLink`, { 'nickName': nickName, 'anchorLink': anchorLink })
            .getOne();
    }

    getByanchorLink(anchorLink: string): Promise<Anchor> {
        return this.createQueryBuilder('anchor')
            .where(`anchor.anchorLink= :anchorLink`, { 'anchorLink': anchorLink })
            .getOne();
    }

    getAnchorFans(anchorId:number) {
            return this.createQueryBuilder('anchor')
            .leftJoinAndMapOne('anchor.fans',AnchorFansWeekStatistics,'fans','fans.anchorId=anchor.id')
            .where(`anchor.id =:anchorId`,{'anchorId':anchorId})
            .orderBy('fans.fansFollow',"DESC")
            .getMany()
       
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