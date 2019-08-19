import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";

/**
 * 主播视频热度信息，弹幕数量，点赞数，金币数，收藏数；
 */
@Entity()
export class RankVideoWeekHotInfo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()/**主播Id */
    anchorId:number

    @Column()/**视频Id */
    videoId:number
    
    @Column()/**播放数 */
    play:number;

    @Column()/**观看数 */
    view:number;

    @Column()/**排行榜综合评分 */
    pts:number;

    @Column()/**弹幕数 */
    danMuNum: number;

    @Column()/**点赞数 */
    like: number

    @Column()/**币数 */
    totalCoins: number;

    @UpdateDateColumn()/**动态数据拉取时间 */
    updateDate: Date;
}