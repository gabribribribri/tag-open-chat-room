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

<div id="outter-most">

	<div id="content">

		<h1 id="title">Welcome to T&G Open Chat Room</h1>

		<div id="input-zone">
			<input bind:value={$username} on:keydown={enterKeyPressed}/>
			<button id="go-button" on:click={verifyUsername}></button>
		</div>

	</div>

</div>
	
<style>
	/*import Days One Font*/
	@import url("https://fonts.googleapis.com/css2?family=Days+One&display=swap");

	#outter-most {
		justify-content: center;
		height: 100%;
		display: flex;
		background-color: rgb(56, 56, 56);
		color: white;
		font-family: "Days One";
	}

	#content {
		height: fit-content;
		top: 25%;
		position: relative;
	}

	#input-zone {
		height: 2rem;
		display: flex;
		justify-content: center;
	}

	#title {
		user-select: none;
	}

	#go-button {
		background-image: url("../../static/sign-in.svg");
		margin: 1rem;
		height: 2rem;
		width: 4rem;
		border-radius: 10px;
		color: white;
	}
</style>

<!-- /* CSS */
.button-1 {
  background-color: #EA4C89;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-1:hover,
.button-1:focus {
  background-color: #F082AC;
} -->