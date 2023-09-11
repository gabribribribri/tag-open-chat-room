<script lang="ts">
	import { goto } from '$app/navigation';
	import { username } from '$lib/stores';

	function enterKeyPressed(event: KeyboardEvent) {
		if (event.keyCode == 13 && $username != '') {
			verifyUsername();
		}
	}

	function verifyUsername() {
		if ($username != '') goto('/discussion');
	}
</script>

<div id="outter-most">
	<div id="content">
		<h1 id="title">Welcome to T&G Open Chat Room</h1>

		<div id="input-zone">

			<input bind:value={$username} on:keydown={enterKeyPressed} id="username-input">
			<label id="username-label">Username</label>

			<button id="go-button" on:click={verifyUsername} />
		</div>
	</div>
</div>


<style>
	/*import Days One Font*/
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');

	#outter-most {
		justify-content: center;
		height: 100%;
		display: flex;
		background: rgb(232,34,255);
		background: linear-gradient(128deg, rgba(232,34,255,1) 0%, rgba(255,71,71,1) 29%, rgba(255,155,21,1) 100%);
		color: white;
		font-family: 'Poppins', sans-serif;
	}

	#content {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: fit-content;
		position: relative;
		top: 25%;
	}

	#title {
		font-size: 3rem;
		user-select: none;
	}

	#input-zone {
		width: fit-content;
		height: fit-content;
		position: relative;
		height: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#username-input {
		width: 400px;
		height: 70px;
		color: white;
		background-color: transparent;
		border: transparent;
		outline: none;
		font-size: larger;
		font-weight: 600;
	}

	#username-label {
		font-size: larger;
		position: absolute;
		left: 10px;
		top: 3px;
		pointer-events: none;
		transition: 0.2s;
	}

	#username-input:focus ~ #username-label {
		top: -13px;
		left: 1px;
		font-size: 12px;
	}

	#go-button {
		/* Sizing */
		margin-left: 1rem;
		height: 2rem;
		width: 2rem;

		/* Styling */
		border: transparent;
		color: white;

		/* Background */
		background-color: transparent;
		background-image: url('../lib/icon/sign-in.svg');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
</style>
