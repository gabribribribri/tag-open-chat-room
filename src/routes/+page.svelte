<script lang="ts">
	import { goto } from "$app/navigation";
	import { username } from "$lib/stores";

	function enterKeyPressed(event: KeyboardEvent) {
		if (event.keyCode == 13 && $username != "") {
			verifyUsername();
		}
	}
	
	function verifyUsername() {
		if ($username != "") goto("/discussion");
	}
</script>

<html lang="fr">

	<div id="content">
		
		<h1 id="title">Welcome to T&G Open Chat Room</h1>

		<div id="input-zone">
			<input bind:value={$username} on:keydown={enterKeyPressed}/>
			<button on:click={verifyUsername}>Go !</button>
		</div>

	</div>

</html>
	
<style>
	/*import Days One Font*/
	@import url('https://fonts.googleapis.com/css2?family=Days+One&display=swap');

	html {
		display: grid;
        place-items: center;
		margin: 0;
		height: 100%;
		background-color: rgb(56, 56, 56);
		color: white;
		font-family: "Days One";
	}

	#input-zone {
		display: flex;
		margin: 0 auto;
		width: 100%;
		justify-content: center;
	}

	#title {
		user-select: none;
	}
</style>