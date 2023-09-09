<script lang="ts">
	import { username } from "$lib/stores"
</script>

<input bind:value={$username} />
<a href="/discussion">Go !</a>