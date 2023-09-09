<script lang="ts">
	import { goto } from "$app/navigation";
	import { username } from "$lib/stores"
	
	function verifyUsername() {
		if ($username != "") goto("/discussion")
	}
</script>

<input bind:value={$username} />
<button on:click={verifyUsername}>Go !</button>