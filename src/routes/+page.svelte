<script lang="ts">
	import { goto } from "$app/navigation";

	let username: string;
	
	function verifyUsername() {
		if (username != "") goto(`/discussion?username=${username}`)
	}
</script>

<input bind:value={username} />
<button on:click={verifyUsername}>Go !</button>