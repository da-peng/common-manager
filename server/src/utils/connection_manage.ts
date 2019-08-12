import { createConnection, Connection, ConnectionOptions, getConnection } from 'typeorm';
import { User } from "../entity/User";
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export class ConnectionManage {


    static connectionOptions: MysqlConnectionOptions = {
        type: "mysql",
        host: process.env.HITCHHIKER_DB_HOST || 'localhost',
        port: parseInt(process.env.HITCHHIKER_DB_PORT)||3306,
        username: process.env.HITCHHIKER_DB_USERNAME||'root',
        database: process.env.MYSQL_DATABASE||'test',
        password: process.env.MYSQL_ROOT_PASSWORD||'root',
        entities: ["entity/*.js"]

    }

    static instance: any = null;
    /**
     * 
     * @param connectionOptions 
     */


    // /**
    //  * 单例模式
    //  */
    static async init(): Promise<any> {
        if (this.instance == null) {
            this.instance = await this.connect()
        }
        return getConnection() //连接管理其中拿，貌似不用考虑单例（内部实现了？）
    }

    /**
     * 
     */
    static async initData() {
        console.info("Inserting a new user into the database...");
        const user = new User();
        user.username = "admin";
        user.password = 'admin';
        user.isActive = true;
        await getConnection().manager.save(user)
        console.info("Saved a new user with id: " , user.id);

        console.info("Loading users from the database...");
        const users = await getConnection().manager.find(User);
        console.info("Loaded users:", users);
        console.info("Here you can setup and run express/koa/any other framework.");
    }




    static async connect() {
        try {
            await createConnection();
        } catch (error) {
            console.error(error)
        }
    }


}