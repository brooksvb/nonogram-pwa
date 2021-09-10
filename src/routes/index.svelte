<script>
	let rows = 5;
	let cols = 5;
</script>

<main class="text-center mt-32">
	<h1 class="text-4xl">NonoGame</h1>
	<p>Welcome to NonoGame</p>

	<div class="bg-gray-300 inline-block p-8">
		<h4>Set size of grid</h4>
		<label for="rows">Rows</label>
		<input name="rows" type="number" min="5" max="15" bind:value={rows}>
		<label for="cols">Columns</label>
		<input name="cols" type="number" min="5" max="15" bind:value={cols}>

		<a sveltekit:prefetch href="game?rows={rows}&cols={cols}"
		class="inline-block mt-16 p-8 bg-yellow-500 text-2xl rounded-md active:filter active:brightness-[.85]"
		>Play Game</a>
	</div>
</main>
