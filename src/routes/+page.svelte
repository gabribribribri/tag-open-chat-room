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
			<input
				bind:value={$username}
				on:keydown={enterKeyPressed}
				placeholder=""
				id="username-input"
			/>
			<label for="username-input" id="username-label">Username</label>

			<div class="login-button">
				<button id="go-button" on:click={verifyUsername}>Login</button>
			</div>
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
		background-color: #404040;
		color: white;
		font-family: 'Poppins', sans-serif;
	}

	h1 {
		margin-top: 0;
	}

	@media screen and (max-width: 950px) {
		h1 {
			display: none;
		}
	}

	#content {
		border: solid;
		padding: 3rem;
		background-color: #202020;
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
		width: 20rem;
		margin-right: 5rem;
		position: relative;
		top: 2.8px;
		color: white;
		background-color: transparent;
		border: transparent;
		outline: none;
		font-size: larger;
		font-weight: 600;
		padding-bottom: 4px;
		border-bottom: solid white;
		transition: 0.2s;
	}

	#username-input:placeholder-shown {
		border-bottom: solid transparent;
	}

	#username-label {
		font-size: 13px;
		pointer-events: none;
		position: absolute;
		top: -18px;
		left: 0;
		transition: 0.2s;
	}

	#username-input:placeholder-shown ~ #username-label {
		font-size: 20px;
		top: 0;
		left: 2.5px;
	}

	#go-button {
		/* Sizing */
		z-index: 2;
		width: fit-content;
		padding: 0.1rem 0.8rem;

		/* Styling */
		border: solid white 0.2rem;
		color: white;

		/* Font */
		font-family: 'Poppins';
		font-size: large;

		/* Background */
		background-color: transparent;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}

	#go-button:hover {
		color: #202020;

	}

	#go-button::before {
		content: "";
		position: absolute;
		background-color: white;
		height: 100%;
		width: 0%;
		z-index: 1;
		overflow: hidden;
		text-decoration: none;
	}

	#go-button:hover::before {
		width: 160%;
	}
</style>
