import { UserRepository } from '../repositpry/UserRepository';
import { User } from '../entity/User';
// import { ConnectionManage } from '../utils/connection_manage';
import { Connection, getConnection } from 'typeorm';
import { Message } from '../utils/message'
import {ResultObject} from '../interface/ResultObj'

export class UserService {


    static async getUserById(id: number): Promise<User> {
        const connection: Connection = await getConnection();

        const user = await connection.getCustomRepository(UserRepository)
                    .getUserById(id)
        return user;
    }


    static async getUserByUserName(userName: string): Promise<User> {
        const connection: Connection = await getConnection();

        const user = await connection.getCustomRepository(UserRepository)
                    .getUserByUserName(userName)
        return user;
    }
    /**
     * 
     * @param userId 
     */
    static async checkUserById(userId: number): Promise<ResultObject> {
        const user:User = await UserService.getUserById(userId);
        if(user){
            return { success: !!user, ...!!user ? Message.get('requestOk') : Message.get('userNotExist'), result: user };
        }else{
            return { success: !!user, ...!!user ? Message.get('requestOk') : Message.get('userNotExist')};
        }
    }


    static async checkUserByAcount(userName: string,pwd:string): Promise<ResultObject> {

        const user:User = await UserService.getUserByUserName(userName);

        if(user){
            if(user.isActive){
                return { success: user.password===pwd, ...user.password===pwd ? Message.get('requestOk') : Message.get('passwordInvalid'), result: user };
            }else{
                return { success: false, ...Message.get('userIsNotActive')};
            }
        }else{
            return { success: !!user, ...!!user ? Message.get('requestOk') : Message.get('userNotExist')};
        }
    }



}