<script lang="ts">
	function connect() {
		const ws = new WebSocket(`ws://${location.host}/ws?peerId=${id}`)
		ws.addEventListener("open", () => {

			ws.send("yo")
		})
	}
</script>