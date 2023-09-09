<script lang="ts">
	import { onMount } from "svelte"
	import { username } from "$lib/stores"
	import { goto } from "$app/navigation";

	onMount(() => {
		const ws = new WebSocket(`ws://${location.host}/ws?peerId=${$username}`);
		ws.addEventListener("open", () => {
			ws.send("yo")
		});

		return () => {
			ws.close(); 
		}
	})
</script>