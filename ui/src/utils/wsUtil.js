import { getUserId } from './localStorageUtil.js';

let socket;

export const closeWsConnection = () => {
	if(socket) {
		socket.onclose = (code, reason) => {
			console.log("WebSocket connection closed");
			console.log(code);
			console.log(reason);
		};
	}
}

export const openWsConnection = (handleMessage) => {
	socket = new WebSocket(`ws://localhost:7800/ws-grader/connect?${getUserId()}`);

	socket.onerror = (e) => console.error("WebSocket error:", e);
	socket.onmessage = handleMessage;
	socket.onopen = () => console.log("WebSocket connection created");
}
