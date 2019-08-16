import { createConnection, Connection, ConnectionOptions, getConnection } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export class ConnectionManage {

    /**
     * 不使用这种，使用ormconfig.json 的配置文件
     */
    static connectionOptions: MysqlConnectionOptions = {
        type: "mysql",
        host: process.env.HITCHHIKER_DB_HOST || 'localhost',
        port: parseInt(process.env.HITCHHIKER_DB_PORT)||3306,
        username: process.env.HITCHHIKER_DB_USERNAME||'root',
        database: process.env.MYSQL_DATABASE||'vlog-data',
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
       
    }


    static async connect() {
        try {
            await createConnection();
        } catch (error) {
            console.error(error)
        }
    }


}