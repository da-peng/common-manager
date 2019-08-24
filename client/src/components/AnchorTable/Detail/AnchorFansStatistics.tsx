import * as React from 'react'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from '../../../bases/AbstractComponent';
import { RouteComponentProps } from 'react-router';
import { AnchorService } from '../../../services/Anchor';
import { Message } from '../../../utils/Message';
// 引入 echarts 主模块。
import * as echarts from 'echarts';

import  Styles from './Echart.less'
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
    option =(fansFollowData:any,totalPlayData:any)=> {

        return {
        title: {text: 'Line Chart'},
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
            {
                data: totalPlayData,
                type: 'line'
            },

        ]
    }}
    

    async getAnchorFansStatistics(){
        const fansChart = echarts.init(document.getElementById('main') as any);
        this.showLoading()
        const  startDate = this.getNowDate()
        const  endDate = this.getNowDate()
        const {id} = this.props.location.state
        startDate.setMonth(startDate.getMonth()-1)
        
        let params = {
            startDate: startDate,
            endDate: endDate,
            anchorLink: 'https://space.bilibili.com/'+id,
            componentUUID: this.getUUID()
        }
        
        const {data} = await AnchorService.getAnchorFansStatistics(params)
        if (data && data.status === Message.get('requestOk').status) {
            // console.log(data)
            await this.intiEchat(fansChart,data)
            
            this.hidenLoading()
        }

    }
    getNowDate(){
        const now = new Date()
        var nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // var oneDay = 24 * 3600 * 1000;
        let nowFormat = new Date(nowDate);
        return nowFormat
    }

    formatDate(date:Date) {//date.getMonth()返回值是 0（一月） 到 11（十二月） 之间的一个整数,所以要+1
        return  [date.getFullYear(), date.getMonth()+1, date.getDate()].join('-')
    }
    async intiEchat(fansChart:echarts.ECharts,data:any){
        let i:IFansStatistics
        let fansFollowData=[]
        let totalPlayData=[]
        for(i of data.data){
            console.log(i)
            const  createDate = this.formatDate(new Date(i.createDate))
            fansFollowData.push({
                name:createDate,
                value:[createDate,i.fansFollow/1000/1000]
            })

            totalPlayData.push({
                name:createDate,
                value:[createDate,i.totalPlay/1000/1000/10]
            })
        }

        const option = this.option(fansFollowData,totalPlayData)
        console.log(option)
        fansChart.setOption(option as any)
    }
    getRenderContent(){
        return (
            <div id = 'main' className={Styles.echart} >

            </div>
        )
    }

}


export const AnchorFansStatistics = AnchorFansStatisticsComponent