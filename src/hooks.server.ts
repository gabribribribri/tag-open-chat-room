import type { Handle } from "@sveltejs/kit"
import { prepareWebSocketServer } from "$lib/utils/server/ws"

prepareWebSocketServer(globalThis.httpServer)

export const handle: Handle = async ({ event, resolve }) => {
	return resolve(event)
}