import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";
/**
 * Up主空间视频 https://space.bilibili.com/20165629/video
 */
@Entity()
export class SpaceVideoInfo{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    anchorId: number;

    @Column()
    videoLink: string;

    @Column()
    videoTitle: string;

    @Column() /**视频创建时间 ，如果显示‘21小时前’ 则定位当天*/
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
