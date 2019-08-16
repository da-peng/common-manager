import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";

/**
 * 视频标签汇总表 （标签表）
 */
@Entity()
export class TagsCollect {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId:number;

    @Column()
    tag: string;

    // @Column() /** 标签重复出现的次数 */, 没有意义，只有在查询的时候再统计
    // tagCount: number
    
    @Column()
    videoId :number

    @CreateDateColumn()
    createDate: Date;
    
    @UpdateDateColumn()
    updateDate: Date;
}
