import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";

/**
 * 主播日排行榜 统计每日在排行榜上的主播及名次，（提取优质主播）稳定发挥
 */
@Entity()
export class AnchorDailyRank {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    anchorId: number;
    
    @Column() /** 排行榜名次 */
    ranking:number;

    @Column()/**Video ID */
    videoId:number

    @CreateDateColumn()/**数据获取的时间 */
    createDate: Date;

    @UpdateDateColumn()/**数据获取的时间 */
    updateDate: Date;
    
}
