<script lang="ts">
	import { onMount } from "svelte"
	import { username } from "$lib/stores"
	import type { Message } from "$lib/message"

	let textInput: string;
	let messagesArr: Array<Message> = [];
	let websocket: WebSocket;

	onMount(() => {
		websocket = new WebSocket(`ws://${location.host}/ws?peerId=${$username}`);
		websocket.addEventListener("message", ({ data }) => {
			console.log(JSON.parse(data), messagesArr.length)
			messagesArr.push(JSON.parse(data))
			messagesArr = messagesArr
		});
		return () => websocket.close(); 
	})
</script>

<input bind:value={textInput}/>
<button on:click={() => {
	websocket.send(JSON.stringify({author: $username, content: textInput}));
	messagesArr = messagesArr
	textInput = "";
}}>send</button>
{#each messagesArr as message}
	<p><strong>[{message.author}]</strong> {message.content}</p>
{/each}