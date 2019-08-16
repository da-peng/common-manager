import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";

/**
 * 主播的第一个视频（爬取的数据）
 */
@Entity()
export class AnchorFirstVideoInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    anchorId: string;

    @Column()
    videoLink: string;

    @Column()
    videoTitle: string;

    @Column()
    videoDesc: string;

    @Column()
    tagId: string;

    @CreateDateColumn()
    videoCreateDate: Date;
    
    @UpdateDateColumn()
    updateDate: Date;
}