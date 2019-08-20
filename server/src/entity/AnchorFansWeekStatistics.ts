import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";


/**
 * 主播信息(每一周更新一次，主播基础数据)
 */
@Entity()
export class AnchorFansWeekStatistics {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: number;
    /**UP主关注的人 */
    @Column()
    followOther:number;
    /**关注的粉丝数 */
    @Column()
    fansFollow: number;
    /**播放数 *///这里会上亿
    @Column('bigint')
    totalPlay: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;


}
