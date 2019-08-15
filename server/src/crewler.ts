import {RankCrewler} from './crewler/RankCrewler'
import {ConnectionManage} from './utils/connection_manage'
const rankCrewler = new RankCrewler()
ConnectionManage.init()
rankCrewler.init(true)