import type { Server, IncomingMessage } from "http"
import { WebSocketServer, WebSocket as WebSocketBase } from "ws"
import { Log } from "$lib/log";

type UserSocket = {
	username: string;
	socket: WebSocketBase;
}

const logger = new Log(3);
let userArr = new Array<UserSocket>();

export function prepareWebSocketServer(server?: Server) {
	if (!server) return

	const wss = new WebSocketServer({ noServer: true })

	server.removeAllListeners("upgrade")
	server.addListener("upgrade", async (req, socket, head) => {
		logger.Warn("starting upgrade process");

		const url = new URL(req.url!, `http://${req.headers.host}`)
		const username = url.searchParams.get("peerId")
		if (!username) {
			logger.Error("no 'username' parameter");
			return socket.destroy()
		}

		const path = url.pathname;
		if (path != "/ws") {
			logger.Error("invalid path");
			return socket.destroy()
		}

		//"http://localhost:5173/ws?peerId=klsjvhbsdfkb"

		wss.handleUpgrade(req, socket, head, ws => {
			onConnection(ws, username)
		})
	})
}

export function onConnection(socket: WebSocketBase, username: string) {	
	socket.on("close", code => logger.Info(`'${username}' disconnected from the room`));
	socket.on("error", error => logger.Error("error in the socket"));
	socket.addEventListener("message", ({ data }) => {
		let message = JSON.parse(data.toString());
		logger.Info(`'${message.author}' send the message '${message.content}'`);

		for (const user of userArr) {
			user.socket.send(data);
		} 
	});
	
	userArr.push({username, socket});
	logger.Info(`'${username}' connected to the room`);
}