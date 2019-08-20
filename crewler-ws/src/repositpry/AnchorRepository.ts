import { EntityRepository, Repository } from "typeorm";
import { Anchor } from "../entity/Anchor";

@EntityRepository(Anchor)
export class AnchorRepository extends Repository<Anchor> {

    /**唯一 */
    async createAndSave(nickName: string, anchorLink: string, sex: string = 'male' || 'female' || '', ageGroup: string = '70后' || '80后' || '90后' || '00后' || '10后' || '') {

        const anchor = new Anchor();
        anchor.nickName = nickName
        anchor.sex = sex
        anchor.ageGroup = ageGroup
        anchor.anchorLink = anchorLink

        const isExist = await this.getByanchorLink(anchorLink)
        if (isExist!!) {
            if (isExist.nickName !== nickName) {
                isExist.nickName = nickName
                return this.manager.save(isExist);/**更新 */
            } else {
                return isExist
            }
        } else {
            return this.manager.save(anchor);/**插入新的 */
        }
    }

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
    getByanchorLinks(pageSize: number, pageIndex: number) {
        return this.createQueryBuilder('anchor')
            .select('anchor.id,anchor.anchorLink')
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