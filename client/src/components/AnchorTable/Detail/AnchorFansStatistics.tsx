import * as React from 'react'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from '../../../bases/AbstractComponent';
import { RouteComponentProps } from 'react-router';
import { AnchorService } from '../../../services/Anchor';
import { Message } from '../../../utils/Message';
// 引入 echarts 主模块。
import * as echarts from 'echarts';

import  Styles from './Echart.less'
import { Row, Col } from 'antd';
import { convertUnit } from '../../../utils/string-utils';
import { notice } from '../../../utils/Notification/Notification';
// 引入折线图。
// import 'echarts/lib/echarts';
// 引入提示框组件、标题组件、工具箱组件。
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/toolbox';

interface IProps extends IAbstractComponentProps, RouteComponentProps{

}


interface IState extends IAbstractComponentState{

}

interface IFansStatistics{

    fansFollow: number;
    /**播放数 *///这里会上亿
    totalPlay: number;
    createDate: Date;
}


class AnchorFansStatisticsComponent extends AbstractComponent<IProps,IState>{
    displayName ='AnchorDetailComponent'
    state:IState ={}

    componentDidMount(){
        this.getAnchorFansStatistics()
    }
    //https://www.echartsjs.com/examples/editor.html?c=dynamic-data2
    fansFollowDataOption =(fansFollowData:any)=> {

        return {
        title: {text: '粉丝数-变化曲线'},
        tooltip : {
            trigger:'axis', //轴
            // trigger: 'item',           //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            formatter: "{b}"   //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）用于鼠标悬浮时对应的显示格式和内容
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [
            {
                data: fansFollowData,
                type: 'line'
            },

        ]
    }}

    totalPlayDataOption =(totalPlayData:any)=> {

        return {
        title: {text: '总播放数-变化曲线'},

        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            }
        },
        tooltip : {
            trigger:'axis',
            // trigger: 'item',           //数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            formatter: "{b}"   //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）用于鼠标悬浮时对应的显示格式和内容
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [
            {
                data: totalPlayData,
                type: 'line'
            },
        ]
    }}
    

    async getAnchorFansStatistics(){
        const fansChart = echarts.init(document.getElementById('fansChart') as any);
        const playChart = echarts.init(document.getElementById('playChart') as any);
        
        this.showLoading()
        
        const  endDate = new Date()
        let  startDate = new Date()
        let id
        try{
             id = this.props.location.state.id
        }catch(error){
            this.hidenLoading()
            notice({
                noticeType: 'error',
                message: '登录失效，请重新登录！',
                description: 'Oops!~ Something is wrong',
                duration: 3,
            })
            return 
        }
        startDate.setMonth(endDate.getMonth()-1)

        let params = {
            startDate: startDate,
            endDate: endDate,
            anchorLink: 'https://space.bilibili.com/'+id,
            componentUUID: this.getUUID()
        }
        
        const {data} = await AnchorService.getAnchorFansStatistics(params)
        if (data && data.status === Message.get('requestOk').status) {
            // console.log(data)
            await this.intiEchat(fansChart,playChart,data)
            
            this.hidenLoading()
        }

    }
//     getNowDate(){
//         let now = new Date()
//         /**时区处理 */
//         let currentTimestamp=now.getTime();
//         let offsetZone =now.getTimezoneOffset() /60;     //如果offsetZone>0是西区，西区晚
//         let offset=null;
//         offset=offsetZone +8;
//         currentTimestamp=currentTimestamp+offset*3600*1000
//         /** 东八区 */
//         now = new Date(currentTimestamp)
//         let nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

//         // // var oneDay = 24 * 3600 * 1000;
//         // let nowFormat = new Date(nowDate);
//         return nowDate
//     }


    formatDate(date:Date) {//date.getMonth()返回值是 0（一月） 到 11（十二月） 之间的一个整数,所以要+1
        return  [date.getFullYear(), date.getMonth()+1, date.getDate()].join('/')
    }
    async intiEchat(fansChart:echarts.ECharts,playChart:echarts.ECharts,data:any){
        let i:IFansStatistics
        let fansFollowData=[]
        let totalPlayData=[]
        for(i of data.data){
            // console.log(i)
            const  createDate = this.formatDate(new Date(i.createDate))
            let data_fans = convertUnit((i.fansFollow).toString()) as any
            let v = data_fans.value
            fansFollowData.push({
                name:`${v} ${data_fans.unit}`,
                value:[createDate,data_fans.value]
            })
            let data_play = convertUnit((i.totalPlay).toString()) as any
            let s = data_play.value
            totalPlayData.push({
                name:`${s} ${data_play.unit}`,
                value:[createDate,s]
            })
        }

        const fansFollowDataOption = this.fansFollowDataOption(fansFollowData)
        const totalPlayDataOption = this.totalPlayDataOption(totalPlayData)

        fansChart.setOption(fansFollowDataOption as any)
        playChart.setOption(totalPlayDataOption as any)
    }

    getRenderContent(){
        return (
            // 珊格间距
            <Row gutter={10} >
                <Col span={12}>
                <div id = 'fansChart' className={Styles.echart}  >

                </div>
                
                </Col>
                <Col span={12}>
                <div id = 'playChart' className={Styles.echart} >

                </div>
                </Col>
         
            </Row>
          
        )
    }

}

export const AnchorFansStatistics = AnchorFansStatisticsComponent