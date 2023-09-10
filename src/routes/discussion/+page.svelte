<script lang="ts">
	import { onMount } from "svelte"
	import type { Message } from "$lib/message"

	let username: string;
	let textInput: string;
	let messagesArr: Array<Message> = [];
	let websocket: WebSocket;

	onMount(() => {
		const url = new URL(window.location.href);
		username = url.searchParams.get("username") ?? "";

		websocket = new WebSocket(`ws://${location.host}/ws?peerId=${username}`);
		websocket.addEventListener("message", ({ data }) => {
			messagesArr.push(JSON.parse(data))
			messagesArr = messagesArr
		});
		return () => websocket.close(); 
	})

	function sendMessage() {
		if (textInput == "") return;
		websocket.send(JSON.stringify({author: username, content: textInput}));
		textInput = "";
	}
</script>

<input bind:value={textInput}/>
<button on:click={sendMessage}>send</button>
{#each messagesArr as message}
	<p><strong>[{message.author}]</strong> {message.content}</p>
{/each}