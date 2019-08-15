import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";
/**
 * 一级大分类，类别：游戏/生活（基础配置表）
 */
@Entity()
export class Classification{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ClassificationName: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;
}
