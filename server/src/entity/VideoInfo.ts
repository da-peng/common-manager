import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";



/**
 * 主播的第一个视频（爬取的数据）
 */
@Entity()
export class VideoInfo {

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

    @CreateDateColumn() /**视频创建时间 */
    createDate: Date;
    
    @UpdateDateColumn() /**视频创建时间 */
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