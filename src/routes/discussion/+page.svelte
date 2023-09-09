<script lang="ts">
	import { onMount } from "svelte"
	import { username, type Message} from "$lib/stores"
	import { goto } from "$app/navigation";

	let textInput: string;
	let messagesMap: Array<Message> = [];
	let websocket: WebSocket;

	onMount(() => {
		websocket = new WebSocket(`ws://${location.host}/ws?peerId=${$username}`);
		websocket.addEventListener("message", ({ data }) => {
			messagesMap.push(data)
		});
		return () => websocket.close(); 
	})
</script>

<input bind:value={textInput}/>
<button on:click={() => {
	websocket.send(`${{username: $username, content:textInput}}`)
	textInput = ""
}}>send</button>
{#each messagesMap as message}
	<p><strong>[{message.username}]</strong> {message.content}</p>
{/each}