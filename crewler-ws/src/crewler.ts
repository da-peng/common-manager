import {RankCrewler} from './crewler/RankCrewler'
import {ConnectionManage} from '../../server/src/utils/connection_manage'
import { CrewlerTransform } from './utils/transform_manage'

const rankCrewler = new RankCrewler()
ConnectionManage.init()
let url = 'https://www.bilibili.com/ranking'

            
const crewlerTransform = new CrewlerTransform().init((chunk: any) => {
    console.log()
})

rankCrewler.init(true,url,crewlerTransform)