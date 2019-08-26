import * as schedule from 'node-schedule';
import  * as WebSocket from 'ws'
import { WS_LOCAL_HOST } from '../utils/config';

/**
 * 注册定时任务
 */

const scheduleConfig = [
  {
    task:'RankWeekCrewler',
    type:[
      'global',
      'dance',
      'game',
      'etc',
      'live',
      'fashion'
    ],
    time:[
      '* * 10 * * *',
      '* 30 10 * * *',
      '* * 11 * * *',
      '* 30 11 * * *',
      '* * 12 * * *',
      '* 30 12 * * *'
    ]
  },
  {
    task:'SpaceVideoWeekCrewler',
    time:'* * 1 * * *'
  },
  {
    task:'SpaceChannelAndTagsMouthCrewler',
    time:'* 30 1 * * *'
  },
  {
    task:'AnchorFansWeekCrewler',
    time:'* * 2 * * *'
  }
]
export function  scheduleCronstyle(){
  //每分钟的第30秒定时执行一次:
    for (let i = 0; i < scheduleConfig.length; i++) {
      const job = scheduleConfig[i];
      let task = job.task

      if(job.type){
        let types = job.type
        for (let j = 0; j < types.length; j++) {
          const type = types[j];
          schedule.scheduleJob(`* * 10 * * *`,()=>{
            // 秒、分、时、日、月、周几
            // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
            // 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
            // 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
           
            var ws = new WebSocket(WS_LOCAL_HOST+"/crewlerExecute");
            ws.onopen = function(e) {
              console.log("Connection open ...");
              let jsonData = {
                task:task,
                ops:{
                  isheadless:true,
                  type:type
                }
              }
              console.log(JSON.stringify(jsonData))
              ws.send(JSON.stringify(jsonData));
            };
             
            ws.onmessage = function(e) {/***服务端接收到什么信息 */
              // console.log("Received Message: " + evt.data);
              let data = e.data
              if ((/teardown/g).test(data)) {
                ws.close()
              }
            };
             
            ws.onclose = function(e) {
                console.log("Connection closed.")
            }
              
          }); 
        }
      }else{
        schedule.scheduleJob(`* * ${10+i} * * *`,()=>{
          // 秒、分、时、日、月、周几
          // 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
          // 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
          // 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
         
          var ws = new WebSocket(WS_LOCAL_HOST+"/crewlerExecute");
          ws.onopen = function(e) {
            console.log("Connection open ...");
            let jsonData = {
              task:task,
              ops:{
                isheadless:true,
                type:type
              }
            }
            console.log(JSON.stringify(jsonData))
            ws.send(JSON.stringify(jsonData));
          };
           
          ws.onmessage = function(e) {/***服务端接收到什么信息 */
            // console.log("Received Message: " + evt.data);
            let data = e.data
            if ((/teardown/g).test(data)) {
              ws.close()
            }
          };
           
          ws.onclose = function(e) {
              console.log("Connection closed.")
          }
            
        }); 
        
      }
      }
    }
}