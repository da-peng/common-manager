import {Entity,  CreateDateColumn,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";

/***
 * 管理后台的用户名
 */
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

}
