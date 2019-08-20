
/**
 * WebSocket服务端，用于测试
 */
import  * as WebSocket from 'ws'
var ws = new WebSocket("ws://localhost:8888/crewlerExecute");
 
ws.onopen = function(evt) {
	console.log("Connection open ...");
	let jsonData = {
		// task:'SpaceVideoWeekCrewler',
		// task:'SpaceChannelAndTagsMouthCrewler',
		task:'AnchorFansWeekCrewler',
		ops:{
			isheadless:false,
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