import * as React from 'react'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from "../../bases/AbstractComponent";
import { Table } from "antd";
import { TableProps,ColumnProps } from 'antd/lib/table';
import { IAnchorInfo } from '../../models/Anchor';

interface  Iprops extends IAbstractComponentProps<Array<IAnchorInfo>>{
    pageNum?:number
    pageSize?:number
    total?:number
    onPageChange:(pageNum:number)=>void
    tableProps?:TableProps<IAnchorInfo>
}

interface IState extends IAbstractComponentState{}




export class AnchorTableComponent extends AbstractComponent<Iprops,IState>{
    displayName = 'TableClass'
    state: IState = {}

    getTableOpt():TableProps<IAnchorInfo>{
        const {
            value, total = 0, pageNum = 1, pageSize = 10, onPageChange
        } = this.props

        return {
            rowKey : 'anchorId',//表格行 key 的取值，可以是字符串或一个函数
            rowSelection: {//表格行是否可选择
                type: 'checkbox'
            },
            bordered:true,//是否展示外边框和列边框
            dataSource: value || [],//数据数组
            columns: this.getTableColumns as any, //表格列的配置描述，具体项见下表
            pagination: {  // 分页器，参考配置项或 pagination 文档，设为 false 时不展示和进行分页
                current:pageNum,//当前页数
                total,//数据总数
                pageSize,//每页条数
                showTotal: () => `共 ${total} 条`,//用于显示数据总量和当前数据顺序
                onChange: (page: number) => {//页码改变的回调，参数是改变后的页码及每页条数
                    onPageChange(page)
                }
            },
            ...this.props.tableProps
        }
    }

    getTableColumns():ColumnProps<IAnchorInfo>[]{
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
                title: '性别', // 列头显示文字
                dataIndex: 'sex', //列数据在数据项中对应的 key，支持 a.b.c、a[0].b.c[1] 的嵌套写法
                key: 'sex', //React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
                render: (sex:string)=> sex==='female'? '女':'男'//生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并
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
                <Table {...this.getTableOpt}/>
            </div>
        )
    }
  
}