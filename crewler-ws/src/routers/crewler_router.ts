import { RankCrewler } from '../crewler/RankCrewler';
import { CrewlerTransform } from '../utils/transform_manage'

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
ws.on('connection', ws => {
    console.log('server connection');
    ws.on('message', msg => {
        console.log(msg.toString())

        try {
            const ret = JSON.parse(msg.toString())

            if (ret.task === '/crewler-execute') {
                // 返回给前端的数据
                const rankCrewler = new RankCrewler()

                const crewlerTransform = new CrewlerTransform().init((chunk: any) => {
                    ws.send(chunk);
                })
                let isheadless = !!ret.isheadless ? ret.isheadless : true
                let type = !!ret.type ? ret.type : 'global'
                let url: string = config[type]
                rankCrewler.init(isheadless, url, crewlerTransform)
            }
        } catch (e) {
            console.log(e)
        }


    });

});