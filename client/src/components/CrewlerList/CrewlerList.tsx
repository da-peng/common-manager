import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from "../../bases/AbstractComponent";
import { Col, Row, Card, Select, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import *  as React from 'react'
import Style from './Card.less'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { WEBSOCKET_SERVICE } from '../../utils/Constants'
import { FormComponentProps } from "antd/lib/form";
import { RefObject } from "react";
import ReactDOM from "react-dom";

interface IProps extends IAbstractComponentProps,FormComponentProps{

}

interface IState extends IAbstractComponentState{
    type?:string
    result?:[]
}

class CrewlerListComponent extends AbstractComponent<IProps,IState>{
    
    state:IState ={
        result : [],
        type:''
    }
    displayName = 'CrewlerList'

    messagesEnd= React.createRef<HTMLDivElement>()

    handleChange =(value:string)=>{
        this.setState(
            {
                type:value
            }
        )
    }

    handleClick=(task:string)=>{
        const {type} = this.state
        const ws =  new W3CWebSocket(WEBSOCKET_SERVICE+"/crewlerExecute");
        ws.onopen = ()=> {
           
            let jsonData = {
                task:task,
                ops:{
                    type,
                    isheadless:true,
                }
            }
            

            if(ws.readyState===ws.OPEN){
                console.log(jsonData)
                ws.send(JSON.stringify(jsonData));
            }
        }

         
        ws.onmessage = (message)=> {/***服务端接收到什么信息 */
            // console.log(message.type)
            let data = ''
            if (message.type === 'utf8') {
                // console.log(message.utf8Data)
                data = JSON.parse(message.utf8Data);
                console.log("Received Message: " + data);
            }else if(message.type === 'message'){
                let ret = this.state.result as any
                console.log(message.data)
                data = message.data;
                ret.push(data)
                this.setState(
                    {
                        result:ret
                    }
                )
                // console.log("Received Message: " + data);
            }

            if((/teardown/g).test(data)){
                ws.close()
            }
            
            // let newResult = ret.push(data)
            
        }
         
        // ws.onclose = function(evt) {
        //     console.log("Connection closed.")
        // }

    }
    // componentDidMount(){
    //     this.scrollToBottom()//这里 应该是要div 独立封装一个组件
    // }

    scrollToBottom = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd as any);
        (node as any).scrollIntoView({ behavior: "smooth" });
    }

    getRenderContent(){
        const {result} = this.state as any
        return (
            <Row gutter={20} className={Style.crewlerCard}>
                <Col span={6}>
                    <Card 
                    title="主站排行榜爬虫" 
                    // bordered={false}
                    actions={[
                        <Select defaultValue="global" style={{ width: 80 }} onChange={(v:any)=>this.handleChange(v)}>
                            <Select.Option value='global'>全部</Select.Option>
                            <Select.Option value='dance'>舞蹈</Select.Option>
                            <Select.Option value='game'>游戏</Select.Option>
                            <Select.Option value='etc'>教育</Select.Option>
                            <Select.Option value='live'>生活</Select.Option>
                            <Select.Option value='fashion'>时尚</Select.Option>
                        </Select>
                        ,
                        <Button type="dashed" shape="circle" icon="search" onClick={()=>this.handleClick('RankWeekCrewler')}/>
                    ]
                    }
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card 
                    title="粉丝热度爬虫" 
                    actions={
                        [
                            <Button type="dashed" shape="circle" icon="search" onClick={()=>this.handleClick('AnchorFansWeekCrewler')}/>
                        ]
                    }
                    // bordered={false}
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                   
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="视频热度爬虫" 
                    actions={
                        [
                            <Button type="dashed" shape="circle" icon="search" onClick={()=>this.handleClick('SpaceVideoWeekCrewler')}/>
                        ]
                    }
                    // bordered={false}
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                       
                    </Card>
                </Col>
                <Col span={6}>
                    <Card title="频道标签爬虫"
                    actions={
                        [
                            <Button type="dashed" shape="circle" icon="search" onClick={()=>this.handleClick('SpaceChannelAndTagsMouthCrewler')}/>
                        ]
                    } 
                    // bordered={false}
                    >
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                        
                    </Card>
                </Col>
                <Col span={24}>

                    <hr className ={Style.hr} />

                    <h1>运行日志:</h1>
                    

                    <div className ={Style.crewlerLog}
                    ref ={(el) => {(this.messagesEnd as any) = el}}
                    >
                        {result.map((i :any)=>{
                           return <p >{i}</p>
                        })
                        }
                        
                    </div>
                </Col>
            </Row>
        )
    }

    
}

export const CrewlerList = CrewlerListComponent