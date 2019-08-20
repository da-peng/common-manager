import { AnchorFansWeekCrewler } from '../crewler/AnchorFansWeekCrewler';
import { SpaceChannelAndTagsMouthCrewler } from '../crewler/SpaceChannelAndTagsMouthCrewler';
import { SpaceVideoWeekCrewler } from '../crewler/SpaceVideoWeekCrewler';
import { RankWeekCrewler } from '../crewler/RankWeekCrewler';
import { CrewlerTransform } from '../utils/transform_manage'
import * as url from 'url'
/**
 * 用于爬取动态生成的网页
 */
const config = {
    global: 'https://www.bilibili.com/ranking',
    dance: 'https://www.bilibili.com/ranking/all/129/0/3',
    game: 'https://www.bilibili.com/ranking/all/4/0/3',
    etc: 'https://www.bilibili.com/ranking/all/36/0/3',
    live: 'https://www.bilibili.com/ranking/all/160/0/3',
    fashion: 'https://www.bilibili.com/ranking/all/155/0/3',
}
/**
 * WebSocket服务端
 */
import * as WebSocket from 'ws'
const ws = new WebSocket.Server({ port: 8888 });
ws.on('connection', (ws, request, client) => {
    const pathname = url.parse(request.url).pathname;
    const ip = request.connection.remoteAddress;
    // console.log(ip)
    // console.log(pathname)
    
    if(pathname==='/crewlerExecute'){
        ws.on('message', msg => {
            console.log(msg.toString())    
            try {
                const ret = JSON.parse(msg.toString())
                if (ret.task === 'RankWeekCrewler') {
                    // 返回给前端的数据
                    const rankCrewler = new RankWeekCrewler()
                    const crewlerTransform = new CrewlerTransform().init((chunk: any) => {
                        ws.send(chunk);
                    })
                    let ops = ret.ops
                    let isheadless = ops.isheadless!=null ? ops.isheadless : true
                    let type = !!ops.type ? ops.type : 'global'
                    let urls: string = config[type]
                    rankCrewler.init(isheadless, urls, crewlerTransform)
                }else if(ret.task === 'SpaceVideoWeekCrewler'){
                    const spaceVideoWeekCrewler = new SpaceVideoWeekCrewler()
    
                    const crewlerTransform = new CrewlerTransform().init((chunk: any) => {
                        ws.send(chunk);
                    })
                    let ops = ret.ops

                    let isheadless = ops.isheadless!=null ? ops.isheadless : true

                    spaceVideoWeekCrewler.init(isheadless,  crewlerTransform)
                }else if(ret.task === 'SpaceChannelAndTagsMouthCrewler'){
                    const spaceChannelAndTagsMouthCrewler = new SpaceChannelAndTagsMouthCrewler()
    
                    const crewlerTransform = new CrewlerTransform().init((chunk: any) => {
                        ws.send(chunk);
                    })
                    let ops = ret.ops
                    let isheadless = ops.isheadless!=null ? ops.isheadless : true
                    spaceChannelAndTagsMouthCrewler.init(isheadless, crewlerTransform)
                }else if(ret.task === 'AnchorFansWeekCrewler'){
                    const anchorFansWeekCrewler = new AnchorFansWeekCrewler()
    
                    const crewlerTransform = new CrewlerTransform().init((chunk: any) => {
                        ws.send(chunk);
                    })
                    let ops = ret.ops
                    let isheadless = ops.isheadless!=null ? ops.isheadless : true
                    anchorFansWeekCrewler.init(isheadless, crewlerTransform)
                }else{
                    const crewlerTransform = new CrewlerTransform().init((chunk: any) => {
                        ws.send(chunk);
                    })
                    crewlerTransform.write('task error！！！')
                }
            } catch (e) {
                console.log(e)
            }
    
    
        });
    }
});