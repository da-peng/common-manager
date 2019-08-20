import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";


/**
 * 主播的
 */
@Entity()
export class RankVideoInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    anchorId: number;

    @Column()
    videoLink: string;

    @Column()
    videoTitle: string;

    @Column()
    tags: string;

    @Column() /**视频创建时间 */
    videoCreateDate: Date;

    @CreateDateColumn() /**数据创建时间 */
    createDate: Date;
    
    @UpdateDateColumn() /**数据更新时间 */
    updateDate: Date;
    uniques: [
        {
            name: "UNIQUE",
            columns: [
                "videoLink"
            ]
        }
    ]
}