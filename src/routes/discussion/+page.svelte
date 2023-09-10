<script lang="ts">
	import { onMount } from "svelte"
	import { username } from "$lib/stores"
	import type { Message } from "$lib/message"

	let textInput: string;
	let messagesArr: Array<Message> = [];
	let websocket: WebSocket;

	function enterToSendMessage(event: KeyboardEvent) {
		if (event.keyCode == 13) {
			sendMessage()
		}
	}

	onMount(() => {
		websocket = new WebSocket(`ws://${location.host}/ws?peerId=${$username}`);
		websocket.addEventListener("message", ({ data }) => {
			console.log(JSON.parse(data), messagesArr.length)
			messagesArr.push(JSON.parse(data))
			messagesArr = messagesArr
		});
		return () => websocket.close(); 
	});

	function sendMessage() {
		if (textInput === "") return;
		websocket.send(JSON.stringify({author: $username, content: textInput}));
		textInput = "";
	}
</script>


<input bind:value={textInput} on:keydown={enterToSendMessage}/>
<button on:click={sendMessage}>send</button>

{#each messagesArr as message}
	<p><strong>[{message.author}]</strong> {message.content}</p>
{/each}


