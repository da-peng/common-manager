import { WS_LOCAL_HOST } from '../utils/config';
import  * as WebSocket from 'ws'
/**
 * WebSocket,Node端实现的客户端
 */
var ws = new WebSocket(WS_LOCAL_HOST+"/crewlerExecute");


ws.onopen = function(evt) {
	console.log("Connection open ...");
	let jsonData = {
		// task:'SpaceVideoWeekCrewler',
		// task:'SpaceChannelAndTagsMouthCrewler',
		task:'RankWeekCrewler',
		
		// task:'AnchorFansWeekCrewler',
		ops:{
			isheadless:true,
			// type:'global'
		}
	}
	console.log(JSON.stringify(jsonData))
	ws.send(JSON.stringify(jsonData));
};
 
ws.onmessage = function(evt) {/***服务端接收到什么信息 */
	console.log("Received Message: " + evt.data);
	
};
 
ws.onclose = function(evt) {
    console.log("Connection closed.")
}