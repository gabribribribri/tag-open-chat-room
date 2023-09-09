import type { Server, IncomingMessage } from "http"
import { WebSocketServer, WebSocket as WebSocketBase } from "ws"

interface ServerSocket extends WebSocketBase {
	peerId: string
}

export function prepareWebSocketServer(server?: Server) {
	if (!server) return

	const wss = new WebSocketServer({ noServer: true })

	server.removeAllListeners("upgrade")
	server.addListener("upgrade", async (req, socket, head) => {
		console.debug({}, "Start socket upgrade")

		const url = new URL(req.url!, `http://${req.headers.host}`)
		const peerId = url.searchParams.get("peerId")
		if (!peerId) {
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

		wss.handleUpgrade(req, socket, head, ws => {
			onConnection(Object.assign(ws, { peerId }), req)
		})
	})
}

export function onConnection(socket: ServerSocket, req: IncomingMessage) {
	const { peerId } = socket
	console.debug({ peerId }, "Socket connected")
	socket.on("close", code => console.debug({ peerId, code }, "Socket disconnected"))
	socket.on("error", error => console.error({ peerId, error }, "Socket error"))

	socket.addEventListener("message", ({ data }) => {})
}