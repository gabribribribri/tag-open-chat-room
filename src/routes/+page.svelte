<script lang="ts">
	import { onMount } from "svelte"

    let id: string
</script>

<input bind:value={id} />
<a href="/discussion?id={id}">Go !</a>