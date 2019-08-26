import * as React from 'react'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from "../../bases/AbstractComponent";
import { Table, Popconfirm } from "antd";
import { TableProps,ColumnProps, TableComponents } from 'antd/lib/table';
import { IAnchorInfo } from '../../models/Anchor';
import { IReuqestBase } from '../../bases/HttpModel';
import { AnchorService } from '../../services/Anchor'
import { Message } from '../../utils/Message';
import Form, { FormComponentProps } from 'antd/lib/form';
import {EditableCell} from './EditableCell'
import { WrappedFormUtils } from 'antd/lib/form/Form';
import _ from "lodash";
import { RouteComponentProps } from 'react-router';
import {convertUnit} from '../../utils/string-utils'
interface  Iprops extends IAbstractComponentProps<Array<IAnchorInfo>>, FormComponentProps,RouteComponentProps{
    page?:number
    pageSize?:number
    total?:number
    tableProps?:TableProps<IAnchorInfo>
}

interface IState extends IAbstractComponentState{
    anchorList: Array<IAnchorInfo>//dataSource
    editingIndex: string
}


interface EditableColumnProps extends ColumnProps<IAnchorInfo> {
    editable?:boolean //组件是否可编辑

}

interface IUpdateAnchorInfo extends IReuqestBase{
    sex:string
    ageGroup:string
    anchorLink:string
}

export const EditableContext:React.Context<any> = React.createContext('')
class AnchorTableComponent extends AbstractComponent<Iprops,IState>{
    displayName = 'TableClass'

    state:IState = {
        editingIndex:'',
        anchorList: [],
        page: 1,
        pageSize:10,
        total: 0
    }

    onPageChange(page: number) {
        this.setState(//setState是异步
            {
                page
            },()=>{ //同步
                this.getAnchorTableListData()
            }
        )
        
    }


    getTableOpt():TableProps<IAnchorInfo>{

        const {
            anchorList, total = 0, page = 1, pageSize  ,editingIndex
        } = this.state
        // console.log('editingIndex',editingIndex)
        const columns = this.getTableColumns().map(col => {
            if (!col.editable) {
              return col;
            }
            return {
              ...col,
              onCell: (record:any)=> ({
                record,
                inputType: col.dataIndex,
                // inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: record.index === editingIndex // 编辑行 当前是否是正在可编辑状态
              }),
            };
          });
      

        const components:TableComponents = {
            body: {
              cell: EditableCell,
            },
          };

        return {
            rowKey : 'anchorId',//表格行 key 的取值，可以是字符串或一个函数
            // rowSelection: {//表格行是否可选择
            //     type: 'checkbox'
            // },
            components:components,
            scroll:{x:930,y:330},
            bordered:true,//是否展示外边框和列边框
            dataSource: anchorList || [],//数据数组
            columns: columns, //表格列的配置描述，具体项见下表
            pagination: {  // 分页器，参考配置项或 pagination 文档，设为 false 时不展示和进行分页
                current:page,//当前页数
                total,//数据总数
                pageSize,//每页条数
                showTotal: () => `共 ${anchorList.length} 条`,//用于显示数据总量和当前数据顺序
                onChange: (page:number) => this.onPageChange(page)
            },
            ...this.props.tableProps
        }
    }

    
    getTableColumns():EditableColumnProps[]{
        return [
            {
                title: '主播昵称',
                dataIndex: 'nickName',
                key: 'nickName',
                width:180,
                fixed: 'left'
            },
            {
                title: '主播直播间ID',
                dataIndex: 'anchorLink',
                key: 'anchorLink',
                width:160,
                render:(anchorLink:string)=><a href={anchorLink}>{(anchorLink.match(/[1-9][0-9]*/g) as RegExpMatchArray)[0]}</a>
            },
            {
                title: '性别', // 列头显示文字
                dataIndex: 'sex', //列数据在数据项中对应的 key，支持 a.b.c、a[0].b.c[1] 的嵌套写法
                key: 'sex', //React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
                width:80,
                editable:true,
                render: (sex:string)=> sex==='female'? '女':'男'//生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并
            },
            {
                title: '年龄组',
                dataIndex: 'ageGroup',
                key: 'ageGroup',
                width:90,
                editable:true
            },
            {
                title: '粉丝关注数',
                dataIndex: 'fansFollow',
                key: 'fansFollow',
                width:180,
                render:(follow:number)=>{
                  const {value,unit}=convertUnit(follow.toString()) as any
                  return value+unit
                }

            },
            {
                title: '总播放次数',
                dataIndex: 'totalPlay',
                key: 'totalPlay',
                render:(play:string)=>{
                  const {value,unit}=convertUnit(play.toString()) as any
                  return value+unit
                }
            },
            {
                title:'操作',
                dataIndex: 'action',
                key: 'action',
                width:100,
                fixed: 'right',
                render:(text, record)=>{ //参数分别为当前(行的值，当前行数据，行索引) recod (ColumnProps) //操作按钮组件
                    const { editingIndex } = this.state;
                    const editable = record.index === editingIndex;
                    return editable ?  
                    (
                        <span>
                          <EditableContext.Consumer> 
                            {form => (
                              <a
                                onClick={() => this.save(form, record.index)}
                                style={{ marginRight: 8 }}
                              >
                                保存
                              </a>
                            )}
                          </EditableContext.Consumer>
                          <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.index)}>
                            <a> 取消</a>
                          </Popconfirm>
                        </span>
                      ) : (
                        // <a  onClick={editingIndex !== '' ? () => this.edit(record.index) : ()=>false}> 编辑</a>
                        <span>
                          <a  onClick={() => this.edit(record.index)}>编辑</a>
                          <a  onClick={() => this.details(record.anchorLink)}> 详情</a>
                        </span>
                        
                      )
                }
                
            }

        ]
    }



    details= (anchorLink:string) =>{

      let id = (anchorLink.match(/[1-9][0-9]*/g) as RegExpMatchArray)[0]
      // console.log(id)
      // console.log(this.props.match.url)
      this.props.history.push(`${this.props.match.url}/detail`, {id});
    }

    edit = (index: string): void=> {//没调用这个
        // console.log('index',index)
        
        this.setState({ editingIndex: index });
    }
    save=(form:WrappedFormUtils<any>, index: string): void =>{
        form.validateFields((error:any, row:any) => {
            if (error) {
                return;
              }
              // console.log('修改成功；可编辑的2个cell的最新数据是',row)
              const newData = [...this.state.anchorList]
              const i = newData.findIndex(item => index === item.index);
              let newItem:IAnchorInfo
              if (i > -1) {
                let  item:IAnchorInfo = newData[i];
                newItem = _.cloneDeep(item)

                newItem.ageGroup=row.ageGroup
                newItem.sex=row.sex

                newData.splice(i, 1, {// 将 下标 i 的数据 item删除 只删除一次，再加入row这个一行的数据
                  ...item,
                  ...newItem,
                });

                // console.log('newData',newData)

                this.setState({ anchorList: newData, editingIndex: '' },()=>{
                  this.updateAnchorInfo(newItem)
                });
                
                // console.log('修改成功；修改后的最新行数据是',newItem)
                
              } else {
                newData.push(row);
                this.setState({ anchorList: newData, editingIndex: '' });
              }
        })

    }
    cancel=(index: any)=> {
        this.setState({ editingIndex: '' });
    }


    componentDidMount(){
        this.getAnchorTableListData()
        // this.shouldComponentUpdate(this.props,this.state)
    }
    
    async updateAnchorInfo(item:IAnchorInfo){

        this.showLoading()
        const {anchorLink,sex,ageGroup} = item
        let params :IUpdateAnchorInfo ={
          anchorLink,
          sex,
          ageGroup,
          componentUUID: this.getUUID()
        }
        const {data} = await AnchorService.updateAnchorInfo(params)
        if (data && data.status === Message.get('requestOk').status) {
            this.hidenLoading()
        }

    }
    async getAnchorTableListData(){
        this.showLoading()
        const { pageSize, page } = this.state
        
        let params :IReuqestBase= {
            pageSize,
            page,
            componentUUID: this.getUUID()
        }
        try {
            const { data }  = await AnchorService.anchorList(params)
            //解决 1 网络断网， 2. 网络请求数据失败（后端数据库连接失败 ,不能去掉 data 空/undefined 判断
            if (data && data.status === Message.get('requestOk').status) {
                    let anchorFans = data.data
                    let anchorList:Array<IAnchorInfo> = []

                   let i = 1
                    for (let k in anchorFans){
                        
                        let fans = anchorFans[k]
                        
                        // let liveId= (fans.anchorLink.match(/[1-9][0-9]*/g) as RegExpMatchArray)[0]
                        
                        fans.anchorLink = fans.anchorLink
                        fans['index'] = i.toString()
                        
                        anchorList.push(fans)
                        i++
                    }
                    this.setState({
                        total:data.total,
                        anchorList:anchorList
                    }  
                    )
                }
            this.hidenLoading()
            }catch(e){
            console.log(e)
        }
    }

    getRenderContent(){
        
        return (
   
                <EditableContext.Provider value={this.props.form}>

                {/* <div className={Styles.orderListTable}> */}
                  <Table {...this.getTableOpt()}/>
                {/* </div> */}
                
                </EditableContext.Provider>
                
        )
    }
  
}


export const AnchorTable = Form.create()(AnchorTableComponent);