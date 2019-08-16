import {EntityRepository, Repository} from "typeorm";
import {Anchor} from "../entity/Anchor";

@EntityRepository(Anchor)
export class AnchorRepository extends Repository<Anchor> {
    
    /**唯一 */
    async createAndSave(nickName: string, authorLink:string,sex: string = 'male'||'female'||'',ageGroup:string='70后'||'80后'||'90后'||'00后'||'10后'||'') {
        
        const anchor = new Anchor();
        anchor.nickName = nickName
        anchor.sex = sex
        anchor.ageGroup=ageGroup
        anchor.authorLink = authorLink
        
        const isExist = await this.getByAuthorLink(authorLink)
        if(isExist!!){
            if(isExist.nickName!==nickName){
                isExist.nickName = nickName
                return this.manager.save(isExist);/**更新 */
            }else{
                return isExist
            }
        }else{
            return this.manager.save(anchor);/**插入新的 */
        }
    }
    
    getByNickNameAndAuthorLink(nickName: string,authorLink:string): Promise<Anchor> {
        return  this.createQueryBuilder('anchor')
            .where(`anchor.nickName = :nickName OR anchor.authorLink= :authorLink`, { 'nickName': nickName, 'authorLink':authorLink})
            .getOne();
    }
     
    getByAuthorLink(authorLink:string): Promise<Anchor> {
        return  this.createQueryBuilder('anchor')
            .where(`anchor.authorLink= :authorLink`, {'authorLink':authorLink})
            .getOne();
    }


    updateAnchorName(nickName:string){
        return 
    }
}