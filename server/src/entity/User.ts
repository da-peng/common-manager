import {Entity,  CreateDateColumn,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";

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
