import * as React from 'react'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from "../../bases/AbstractComponent";
import { Table } from "antd";

interface  Iprops extends IAbstractComponentProps{
    pageNum?:number
    pageSize?:number
    total?:number
    onPageChange:(pageNum:number)=>void
    // tableprops:
}

interface IState extends IAbstractComponentState{}




export class TableClass extends AbstractComponent<Iprops,IState>{
    displayName = 'TableClass'
    state: IState = {}

    getTableOpt(){
        const {
            value, total = 0, pageNum = 1, pageSize = 10, onPageChange
        } = this.props

        return {
            rowKey : 'anchorId',
            rowSelection: {
                type: 'checkbox'
            },


        }
    }

    getTableColumns(){
        return [
            {
                title: '主播昵称',
                dataIndex: 'nickName',
                key: 'nickName'
            },
            {
                title: '主播直播间ID',
                dataIndex: 'anchorLink',
                key: 'anchorLink'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
            },
            {
                title: '年龄组',
                dataIndex: 'ageGroup',
                key: 'ageGroup',
            },
            {
                title: '粉丝关注数',
                dataIndex: 'fansFollow',
                key: 'fansFollow',
            },
            {
                title: '总播放次数',
                dataIndex: 'totalPlay',
                key: 'totalPlay',
            },

        ]
    }

    getRenderContent(){
        return (
            <div>
                <Table />
            </div>
        )
    }

    
}