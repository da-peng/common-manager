import {EntityRepository, Repository} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    
    getUserById(id: number): Promise<User> {
        
        return  this.createQueryBuilder('user')
            .where(`user.id = :id`)
            .setParameter('id', id)
            .getOne();
    }

    getUserByUserName(userName: string): Promise<User> {
        return  this.createQueryBuilder('user')
            // .leftJoinAndSelect('user.projects', 'project')
            .where(`user.username = :userName`)
            .setParameter('userName', userName)
            .getOne();
    }
}