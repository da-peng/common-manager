import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";

/**
 * 主播空间 官方标签下的视频数量（用于看主播专攻创作哪一块视频内容）
 */
@Entity()
export class SpaceVideoTags {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()/**主播Id */
    anchorId:number

    @Column()/**官方标签 */
    tagName:string
    
    @Column()/**标签视频数量 */
    videoNum:number;

    @UpdateDateColumn()/**动态数据拉取时间 */
    updateDate: Date;
}