import { Server } from "http"
import { env } from "./build/env.js"

const server = new Server()
globalThis.httpServer = server

const { handler } = await import("./build/handler.js")

const path = env("SOCKET_PATH", false)
const host = env("HOST", "0.0.0.0")
const port = env("PORT", !path && "3000")

server.on("request", handler)
server.listen({ path, host, port }, () => {
	console.log(`Listening on ${path ? path : host + ":" + port}`)
})
