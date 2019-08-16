
/**
 * WebSocket服务端
 */
import  * as WebSocket from 'ws'
var ws = new WebSocket("ws://localhost:8888/msg");
 
ws.onopen = function(evt) {
	console.log("Connection open ...");
	ws.send("Hello WebSockets!");
};
 
ws.onmessage = function(evt) {
	console.log("Received Message: " + evt.data);
	ws.close();
};
 
ws.onclose = function(evt) {
    console.log("Connection closed.")
}