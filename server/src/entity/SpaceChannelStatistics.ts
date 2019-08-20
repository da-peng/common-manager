import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";
/**
 * Up主空间视频频道 https://space.bilibili.com/20165629/channel/index
 */
@Entity()
export class SpaceChannelStatistics{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    anchorId: number;

    @Column()
    channelName: string;

    @Column()
    videoNumber: number;

    @Column()
    channelCreateDate: Date;

    @CreateDateColumn()
    createDate: Date;
}
