import type { Server, IncomingMessage } from "http"
import { WebSocketServer, WebSocket as WebSocketBase } from "ws"
import { get } from "svelte/store"

type UserSocket = {
	username: string;
	socket: WebSocketBase;
}

let userArr = new Array<UserSocket>();

export function prepareWebSocketServer(server?: Server) {
	if (!server) return

	const wss = new WebSocketServer({ noServer: true })

	server.removeAllListeners("upgrade")
	server.addListener("upgrade", async (req, socket, head) => {
		console.debug({}, "Start socket upgrade")

		const url = new URL(req.url!, `http://${req.headers.host}`)
		const username = url.searchParams.get("peerId")
		if (!username) {
			console.warn(
				{ error: "socket.nopeerid" },
				"Abort socket upgrade: missing 'peerId' query param",
			)
			return socket.destroy()
		}

		const path = url.pathname
		if (path != "/ws") {
			console.warn({ error: "socket.invalidpath", path }, "Abort socket upgrade: invalid path")
			return socket.destroy()
		}

		//"http://localhost:5173/ws?peerId=klsjvhbsdfkb"

		wss.handleUpgrade(req, socket, head, ws => {
			onConnection(ws, username)
		})
	})
}

export function onConnection(socket: WebSocketBase, username: string) {
	console.debug({ username }, "Socket connected");
	
	socket.on("close", code => console.debug({ username, code }, "Socket disconnected"));
	socket.on("error", error => console.error({ username, error }, "Socket error"));
	socket.addEventListener("message", ({ data }) => {
		for (const user of userArr) {
			user.socket.send(data);
		} 
	});
	
	userArr.push({username, socket});
}