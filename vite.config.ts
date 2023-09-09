import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';

function WebSocketDevPlugin(): Plugin {
	return {
		name: "WebSocketDevPlugin",
		configureServer(server) {
			globalThis.httpServer = server.httpServer!
		},
	}
}

export default defineConfig({
	plugins: [WebSocketDevPlugin(), sveltekit()]
});
