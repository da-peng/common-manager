import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TagsCollect } from "./TagsCollect";

/**
 * 一级大分类与Tags 的关联表（手动操作,归类，基础配置表）
 */
@Entity()
export class ClassificationAndTags{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ClassificationId: number;

    @Column()
    TagId: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

}