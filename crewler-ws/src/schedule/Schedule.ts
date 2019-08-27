import * as schedule from 'node-schedule';
import * as WebSocket from 'ws'
import { WS_LOCAL_HOST } from '../utils/config';

/**
 * 定时任务配置
 */

const scheduleConfig = [
  {
    task: 'RankWeekCrewler',
    type: [
      'global',
      'dance',
      'game',
      'etc',
      'live',
      'fashion'
    ],
    time: [
      '0 0 10 * * *',
      '0 30 10 * * *',
      '0 0 11 * * *',
      '0 30 11 * * *',
      '0 0 12 * * *',
      '0 30 12 * * *'
    ]
  },
  {
    task: 'SpaceVideoWeekCrewler',
    time: '0 0 13 * * *'
  },
  {
    task: 'SpaceChannelAndTagsMouthCrewler',
    time: '0 30 14 * * *'
  },
  {
    task: 'AnchorFansWeekCrewler',
    time: '0 0 15 * * *'
  }
]
export class ScheduleRun{

    static initScheduleJob(datatime:string,task:string,type:string=''){
      schedule.scheduleJob(datatime, () => {
        // 秒、分、时、日、月、周几
        // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
        // 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
        // 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'

        let jsonData = {
          task: task,
          ops: {
            isheadless: true,
            type: type
          }
        }
        if (type){
          delete jsonData.ops[type]
        }
        var ws = new WebSocket(WS_LOCAL_HOST + "/crewlerExecute");
        ws.onopen = function (e) {
          console.log(JSON.stringify(jsonData))
          ws.send(JSON.stringify(jsonData));
        }

        ws.onmessage = function (e) {/***服务端接收到什么信息 */
          // console.log("Received Message: " + evt.data);
          let data = e.data as any
          if ((/teardown/g).test(data)) {
            ws.close()
          }
        }
        ws.onclose = function (e) {
          console.log("Connection closed.")
        }
      })
    }


   static run(){
      console.log( '爬虫定时任务启动')
      for (let i = 0; i < scheduleConfig.length; i++) {
        const job = scheduleConfig[i];
        let task = job.task
       
        if (job.type) {
          let types = job.type
          let times = job.time
          for (let j = 0; j < types.length; j++) {
            const type = types[j];
            const time = times[j]
            console.log(time,task,type)
            ScheduleRun.initScheduleJob(time,task,type)
          }
        }else {
          let time = job.time
          console.log(time,task)
          ScheduleRun.initScheduleJob(time as string,task)
        }
        
      }
      console.log( '爬虫定时任务启动结束')
    }
} 