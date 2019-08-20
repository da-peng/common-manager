import {Entity,  CreateDateColumn ,UpdateDateColumn,Column, PrimaryGeneratedColumn} from "typeorm";


/**
 * 主播信息(每一周更新一次，主播基础数据)
 */
@Entity()
export class Anchor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickName: string;

    @Column()
    anchorLink:string

    @Column('enum',{
        nullable: true,
        enum:['male','female','']
    })
    sex: string;

    @Column('enum',{
        nullable: true,
        enum:['70后','80后','90后','00后','10后','']
    })
    ageGroup: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    uniques: [
        {
            name: "UNIQUE",
            columns: [
                "authorLink"
            ]
        }
    ]


}
